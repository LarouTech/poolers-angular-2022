import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'screen-title-panel',
  templateUrl: './screen-title-panel.component.html',
  styleUrls: ['./screen-title-panel.component.scss'],
})
export class ScreenTitlePanelComponent implements OnInit {
  @ViewChild('controlPanelEl') controlPanelEl!: ElementRef;
  @Input('name') name!: string;
  @Input('icon') icon!: string;
  @Input('backgroundColor') backgroundColor!: string;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}
}
