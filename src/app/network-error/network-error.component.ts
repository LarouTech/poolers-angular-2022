import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'network-error',
  templateUrl: './network-error.component.html',
  styleUrls: ['./network-error.component.scss'],
})
export class NetworkErrorComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onReload() {
    this.router.navigate([''], { queryParams: { reload: true } });
  }
}
