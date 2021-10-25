import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartFabComponent } from './shopping-cart-fab.component';

describe('ShoppingCartFabComponent', () => {
  let component: ShoppingCartFabComponent;
  let fixture: ComponentFixture<ShoppingCartFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartFabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
