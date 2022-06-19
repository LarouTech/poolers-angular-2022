import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map, Observable } from 'rxjs';
import { LayoutService } from 'src/app/layout.service';

@Component({
  selector: 'jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
})
export class JumbotronComponent implements OnInit {
  @Input('scrollerTarget') scrollerTarget!: HTMLElement;
  @ViewChild('jumbotronEl') jumbotronEl!: ElementRef;
  private _isTitleVisible = new BehaviorSubject<boolean>(true);

  get isTitleVisible$() {
    return this._isTitleVisible.asObservable();
  }

  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    lastValueFrom(this.setJumbotronTitleState());
  }

  private setJumbotronTitleState(): Observable<void> {
    return this.layout.innerWidth$.pipe(
      map((width) => {
        width >= 1100
          ? this._isTitleVisible.next(true)
          : this._isTitleVisible.next(false);
        return;
      })
    );
  }

  scroll(el: HTMLElement) {
    scrollTo({ top: el.clientHeight, behavior: 'smooth' });
  }
}
