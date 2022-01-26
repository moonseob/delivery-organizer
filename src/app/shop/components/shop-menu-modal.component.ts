import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BigNumber } from 'bignumber.js';
import { Observable, of } from 'rxjs';
import { map, shareReplay, startWith, take } from 'rxjs/operators';
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
    private dialogRef: MatDialogRef<ShopMenuModalComponent>,
    private cdr: ChangeDetectorRef
  ) {}
  formGroup = this.fb.group({});
  disableSubmit = true;
  subchoices: CartItem['subchoices'] = {};
  result$: Observable<CartItem | null> = of(null);
  price$!: Observable<number>;

  ngOnInit(): void {
    // menu 관련 속성 초기화
    const { slug, price, name, id } = this.menu;

    // subchoice의 종류에 따라 form group 생성
    this.menu.subchoices.forEach((subchoice) => {
      let ac: FormControl | FormArray;
      if (subchoice.multiple) {
        ac = this.fb.array([]);
        if (subchoice.multiple_count) {
          const lengthValidator = (control: AbstractControl) => {
            const requiredLength = subchoice.multiple_count;
            const actualLength = (control.value as boolean[]).filter(
              Boolean
            ).length;
            if (
              (subchoice.mandatory && requiredLength !== actualLength) ||
              requiredLength < actualLength
            ) {
              return { length: { requiredLength, actualLength } };
            }
            return null;
          };
          ac.addValidators(lengthValidator);
        }
        subchoice.subchoices.forEach((x) => {
          (ac as FormArray).push(this.fb.control(false));
        });
      } else {
        ac = this.fb.control(null);
        if (subchoice.mandatory) {
          ac.addValidators(Validators.required);
        }
      }
      this.formGroup.setControl(subchoice.slug, ac);
    });

    // form group의 값에 따라 결과값 생성(rx)
    this.result$ = this.formGroup.valueChanges.pipe(
      startWith(this.formGroup.value),
      map(() => {
        /** 장바구니 결과값(items) */
        const subchoices: CartItem['subchoices'] = {};
        /** 현재 사용자 옵션에 따른 가격 */
        let _price = new BigNumber(price);

        // 선택하는 옵션의 종류별로 순회
        this.menu.subchoices.forEach((group) => {
          const { slug, name, multiple } = group;
          // 해당하는 formControl 가져오기
          const control = this.formGroup.get(slug);
          // 옵션의 선택 결과값(종류에 상관없이 항상 array)
          let items: MenuSubchoice[] = [];
          // control vs array 경우에 items에 값 입력
          if (control instanceof FormControl) {
            items = (control.value as string[])?.map(
              (slug) => group.subchoices.find((choice) => choice.slug === slug)!
            );
          }
          if (control instanceof FormArray) {
            items = (control.value as boolean[])?.reduce(
              (accum, value, index) => {
                if (value === true) {
                  accum.push(group.subchoices[index]);
                }
                return accum;
              },
              [] as MenuSubchoice[]
            );
          }
          if (items?.length > 0) {
            // 옵션들의 가격 다 더하기
            items.forEach(
              (subchoice) => (_price = _price.plus(subchoice.price))
            );
            // subchoice 결과 오브젝트 완성하기
            subchoices[slug] = { slug, name, multiple, items };
          }
        });

        // 결과값 출력
        return {
          slug,
          name,
          id,
          price: _price.toNumber(),
          base_price: new BigNumber(price).toNumber(),
          default_price: 0,
          amount: 1,
          subchoices,
        };
      }),
      shareReplay(1)
    );
    this.price$ = this.result$.pipe(map((cart) => cart?.price ?? 0));
  }

  ngAfterViewInit(): void {
    this.formGroup.updateValueAndValidity();
    this.cdr.detectChanges();
  }

  async submit() {
    const result = await this.result$.pipe(take(1)).toPromise();
    if (!result) {
      return;
    }
    this.dialogRef.close(result);
  }
}
