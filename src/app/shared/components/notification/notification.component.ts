import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

enum SizeUnit {
  'PERCENT' = '%',
  'REM' = 'rem',
  'PIXEL' = 'px',
}

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, AfterViewInit {
  @ViewChild('notificationEl') notificationEl!: ElementRef<HTMLDivElement>;
  @Input('width') width!: number;
  @Input('sizeUnit') sizeUnit?: SizeUnit;
  @Input('timer') timer?: number;
  @Output('timerElapsed') timerElapsed = new EventEmitter<boolean>();

  visible = true;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setComponentSize();
    this.setTimer();
  }

  private setTimer() {
    if (this.timer) {
      setTimeout(() => {
        this.visible = false;
        this.timerElapsed.emit(true);
      }, this.timer);
    }
  }

  private setComponentSize() {
    if (!this.sizeUnit) {
      this.sizeUnit = SizeUnit.PERCENT;
    }

    if (this.width) {
      this.renderer.setStyle(
        this.notificationEl.nativeElement,
        'width',
        `${this.width}${this.sizeUnit}`
      );
    }
  }
}
