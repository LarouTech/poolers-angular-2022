import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  debounceTime,
  lastValueFrom,
  map,
  take,
  tap,
  forkJoin,
  Observable,
  BehaviorSubject,
} from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { NhlConfigurationsService } from 'src/app/nhl/nhl-configurations.service';
import { PlayersService } from 'src/app/nhl/players.service';
import { TeamsService } from 'src/app/nhl/teams.service';
import { CountriesService } from 'src/app/services/countries.service';
import { Paginator } from 'src/app/shared/components/paginator/paginator.component';
import { PaginatorService } from 'src/app/shared/components/paginator/paginator.service';
import { PlayerFilterData, SelectFilter } from './player-filter.metadata';

export interface PlayerFilterGroup {
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
  filters: SelectFilter[] = PlayerFilterData;
  filterForm!: FormGroup;
  unfilteredPlayers!: Observable<Player[]>;

  constructor(
    private countriesService: CountriesService,
    private teamService: TeamsService,
    private nhlConfig: NhlConfigurationsService,
    private paginatorService: PaginatorService,
    private playerService: PlayersService
  ) {}

  ngOnInit(): void {
    this.unfilteredPlayers = this.playerService.players$;
    this.initFiltersLovs();
    this.filterFormConstructor();
  }

  //RESET FILTERS
  onResetFilters() {
    this.playerService.setPlayers(
      JSON.parse(localStorage.getItem('players')!) as Player[]
    );
    this.filterForm.get('nationality')?.setValue('Please Choose...');
    this.filterForm.get('hand')?.setValue('Please Choose...');
    this.filterForm.get('team')?.setValue('Please Choose...');
    this.filterForm.get('position')?.setValue('Please Choose...');
    this.filterForm.get('rookie')?.setValue('Please Choose...');
  }

  //CREATE FILTER FORM
  private filterFormConstructor(): void {
    let formControls: any = {};

    this.filters.map((filter) => {
      formControls[filter.name] = new FormControl();
    });

    this.filterForm = new FormGroup(formControls);
  }

  //ON APPLY FILTER
  onApplyFilters() {
    const resetPlayers = JSON.parse(
      localStorage.getItem('players')!
    ) as Player[];

    const _filtersPlayers = new BehaviorSubject<Player[]>(resetPlayers);

    const filterGroup: PlayerFilterGroup = {
      nationality: this.filterForm.get('nationality')?.value,
      hand: this.filterForm.get('hand')?.value,
      team: this.filterForm.get('team')?.value,
      rookie: this.filterForm.get('rookie')?.value,
      position: this.filterForm.get('position')?.value,
    };

    //FILTER BY ROOKIE STATUS
    if (filterGroup.rookie) {
      let players = _filtersPlayers.getValue();

      const value = filterGroup.rookie === 'Yes' ? true : false;

      players = players.filter((player) => player.rookie === value);

      _filtersPlayers.next(players);
      this.playerService.setPlayers(players);
    }

    //FILTER BY SHOOTING OR CATCHING HAND
    if (filterGroup.hand) {
      let players = _filtersPlayers.getValue();
      filterGroup.hand = filterGroup.hand === 'Left' ? 'L' : 'R';

      players = players.filter(
        (player) => player.shootsCatches === filterGroup.hand
      );

      _filtersPlayers.next(players);
      this.playerService.setPlayers(players);
    }

    //FILTER BY POSITION
    if (filterGroup.position) {
      let players = _filtersPlayers.getValue();

      players = players.filter(
        (player) => player.primaryPosition.name === filterGroup.position
      );

      _filtersPlayers.next(players);
      this.playerService.setPlayers(players);
    }

    //FILTER BY TEAM
    if (filterGroup.team) {
      let players = _filtersPlayers.getValue();

      players = players.filter((player) => {
        if (player.currentTeam) {
          return player.currentTeam.name === filterGroup.team;
        }

        return;
      });

      _filtersPlayers.next(players);
      this.playerService.setPlayers(players);
    }

    //FILTER BY COUNTRY CODE
    if (filterGroup.nationality) {
      const nationality$ = this.countriesService.getCountries().pipe(
        map((countries) => {
          const countryCode = countries.find(
            (c) => c.name.common === filterGroup.nationality
          )?.cca3;

          let players = _filtersPlayers.getValue();
          players = players.filter(
            (player) => player.nationality === countryCode
          );

          _filtersPlayers.next(players);
          this.playerService.setPlayers(players);
        })
      );

      lastValueFrom(nationality$);
    }

    lastValueFrom(_filtersPlayers.asObservable());
  }

  //ON SERACH PLAYER (STILL HAVE BUGS WITH PAGINATOR)
  onSearchPlayer(event: any) {
    const playersCopy = JSON.parse(
      localStorage.getItem('players')!
    ) as Player[];

    const filteredPlayers$ = this.playerService.players$.pipe(
      take(1),
      debounceTime(300),
      map((players) => {
        if (event.length <= 0) {
          this.playerService.setPlayers(playersCopy);
          return players;
        }

        const searchPlayers = playersCopy.filter((s) => {
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

  //LOAD SELECT INPUT OPTIONS FOR AVAILBALE FILTERS
  private initFiltersLovs() {
    const initPositionsLov$ = this.nhlConfig.getPositions().pipe(
      tap((p) => {
        let array = (this.filters.find((f) => f.name === 'position')!.options =
          p.map((p) => p.fullName));
        this.stringSorter(array);
      })
    );

    const initTeamsLov$ = this.teamService.getTeams().pipe(
      tap((t) => {
        const array = (this.filters.find((f) => f.name === 'team')!.options =
          t.map((t) => t.name));

        this.stringSorter(array);
      })
    );

    const initCountriesLov$ = this.countriesService
      .getCountries(['name', 'flags'])
      .pipe(
        tap((c) => {
          console.log(c);
          const array = (this.filters.find(
            (f) => f.name === 'nationality'
          )!.options = c.map((country) => country.name.common));

          this.stringSorter(array);
        })
      );

    lastValueFrom(
      forkJoin([initCountriesLov$, initTeamsLov$, initPositionsLov$])
    );
  }
}
