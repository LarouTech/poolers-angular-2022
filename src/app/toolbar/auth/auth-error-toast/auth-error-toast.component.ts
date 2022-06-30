import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';

@Component({
  selector: 'auth-error-toast',
  templateUrl: './auth-error-toast.component.html',
  styleUrls: ['./auth-error-toast.component.scss'],
})
export class AuthErrorToastComponent implements OnInit {
  @Input('message') message!: Observable<string>;
  @Output('clearErrorEmitter') clearErrorEmitter = new EventEmitter<boolean>(
    null!
  );

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const message$: Observable<string> = changes['message'].currentValue;

    this.message = message$.pipe(
      take(1),
      map((res) => {
        if (res != null) {
          setTimeout(() => {
            this.clearErrorEmitter.emit(true);
          }, 10000);
        }

        return res;
      })
    );
  }

  onClose() {
    this.clearErrorEmitter.emit(true);
  }
}
