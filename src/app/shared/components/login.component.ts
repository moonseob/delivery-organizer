import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  template: '리다이렉션 중입니다...',
})
export class LoginComponent {
  constructor() {
    window.location.replace(`${environment.authUrl}/auth/google`);
  }
}
