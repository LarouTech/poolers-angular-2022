import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, take, tap } from 'rxjs';

@Component({
  selector: 'toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss'],
})
export class ToolbarMenuComponent implements OnInit {
  @ViewChild('menuEl') menuEl!: ElementRef;
  @ViewChild('arrowEl') arrowEl!: ElementRef;
  @Input('scrollTopValue') scrollTopValue!: Observable<number>;
  @Input('isMenuOpened') isMenuOpened!: Observable<boolean>;
  @Input('arrowXPosition') arrowXPosition!: number;
  @Input('verticalOffset') verticalOffset!: number;
  @Input('width') width!: string;

  _scrollTopValue = new BehaviorSubject<number>(0);

  private _isMenuOpened = new BehaviorSubject<boolean>(false);

  get scrollTopValue$() {
    return this._scrollTopValue.asObservable();
  }

  get isMenuOpened$() {
    return this._isMenuOpened.asObservable();
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    lastValueFrom(
      this.scrollTopValue.pipe(tap((val) => this._scrollTopValue.next(val)))
    );
    lastValueFrom(
      this.isMenuOpened.pipe(
        take(1),
        tap((state) => {
          this._isMenuOpened.next(state);
        })
      )
    );
  }

  ngAfterViewInit(): void {
    const menuArrowPosition$ = this.isMenuOpened.pipe(
      tap((state) => {
        if (state === true && this.arrowEl) {
          this.renderer.setStyle(
            this.arrowEl.nativeElement,
            'left',
            this.arrowXPosition ? `${this.arrowXPosition}%` : '50%'
          );
        }
      })
    );

    lastValueFrom(menuArrowPosition$);
  }

  // ngAfterContentChecked(): void {
  //   //Called after every check of the component's or directive's content.
  //   //Add 'implements AfterContentChecked' to the class.
  //   if (this.width && this.menuEl) {
  //     console.log('coco');
  //     this.renderer.setStyle(
  //       this.menuEl.nativeElement,
  //       'width',
  //       `${this.width}`
  //     );
  //   }
  // }
}
