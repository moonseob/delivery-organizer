import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatModule } from 'src/mat.module';
import { WarningMessageComponent } from './component/warning-message.component';
import { LoginComponent } from './components/login.component';
import { OrderSuccessComponent } from './components/order-success.component';
import { ShoppingCartFabComponent } from './components/shopping-cart-fab.component';
import { ShoppingCartItemComponent } from './components/shopping-cart-item.component';
import { ShoppingCartComponent } from './components/shopping-cart.component';
import { HistoryComponent } from './components/history.component';

@NgModule({
  declarations: [
    ShoppingCartFabComponent,
    WarningMessageComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent,
    LoginComponent,
    OrderSuccessComponent,
    HistoryComponent,
  ],
  imports: [CommonModule, MatModule, RouterModule],
  exports: [ShoppingCartFabComponent],
})
export class SharedModule {}
