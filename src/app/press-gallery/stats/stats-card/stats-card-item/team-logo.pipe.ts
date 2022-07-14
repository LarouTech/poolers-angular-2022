import { Pipe, PipeTransform } from '@angular/core';
import { FranchisesService } from 'src/app/nhl/franchises.service';
import { filter, map, Observable } from 'rxjs';
import { Logo } from 'src/app/nhl/interfaces/franchiseAllTime.interface';

@Pipe({
  name: 'teamLogo',
})
export class TeamLogoPipe implements PipeTransform {
  constructor(private franchiseService: FranchisesService) {}

  transform(teamId: number): Observable<Logo | undefined> {
    return this.franchiseService.getLogoById(teamId);
  }
}
