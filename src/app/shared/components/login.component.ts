import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .sign-in {
        display: inline-block;
        width: 196px;
        height: 46px;
        background: url(../../../assets/btn_google_signin_dark_normal_web@2x.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
    `,
  ],
})
export class LoginComponent {
  constructor() {}
  signinUrl = `${environment.authUrl}/google`;
}
