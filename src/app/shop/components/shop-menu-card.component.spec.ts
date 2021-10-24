import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMenuCardComponent } from './shop-menu-card.component';

describe('ShopMenuCardComponent', () => {
  let component: ShopMenuCardComponent;
  let fixture: ComponentFixture<ShopMenuCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopMenuCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopMenuCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
