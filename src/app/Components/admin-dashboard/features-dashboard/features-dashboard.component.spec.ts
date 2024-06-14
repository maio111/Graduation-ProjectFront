import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesDashboardComponent } from './features-dashboard.component';

describe('FeaturesDashboardComponent', () => {
  let component: FeaturesDashboardComponent;
  let fixture: ComponentFixture<FeaturesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
