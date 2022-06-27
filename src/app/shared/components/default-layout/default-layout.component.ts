import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  @ViewChild('canvasEl') canvasEl!: ElementRef;
  @Input('padding-horizontal') paddinHorizontal!: string;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (!this.paddinHorizontal) this.paddinHorizontal = '10%';
  }

  ngAfterViewInit(): void {
    this.setHorizontalPadding();
  }

  private setHorizontalPadding(): void {
    if (this.paddinHorizontal && this.canvasEl) {
      this.renderer.setStyle(
        this.canvasEl.nativeElement,
        'paddingLeft',
        this.paddinHorizontal
      );
      this.renderer.setStyle(
        this.canvasEl.nativeElement,
        'paddingRight',
        this.paddinHorizontal
      );
    }
  }
}
