import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Menu, MenuSubchoiceGroup } from '../models/shop-menu.model';

@Component({
  selector: 'app-shop-menu-subchoice-form',
  templateUrl: './shop-menu-subchoice-form.component.html',
  styleUrls: ['./shop-menu-subchoice-form.component.scss'],
})
export class ShopMenuSubchoiceFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Input() group!: MenuSubchoiceGroup;
  @Input('fc') formControl!: AbstractControl;

  formArray = this.fb.array([]);
  result2!: Array<Menu['name']>;
  result!: string;
  // result2

  ngOnInit(): void {
    if (this.group.mandatory) {
    }
    if (this.group.multiple) {
      this.group.subchoices.forEach((choice) => {
        this.formArray.push(this.fb.control(false));
      });
      this.formArray.addValidators([
        Validators.minLength(this.group.multiple_count),
        (control) => {
          console.log(control.value);
          this.result2 = (control.value as boolean[])
            .filter((x) => x === true)
            .map((_, idx) => this.group.subchoices[idx].id.toString());
          return null;
        },
      ]);
      this.formArray.updateValueAndValidity();
    } else {
      // this.result = this.group.subchoices[0].name;
    }
  }
}
