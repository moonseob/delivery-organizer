import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';

const modules = [
  MatDialogModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatToolbarModule,
  MatRadioModule,
];

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class MatModule {}
