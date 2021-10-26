import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatModule } from 'src/mat.module';
import { ShoppingCartFabComponent } from './components/shopping-cart-fab.component';
import { WarningMessageComponent } from './component/warning-message.component';

@NgModule({
  declarations: [ShoppingCartFabComponent, WarningMessageComponent],
  imports: [CommonModule, MatModule],
  exports: [ShoppingCartFabComponent],
})
export class SharedModule {}
