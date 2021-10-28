import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MenuSubchoiceGroup } from '../models/shop-menu.model';

@Component({
  selector: 'app-shop-menu-subchoice-form',
  templateUrl: './shop-menu-subchoice-form.component.html',
  styleUrls: ['./shop-menu-subchoice-form.component.scss'],
})
export class ShopMenuSubchoiceFormComponent implements OnInit {
  constructor() {}

  @Input() group!: MenuSubchoiceGroup;
  @Input() ac!: FormControl | FormArray;

  ngOnInit() {}
}
