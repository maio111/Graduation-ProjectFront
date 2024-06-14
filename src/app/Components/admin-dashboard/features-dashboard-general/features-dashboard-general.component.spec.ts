import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesDashboardGeneralComponent } from './features-dashboard-general.component';

describe('FeaturesDashboardGeneralComponent', () => {
  let component: FeaturesDashboardGeneralComponent;
  let fixture: ComponentFixture<FeaturesDashboardGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesDashboardGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturesDashboardGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
