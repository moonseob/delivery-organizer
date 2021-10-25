import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatModule } from 'src/mat.module';
import { ShoppingCartFabComponent } from './components/shopping-cart-fab.component';

@NgModule({
  declarations: [ShoppingCartFabComponent],
  imports: [CommonModule, MatModule],
  exports: [ShoppingCartFabComponent],
})
export class SharedModule {}
