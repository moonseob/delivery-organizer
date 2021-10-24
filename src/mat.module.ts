import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

const modules = [
  MatDialogModule,
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
];

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class MatModule {}
