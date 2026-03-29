import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckoutComponent } from './components/checkout-component/checkout-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CheckoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angularConf2026');
}
