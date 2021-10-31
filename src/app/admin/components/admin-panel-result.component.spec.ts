import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelResultComponent } from './admin-panel-result.component';

describe('AdminPanelResultComponent', () => {
  let component: AdminPanelResultComponent;
  let fixture: ComponentFixture<AdminPanelResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
