import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  debounceTime,
  lastValueFrom,
  map,
  take,
  tap,
  forkJoin,
  BehaviorSubject,
  Observable,
  switchMap,
} from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { NhlConfigurationsService } from 'src/app/nhl/nhl-configurations.service';
import { PlayersService } from 'src/app/nhl/players.service';
import { TeamsService } from 'src/app/nhl/teams.service';
import { CountriesService } from 'src/app/services/countries.service';
import { Paginator } from 'src/app/shared/components/paginator/paginator.component';
import { PaginatorService } from 'src/app/shared/components/paginator/paginator.service';
import { PlayerFilterData, PlayerFilterType } from './player-filter.metadata';

export interface PlayerFiltersSelection {
  hand: string;
  nationality: string;
  position: string;
  rookie: string;
  team: string;
}

@Component({
  selector: 'player-filters',
  templateUrl: './player-filters.component.html',
  styleUrls: ['./player-filters.component.scss'],
})
export class PlayerFiltersComponent implements OnInit {
  filters = PlayerFilterData;
  filterForm!: FormGroup;
  private _initialPlayerSet = new BehaviorSubject<Player[]>(null!);

  private defaultSelectValue = 'Please Choose...';

  initFilterStatus: PlayerFiltersSelection = {
    position: null!,
    nationality: null!,
    hand: null!,
    rookie: null!,
    team: null!,
  };

  private _filterStatus = new BehaviorSubject<PlayerFiltersSelection>(
    this.initFilterStatus
  );

  get filterStatus$(): Observable<PlayerFiltersSelection> {
    return this._filterStatus.asObservable();
  }

  constructor(
    private countriesService: CountriesService,
    private teamService: TeamsService,
    private nhlConfig: NhlConfigurationsService,
    private paginatorService: PaginatorService,
    private playerService: PlayersService
  ) {}

  ngOnInit(): void {
    this.initFiltersLovs();
    this.filterFormConstructor();
  }

  onResetIndividualFilter(filterName: string) {
    this.playerService.setPlayers(this.playerService.cachePlayers);
    const resetFilter$ = this.filterStatus$.pipe(
      take(1),
      map((filters) => {
        if (filterName === PlayerFilterType.POSITION) filters.position = null!;
        if (filterName === PlayerFilterType.NATIONALITY)
          filters.nationality = null!;
        if (filterName === PlayerFilterType.TEAM) filters.team = null!;
        if (filterName === PlayerFilterType.HAND) filters.hand = null!;
        if (filterName === PlayerFilterType.ROOKIE_STATUS)
          filters.rookie = null!;

        this.filterForm.get(filterName)?.setValue(this.defaultSelectValue);
        this._filterStatus.next(filters);
        this.filterHandler();
      })
    );

    lastValueFrom(resetFilter$);
  }

  //RESET FILTERS
  onResetFilters() {
    this._filterStatus.next(this.initFilterStatus);

    Object.values(this.filters).forEach((item) => {
      this.filterForm.get(item.name)?.setValue(this.defaultSelectValue);
    });

    this._initialPlayerSet.next(null!);
    this.playerService.setPlayers(this.playerService.cachePlayers);
  }

  //SET FORM CONTROL
  private setFilterControl(filterType: PlayerFilterType) {
    return this.filterForm.get(filterType)?.value === this.defaultSelectValue
      ? null
      : this.filterForm.get(filterType)?.value;
  }

  //ON APPLY FILTER
  onApplyFilters() {
    const filterStatus: PlayerFiltersSelection = {
      position: this.setFilterControl(PlayerFilterType.POSITION),
      nationality: this.setFilterControl(PlayerFilterType.NATIONALITY),
      team: this.setFilterControl(PlayerFilterType.TEAM),
      rookie: this.setFilterControl(PlayerFilterType.ROOKIE_STATUS),
      hand: this.setFilterControl(PlayerFilterType.HAND),
    };

    this.playerService.setPlayers(this.playerService.cachePlayers);
    this._filterStatus.next(filterStatus);
    this.filterHandler();
  }

  //FILTER HANDLER
  private filterHandler() {
    const filteredPlayers$ = this.filterStatus$.pipe(
      take(1),
      switchMap((filter) => {
        return this.playerService.players$.pipe(
          take(1),
          switchMap((players) => {
            return this.countriesService.getCountries().pipe(
              map((countries) => {
                console.log(filter);

                if (filter.position) {
                  players = players.filter(
                    (player) => player.primaryPosition.name === filter.position
                  );
                }

                if (filter.nationality) {
                  const countryAbrev = countries.find(
                    (country) => country.name.common === filter.nationality
                  )?.cca3;

                  players = players.filter(
                    (player) => player.nationality === countryAbrev
                  );
                }

                if (filter.team) {
                  players = players.filter(
                    (player) => player.currentTeam.name === filter.team
                  );
                }

                if (filter.hand) {
                  const filterConverter = filter.hand === 'Left' ? 'L' : 'R';

                  players = players.filter(
                    (player) => player.shootsCatches === filterConverter
                  );
                }

                if (filter.rookie) {
                  const filterConverter =
                    filter.rookie === 'Yes' ? true : false;
                  players = players.filter(
                    (player) => player.rookie === filterConverter
                  );
                }

                this.playerService.setPlayers(players);
              })
            );
          })
        );
      })
    );

    lastValueFrom(filteredPlayers$);
  }

  //CREATE FILTER FORM
  private filterFormConstructor(): void {
    let formControls: any = {};

    this.filters.map((filter) => {
      formControls[filter.name] = new FormControl();
    });

    this.filterForm = new FormGroup(formControls);
  }

  //LOAD SELECT INPUT OPTIONS FOR AVAILBALE FILTERS
  private initFiltersLovs() {
    const initPositionsLov$ = this.nhlConfig.getPositions().pipe(
      tap((positions) => {
        let array = this.filters.find(
          (filter) => filter.name === PlayerFilterType.POSITION
        )?.options;

        const positionsName = positions.map((position) => position.fullName);
        this.stringSorter(positionsName!);
        array!.push(...positionsName);
      })
    );

    const initTeamsLov$ = this.teamService.getTeams().pipe(
      tap((teams) => {
        let array = this.filters.find(
          (filter) => filter.name === PlayerFilterType.TEAM
        )?.options;

        const teamName = teams.map((team) => team.name);
        this.stringSorter(teamName!);
        array!.push(...teamName);
      })
    );

    const initCountriesLov$ = this.countriesService
      .getCountries(['name', 'flags'])
      .pipe(
        tap((countries) => {
          let array = this.filters.find(
            (filter) => filter.name === PlayerFilterType.NATIONALITY
          )?.options;

          const countryName = countries.map((country) => country.name.common);
          this.stringSorter(countryName!);
          array!.push(...countryName);
        })
      );

    lastValueFrom(
      forkJoin([initCountriesLov$, initTeamsLov$, initPositionsLov$])
    );
  }

  //STRING SORTER
  private stringSorter(array: any[], sorter?: string) {
    if (sorter) {
      array.sort((a: any, b: any) => {
        const attrTransformer = sorter.split('.');

        let sorterA = a;
        let sorterB = b;

        for (let i = 0; i < attrTransformer.length; i++) {
          sorterA = sorterA[attrTransformer[i]];

          sorterB = sorterB[attrTransformer[i]];
        }

        return sorterA.localeCompare(sorterB, undefined, {
          numeric: true,
          sensitivity: 'base',
        });
      });
      return;
    }

    array.sort((a: string, b: string) => {
      return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });
  }

  //ON SERACH PLAYER (STILL HAVE BUGS WITH PAGINATOR)
  onSearchPlayer(event: any) {
    const filteredPlayers$ = this.playerService.players$.pipe(
      take(1),
      debounceTime(300),
      map((players) => {
        if (this._initialPlayerSet.getValue() === null) {
          this._initialPlayerSet.next(players);
        }

        console.log(this._initialPlayerSet.getValue());

        if (event.length <= 0) {
          this.playerService.setPlayers(this._initialPlayerSet.getValue());
          return players;
        }

        const searchPlayers = players.filter((s) => {
          if (s.fullName.toLowerCase().includes(event)) {
            return s;
          }
          return;
        });

        const pagination: Paginator = {
          data: [searchPlayers],
          numberOfItems: searchPlayers.length,
          pages: 1,
          paginatorIndex: 0,
          lastChunkIndexes: 0,
        };

        this.paginatorService.setPaginator(pagination);
        this.playerService.setPlayers(searchPlayers);
        return searchPlayers;
      })
    );

    lastValueFrom(filteredPlayers$);
  }
}
