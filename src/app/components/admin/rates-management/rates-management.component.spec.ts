import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatesManagementComponent } from './rates-management.component';

describe('RatesManagementComponent', () => {
  let component: RatesManagementComponent;
  let fixture: ComponentFixture<RatesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RatesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
