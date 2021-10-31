import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatModule } from 'src/mat.module';
import { ShopDetailComponent } from './components/shop-detail.component';
import { ShopListComponent } from './components/shop-list.component';
import { ShopMenuCardComponent } from './components/shop-menu-card.component';
import { ShopMenuCategoryComponent } from './components/shop-menu-category.component';
import { ShopMenuModalComponent } from './components/shop-menu-modal.component';
import { ShopMenuSubchoiceFormComponent } from './components/shop-menu-subchoice-form.component';
import { ShopMenuOrderedModalComponent } from './components/shop-menu-ordered-modal.component';

@NgModule({
  declarations: [
    ShopListComponent,
    ShopDetailComponent,
    ShopMenuCategoryComponent,
    ShopMenuCardComponent,
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
        component: ShopDetailComponent,
      },
    ]),
  ],
})
export class ShopModule {}
