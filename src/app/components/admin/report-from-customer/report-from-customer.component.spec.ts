import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFromCustomerComponent } from './report-from-customer.component';

describe('ReportFromCustomerComponent', () => {
  let component: ReportFromCustomerComponent;
  let fixture: ComponentFixture<ReportFromCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportFromCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportFromCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
