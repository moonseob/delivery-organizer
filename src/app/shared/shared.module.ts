import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatModule } from 'src/mat.module';
import { WarningMessageComponent } from './component/warning-message.component';
import { ShoppingCartFabComponent } from './components/shopping-cart-fab.component';
import { ShoppingCartItemComponent } from './components/shopping-cart-item.component';
import { ShoppingCartComponent } from './components/shopping-cart.component';

@NgModule({
  declarations: [
    ShoppingCartFabComponent,
    WarningMessageComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent,
  ],
  imports: [CommonModule, MatModule],
  exports: [ShoppingCartFabComponent],
})
export class SharedModule {}
