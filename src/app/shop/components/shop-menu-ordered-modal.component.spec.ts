import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMenuOrderedModalComponent } from './shop-menu-ordered-modal.component';

describe('ShopMenuOrderedModalComponent', () => {
  let component: ShopMenuOrderedModalComponent;
  let fixture: ComponentFixture<ShopMenuOrderedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopMenuOrderedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopMenuOrderedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
