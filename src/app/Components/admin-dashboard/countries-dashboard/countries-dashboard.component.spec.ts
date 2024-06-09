import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesDashboardComponent } from './countries-dashboard.component';

describe('CountriesDashboardComponent', () => {
  let component: CountriesDashboardComponent;
  let fixture: ComponentFixture<CountriesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountriesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
