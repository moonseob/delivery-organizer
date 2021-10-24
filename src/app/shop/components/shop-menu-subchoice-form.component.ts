import { Component, Input, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MenuSubchoiceGroup } from '../models/shop-menu.model';

@Component({
  selector: 'app-shop-menu-subchoice-form',
  templateUrl: './shop-menu-subchoice-form.component.html',
  styleUrls: ['./shop-menu-subchoice-form.component.scss'],
})
export class ShopMenuSubchoiceFormComponent implements OnInit {
  constructor() {}

  @Input() group!: MenuSubchoiceGroup;

  formArray = new FormArray([]);

  ngOnInit(): void {
    if (this.group.multiple) {
      // this.group.
      // this.formArray.push()
    }
  }
}
