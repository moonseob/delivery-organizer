import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMenuModalComponent } from './shop-menu-modal.component';

describe('ShopMenuModalComponent', () => {
  let component: ShopMenuModalComponent;
  let fixture: ComponentFixture<ShopMenuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopMenuModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
