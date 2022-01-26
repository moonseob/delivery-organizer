import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatModule } from 'src/mat.module';
import { ShopDetailComponent } from './components/shop-detail.component';
import { ShopListComponent } from './components/shop-list.component';
import { ShopMenuCategoryComponent } from './components/shop-menu-category.component';
import { ShopMenuModalComponent } from './components/shop-menu-modal.component';
import { ShopMenuOrderedModalComponent } from './components/shop-menu-ordered-modal.component';
import { ShopMenuSubchoiceFormComponent } from './components/shop-menu-subchoice-form.component';

@NgModule({
  declarations: [
    ShopListComponent,
    ShopDetailComponent,
    ShopMenuCategoryComponent,
    ShopMenuModalComponent,
    ShopMenuSubchoiceFormComponent,
    ShopMenuOrderedModalComponent,
  ],
  imports: [
    CommonModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShopListComponent,
      },
      {
        path: ':id',
        redirectTo: ':id/',
        pathMatch: 'full',
      },
      {
        path: ':id/:menuId',
        component: ShopDetailComponent,
      },
    ]),
  ],
})
export class ShopModule {}
