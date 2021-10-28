import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { CartService } from './shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  username$ = this.authService.getUsername();

  ngOnInit() {
    // this.authService.loadUser();
  }
}
