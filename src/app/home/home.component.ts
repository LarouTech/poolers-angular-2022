import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, lastValueFrom, tap } from 'rxjs';
import {
  AlignItemsTypes,
  JustifyContentType,
} from '../shared/components/primary-layout/primary-layout.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  alignItems = AlignItemsTypes.CENTER;
  justifyContent = JustifyContentType.CENTER;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    lastValueFrom(
      this.route.queryParams.pipe(
        tap((param) => {
          if (param['reload']) {
            this.document.location.reload();
          }
        })
      )
    );
  }
}
