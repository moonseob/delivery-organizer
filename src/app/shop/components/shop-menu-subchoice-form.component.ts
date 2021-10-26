import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MenuSubchoiceGroup } from '../models/shop-menu.model';

@Component({
  selector: 'app-shop-menu-subchoice-form',
  templateUrl: './shop-menu-subchoice-form.component.html',
  styleUrls: ['./shop-menu-subchoice-form.component.scss'],
})
export class ShopMenuSubchoiceFormComponent implements OnInit, AfterViewInit {
  constructor(private fb: FormBuilder) {}

  @Input() group!: MenuSubchoiceGroup;
  @Input() ac!: FormControl | FormArray;

  ngOnInit() {
    // this.ac instanceof FormArray && console.log(this.ac);
    if (this.ac instanceof FormControl) {
      this.ac.setValue(this.group.subchoices[0].slug);
      this.ac.updateValueAndValidity();
    }
  }

  ngAfterViewInit() {
    // this.ac.updateValueAndValidity();
  }
}
