import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input('isLabelVisible') isLabelVisible?: boolean;
  @Input('sizeRem') sizeRem?: string;
  @ViewChild('avatarEl') avatarEl!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.sizeRem
      ? this.renderer.setStyle(
          this.avatarEl.nativeElement,
          'height',
          this.sizeRem
        )
      : null;

    this.sizeRem
      ? this.renderer.setStyle(
          this.avatarEl.nativeElement,
          'width',
          this.sizeRem
        )
      : null;
  }
}
