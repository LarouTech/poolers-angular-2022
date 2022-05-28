import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @Input('hidden') hidden!: boolean;

  constructor() {
    this.hidden = this.hidden ? this.hidden : false;
  }

  ngOnInit(): void {}
}
