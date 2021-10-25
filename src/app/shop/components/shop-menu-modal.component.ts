import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from '../models/shop-menu.model';

@Component({
  selector: 'app-shop-menu-modal',
  templateUrl: './shop-menu-modal.component.html',
  styleUrls: ['./shop-menu-modal.component.scss'],
})
export class ShopMenuModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public menu: Menu,
    private fb: FormBuilder
  ) {}

  formGroup!: FormGroup;

  ngOnInit(): void {
    const controls = Object.fromEntries(
      this.menu.subchoices?.map((subchoice) => [subchoice, [false]])
    );
    this.formGroup = this.fb.group({});
  }
}
