import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsInvoicesComponent } from './hotels-invoices.component';

describe('HotelsInvoicesComponent', () => {
  let component: HotelsInvoicesComponent;
  let fixture: ComponentFixture<HotelsInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsInvoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelsInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
