import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

const modules = [MatDialogModule, MatButtonModule, MatCheckboxModule];

@NgModule({
  imports: [modules],
  exports: [modules],
})
export class MatModule {}
