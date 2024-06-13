import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCountryComponent } from './edit-country.component';

describe('EditCountryComponent', () => {
  let component: EditCountryComponent;
  let fixture: ComponentFixture<EditCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCountryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
