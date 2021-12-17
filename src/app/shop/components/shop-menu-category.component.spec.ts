import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMenuCategoryComponent } from './shop-menu-category.component';

describe('ShopMenuCategoryComponent', () => {
  let component: ShopMenuCategoryComponent;
  let fixture: ComponentFixture<ShopMenuCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopMenuCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopMenuCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
