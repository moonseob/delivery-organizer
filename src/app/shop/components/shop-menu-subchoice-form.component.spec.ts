import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMenuSubchoiceFormComponent } from './shop-menu-subchoice-form.component';

describe('ShopMenuSubchoiceFormComponent', () => {
  let component: ShopMenuSubchoiceFormComponent;
  let fixture: ComponentFixture<ShopMenuSubchoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopMenuSubchoiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopMenuSubchoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
