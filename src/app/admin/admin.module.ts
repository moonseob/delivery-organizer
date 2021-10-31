import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel.component';

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: AdminPanelComponent,
      },
    ]),
  ],
})
export class AdminModule {}
