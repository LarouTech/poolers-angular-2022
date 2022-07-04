import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

export enum MyButtonType {
  'SUBMIT' = 'submit',
  'BUTTON' = 'button',
}

@Component({
  selector: 'my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss'],
})
export class MyButtonComponent implements OnInit, AfterViewInit {
  @Input('text') text: string = 'button';
  @Input('icon') icon!: string;
  @Input('color') color?: string;
  @Input('width') width?: string | number;
  @Input('disabled') disabled?: boolean = false;
  @Input('loadingSpinner') loadingSpinner!: boolean;
  @Input('fontSize') fontSize!: string;
  @Input('type') btnType?: MyButtonType | string = this.btnType
    ? this.btnType
    : MyButtonType.BUTTON;
  @ViewChild('btnEl') btnEl?: ElementRef<HTMLButtonElement>;
  @ViewChild('containerEl') containerEl?: ElementRef<HTMLDivElement>;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.width
      ? this.renderer.setStyle(this.btnEl?.nativeElement, 'width', this.width)
      : null;

    this.color
      ? this.renderer.setStyle(
          this.btnEl?.nativeElement,
          'backgroundColor',
          this.color
        )
      : this.renderer.setStyle(
          this.btnEl?.nativeElement,
          'backgroundColor',
          'var(--primary500'
        );
  }
}
