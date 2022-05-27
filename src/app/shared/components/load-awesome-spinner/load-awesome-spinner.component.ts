import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LoadAwesomeStyleSheets } from './load-awesome-spinner-metadata';
import {
  SpinnerColor,
  SpinnerSize,
  SpinnerType,
} from './load-awesome-spinner.enums';

export interface LoadAwesomeSpinner {
  size: SpinnerSize;
  color: SpinnerColor;
  type: SpinnerType;
}

@Component({
  selector: 'load-awesome-spinner',
  templateUrl: './load-awesome-spinner.component.html',
  styleUrls: [...LoadAwesomeStyleSheets],
})
export class LoadAwesomeSpinnerComponent implements OnInit, AfterViewInit {
  @ViewChild('spinnerEl') spinnerEl!: ElementRef;
  @Input('spinnerType') spinnerType!: SpinnerType | string;
  @Input('size') size?: SpinnerSize | string;
  @Input('color') color?: SpinnerColor | string;
  numberOfDivRows!: any[];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initSpinner();
    this.setDivRows();
  }
  ngAfterViewInit(): void {
    if (this.color != SpinnerColor.dark && this.color != SpinnerColor.normal) {
      this.renderer.setStyle(this.spinnerEl, 'color', this.color);
    }
  }

  private initSpinner() {
    !this.size ? (this.size = SpinnerSize.default) : this.size;
    !this.color ? (this.color = SpinnerColor.normal) : this.color;
  }

  private setRows(rows: number) {
    this.numberOfDivRows = Array(rows);
  }

  private setDivRows() {
    switch (this.spinnerType) {
      case SpinnerType['ball-clip-rotate']:
      case SpinnerType['ball-rotate']:
      case SpinnerType['ball-scale']:
      case SpinnerType['ball-scale-ripple']:
      case SpinnerType.cog:
      case SpinnerType['square-loader']:
      case SpinnerType['square-spin']:
      case SpinnerType.timer:
      case SpinnerType['triangle-skew-spin']:
        this.setRows(1);
        break;

      case SpinnerType['ball-clip-rotate-multiple']:
      case SpinnerType['ball-clip-rotate-pulse']:
      case SpinnerType['ball-scale-pulse']:
      case SpinnerType['ball-spin-rotate']:
      case SpinnerType['ball-zig-zag']:
      case SpinnerType['ball-zig-zag-deflect']:
      case SpinnerType['cube-transition']:
      case SpinnerType['square-jelly-box']:
        this.setRows(2);
        break;

      case SpinnerType['ball-beat']:
      case SpinnerType['ball-scale-ripple-multiple']:
      case SpinnerType['ball-fall']:
      case SpinnerType['ball-pulse']:
      case SpinnerType['ball-pulse-sync']:
      case SpinnerType['ball-scale-multiple']:
      case SpinnerType['ball-triangle-path']:
      case SpinnerType.fire:
        this.setRows(3);
        break;

      case SpinnerType['ball-atom']:
      case SpinnerType['ball-climbing-dot']:
      case SpinnerType['ball-fussion']:
      case SpinnerType['ball-newton-cradle']:
        this.setRows(4);
        break;

      case SpinnerType['ball-circus']:
      case SpinnerType['ball-elastic-dots']:
      case SpinnerType['ball-pulse-rise']:
      case SpinnerType['ball-running-dots']:
      case SpinnerType['line-scale']:
      case SpinnerType['line-scale-party']:
      case SpinnerType['line-scale-pulse-out']:
      case SpinnerType['line-scale-pulse-out-rapid']:
        this.setRows(5);
        break;

      case SpinnerType.pacman:
        this.setRows(6);
        break;

      case SpinnerType['ball-spin']:
      case SpinnerType['ball-spin-clockwise']:
      case SpinnerType['ball-spin-clockwise-fade']:
      case SpinnerType['ball-spin-clockwise-fade-rotating']:
      case SpinnerType['ball-spin-fade']:
      case SpinnerType['ball-spin-fade-rotating']:
      case SpinnerType['ball-square-clockwise-spin']:
      case SpinnerType['ball-square-spin']:
      case SpinnerType['line-spin-clockwise-fade']:
      case SpinnerType['line-spin-clockwise-fade-rotating']:
      case SpinnerType['line-spin-fade']:
      case SpinnerType['line-spin-fade-rotating']:
        this.setRows(8);
        break;

      case SpinnerType['ball-grid-beat']:
      case SpinnerType['ball-grid-pulse']:
        this.setRows(9);
        break;

      case SpinnerType['ball-8bits']:
        this.setRows(16);
        break;
    }
  }
}
