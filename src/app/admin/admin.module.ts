import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';
import { MatModule } from 'src/mat.module';
import { AdminPanelComponent } from './components/admin-panel.component';
import { AdminPanelResultComponent } from './components/admin-panel-result.component';

@NgModule({
  declarations: [AdminPanelComponent, AdminPanelResultComponent],
  imports: [
    CommonModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
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
