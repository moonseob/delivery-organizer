import { HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatModule } from 'src/mat.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/components/login.component';
import { AuthGuard } from './shared/services/auth.guard';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'shop',
    canActivate: [AuthGuard],
    loadChildren: async () => (await import('./shop/shop.module')).ShopModule,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    SharedModule,
  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'KRW',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
