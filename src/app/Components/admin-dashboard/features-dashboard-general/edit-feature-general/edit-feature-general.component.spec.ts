import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeatureGeneralComponent } from './edit-feature-general.component';

describe('EditFeatureGeneralComponent', () => {
  let component: EditFeatureGeneralComponent;
  let fixture: ComponentFixture<EditFeatureGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFeatureGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFeatureGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
