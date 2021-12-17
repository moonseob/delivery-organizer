import { NgModule } from '@angular/core';
import {
  MatBottomSheetConfig,
  MatBottomSheetModule,
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogConfig,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';

const modules = [
  MatDialogModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatToolbarModule,
  MatRadioModule,
  MatIconModule,
  MatBottomSheetModule,
  MatMenuModule,
  MatListModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
];

@NgModule({
  imports: [modules],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig(),
        width: '500px',
        maxHeight: '100vh',
        // panelClass: ['no-inner-padding'],
        autoFocus: false,
      } as MatDialogConfig,
    },
    {
      provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
      useValue: {
        ...new MatBottomSheetConfig(),
        panelClass: ['no-inner-padding'],
      } as MatBottomSheetConfig,
    },
  ],
  exports: [modules],
})
export class MatModule {}
