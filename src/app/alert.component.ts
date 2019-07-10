
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `<div>Alert! {{ message }}</div>`,
  styles: [`
    div {
      border: 1px solid black;
      background: salmon;
      padding: 10px;
      margin-bottom: 10px;
    }
  `]
})
export class AlertComponent {
  @Input() message: string;
}
