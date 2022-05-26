import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @ViewChild('cardEl') cardEl!: ElementRef<HTMLDivElement>;

  @Input('headerShown') headerShown: boolean = true;
  @Input('contentShown') contentShown: boolean = true;
  @Input('actionsShown') actionsShown: boolean = true;
  @Input('width') width: string = '35rem';
  @Input('height') height: string = '100%';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.cardEl.nativeElement, 'width', this.width);
    this.renderer.setStyle(this.cardEl.nativeElement, 'height', this.height);
  }
}
