import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/nhl/players.service';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { Paginator } from '../../shared/components/paginator/paginator.component';
import { PaginatorService } from '../../shared/components/paginator/paginator.service';

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  players$!: Observable<Player[]>;
  paginatedPlayers$!: Observable<Player[]>;
  paginatorFilter = [
    { value: 10, selected: false },
    { value: 25, selected: true },
    { value: 50, selected: false },
    { value: 100, selected: false },
    { value: 250, selected: false },
  ];

  constructor(
    private cdRef: ChangeDetectorRef,
    private paginatorService: PaginatorService,
    private playerServivce: PlayersService
  ) {}

  ngOnInit(): void {
    this.players$ = this.playerServivce.players$.pipe(
      map((players) => {
        if (!players) {
          const staticPlayers = JSON.parse(localStorage.getItem('players')!);
          this.playerServivce.setPlayers(staticPlayers);
          return staticPlayers;
        }
        return players;
      })
    );
  }

  ngAfterContentChecked(): void {
    this.paginatedPlayers$ = this.paginatorService.paginator$.pipe(
      map((res) => {
        let players: Player[] = [];
        if (res) {
          players = res.data[res.paginatorIndex];
        }
        return players;
      })
    );

    this.cdRef.detectChanges();
  }
}
