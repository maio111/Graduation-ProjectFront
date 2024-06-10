import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCountryComponent } from './add-country.component';

describe('AddCountryComponent', () => {
  let component: AddCountryComponent;
  let fixture: ComponentFixture<AddCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
