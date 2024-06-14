import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeatureGeneralComponent } from './add-feature-general.component';

describe('AddFeatureGeneralComponent', () => {
  let component: AddFeatureGeneralComponent;
  let fixture: ComponentFixture<AddFeatureGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFeatureGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddFeatureGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
