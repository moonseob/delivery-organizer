import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShopDetailComponent } from './components/shop-detail.component';
import { ShopListComponent } from './components/shop-list.component';

@NgModule({
  declarations: [ShopListComponent, ShopDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShopListComponent,
      },
      {
        path: ':id',
        component: ShopDetailComponent,
      },
    ]),
  ],
})
export class ShopModule {}
