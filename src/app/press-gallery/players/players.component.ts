import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/nhl/players.service';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Player } from 'src/app/nhl/interfaces/player.interface';
import { Paginator } from './paginator/paginator.component';
import { PaginatorService } from './paginator/paginator.service';

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  players$!: Observable<Player[]>;
  paginatedPlayers$!: Observable<Player[]>;

  constructor(
    private cdRef: ChangeDetectorRef,
    private paginatorService: PaginatorService,
    private playerServivce: PlayersService
  ) {}

  ngOnInit(): void {
    this.players$ = this.playerServivce.players$;
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
