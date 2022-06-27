import { Component, OnInit } from '@angular/core';
import { Observable, map, lastValueFrom, tap } from 'rxjs';
import { SeasonLov, SeasonsService } from 'src/app/nhl/seasons.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'season-picker',
  templateUrl: './season-picker.component.html',
  styleUrls: ['./season-picker.component.scss'],
})
export class SeasonPickerComponent implements OnInit {
  seasonsLov$!: Observable<SeasonLov[]>;

  constructor(
    private scheduleService: ScheduleService,
    private seasons: SeasonsService
  ) {}

  ngOnInit(): void {
    this.seasonsLov$ = this.seasons.getSeasonsLov();
    this.initLov();
  }

  private initLov() {
    const lov$ = this.seasonsLov$.pipe(
      tap((lov) => {
        this.scheduleService.setSelectedSeason(lov[0]);
      })
    );

    lastValueFrom(lov$);
  }

  onSelect(event: any): void {
    const seasonId$ = this.seasonsLov$.pipe(
      map((lov) => {
        this.scheduleService.setSelectedSeason(
          lov.find((l) => l.name === event.target.value)!
        );
        return;
      })
    );

    lastValueFrom(seasonId$);
  }
}
