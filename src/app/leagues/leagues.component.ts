import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  Event,
  NavigationStart,
  ResolveStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.scss'],
})
export class LeaguesComponent implements OnInit, OnDestroy {
  @ViewChild('containerEl') containerEl!: ElementRef;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
