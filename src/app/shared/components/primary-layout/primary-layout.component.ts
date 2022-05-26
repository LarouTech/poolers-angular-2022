import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { LayoutService } from 'src/app/layout.service';

export enum AlignItemsTypes {
  'CENTER' = 'center',
  'FLEX_START' = 'flex-start',
  'FLEX_END' = 'flex-end',
  'STRETCH' = 'strech',
}

export enum JustifyContentType {
  'CENTER' = 'center',
  'FLEX_START' = 'flex-start',
  'FLEX_END' = 'flex-end',
  'SPACE_AROUND' = 'space-around',
  'SPACE_BETWEEN' = 'spce-between',
  'SPACE_EVENLY' = 'space-evenly',
}

export enum FlexDirectionType {
  'ROW' = 'row',
  'COLUMN' = 'column',
}

export enum SideMenuState {
  'OPENED' = 'opened',
  'CLOSED' = 'closed',
}

@Component({
  selector: 'primary-layout',
  templateUrl: './primary-layout.component.html',
  styleUrls: ['./primary-layout.component.scss'],
  animations: [
    trigger('openClose', [
      state('opened', style({ width: '18rem' })),
      state('closed', style({ width: '4.5rem' })),
      transition('closed <=> opened', animate('450ms ease-out')),
      transition('opened <=> closed', animate('400ms ease-in')),
    ]),
  ],
})
export class PrimaryLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('contentEl') contentEl!: ElementRef;
  @ViewChild('sideMenuEl') sideMenuEl!: ElementRef;
  @ViewChild('containerEl') containerEl!: ElementRef;
  @Input('alignItems') alignItems!: AlignItemsTypes;
  @Input('justifyContent') justifyContent!: JustifyContentType;
  @Input('flexDirection') flexDirection?: FlexDirectionType;
  @Input('isSideMenu') isSideMenu!: boolean;
  @Input('isToolbar') isToolbar!: boolean;
  @Input('toolbarHeightRem') toolbarHeight!: number;
  @Input('overlay') overlay!: boolean;

  sideMenuState: SideMenuState;

  constructor(
    private layoutService: LayoutService,
    private renderer: Renderer2
  ) {
    this.isToolbar = this.isToolbar ? this.isToolbar : true;
    this.isSideMenu = this.isSideMenu ? this.isSideMenu : false;
    this.toolbarHeight = this.toolbarHeight ? this.toolbarHeight : 68;
    this.sideMenuState = SideMenuState.CLOSED;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setLayoutWidth();
    this.setFlexLayoutCongiguration();
    this.setSideMenuHeight();
    this.setcontentAreaHeight();
    this.overlay ? this.setOverlay() : null;
  }

  private setSideMenuHeight(): void {
    let height: number;

    if (document.body.scrollHeight === window.innerHeight * 2) {
      height = window.innerHeight;
    } else {
      height = document.body.scrollHeight;
    }

    if (this.sideMenuEl) {
      this.renderer.setStyle(
        this.sideMenuEl.nativeElement,
        'height',
        `${this.containerEl.nativeElement.clientHeight - this.toolbarHeight}px`
      );
    }
  }

  onToggle() {
    switch (this.sideMenuState) {
      case SideMenuState.OPENED:
        this.sideMenuState = SideMenuState.CLOSED;

        break;
      case SideMenuState.CLOSED:
        this.sideMenuState = SideMenuState.OPENED;

        break;
      default:
        break;
    }
  }

  setOverlay() {
    if (this.sideMenuEl) {
      this.renderer.setStyle(
        this.sideMenuEl.nativeElement,
        'position',
        'absolute'
      );
      this.renderer.setStyle(
        this.sideMenuEl.nativeElement,
        'top',
        this.toolbarHeight
      );
      this.renderer.setStyle(this.sideMenuEl.nativeElement, 'left', 0);
    }
  }

  private setFlexLayoutCongiguration() {
    if (this.alignItems) {
      this.renderer.setStyle(
        this.contentEl.nativeElement,
        'alignItems',
        this.alignItems
      );
    }

    if (this.justifyContent) {
      this.renderer.setStyle(
        this.contentEl.nativeElement,
        'justifyContent',
        this.justifyContent
      );
    }
  }

  private setcontentAreaHeight() {
    this.renderer.setStyle(
      this.contentEl.nativeElement,
      'minHeight',
      `${document.body.clientHeight - this.toolbarHeight}px`
    );
  }

  private setLayoutWidth(): void {
    if (this.contentEl) {
      const width$ = this.layoutService.innerWidth$.pipe(
        map((value) => {
          this.renderer.setStyle(
            this.contentEl.nativeElement,
            'width',
            `${value}px`
          );
        })
      );

      lastValueFrom(width$);
    }
  }
}