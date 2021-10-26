import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BigNumber } from 'bignumber.js';
import { CartItem } from '../../shared/models/cart.model';
import { Menu, MenuSubchoice } from '../models/shop-menu.model';

@Component({
  selector: 'app-shop-menu-modal',
  templateUrl: './shop-menu-modal.component.html',
  styleUrls: ['./shop-menu-modal.component.scss'],
})
export class ShopMenuModalComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public menu: Menu,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ShopMenuModalComponent>
  ) {}

  formGroup = this.fb.group({});

  subchoices: CartItem['subchoices'] = {};

  ngOnInit(): void {
    console.log('subchoices', this.menu.subchoices);
    this.menu.subchoices.forEach((subchoice) => {
      let ac: FormControl | FormArray;
      if (subchoice.multiple) {
        ac = this.fb.array(
          [],
          Validators.minLength(subchoice.multiple_count ?? 0)
        );
        subchoice.subchoices.forEach((x) => {
          (ac as FormArray).push(this.fb.control(false));
        });
      } else {
        ac = this.fb.control(null, Validators.required);
      }
      // ac.updateValueAndValidity();
      this.formGroup.addControl(subchoice.slug, ac);
    });
  }

  ngAfterViewInit() {
    // this.formGroup.updateValueAndValidity();
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    const { slug, price, name, id } = this.menu;
    const subchoices: CartItem['subchoices'] = {};
    let optionPrice = new BigNumber(0);
    this.menu.subchoices.forEach((group) => {
      const { slug, name, multiple } = group;
      const control = this.formGroup.get(slug);
      let items: MenuSubchoice[] = [];
      if (control instanceof FormControl) {
        items = (control.value as string[]).map(
          (slug) => group.subchoices.find((choice) => choice.slug === slug)!
        );
      }
      if (control instanceof FormArray) {
        items = (control.value as boolean[])
          .filter((value) => value)
          .map((_, idx) => group.subchoices[idx]);
      }
      if (items?.length > 0) {
        items.forEach((subchoice) => optionPrice.plus(subchoice.price));
        subchoices[slug] = { slug, name, multiple, items };
      }
    });

    const item: CartItem = {
      slug,
      name,
      id,
      price: optionPrice.plus(price).toNumber(),
      base_price: new BigNumber(price).toNumber(),
      default_price: 0,
      amount: 1,
      subchoices,
    };
    this.dialogRef.close(item);
  }
}
