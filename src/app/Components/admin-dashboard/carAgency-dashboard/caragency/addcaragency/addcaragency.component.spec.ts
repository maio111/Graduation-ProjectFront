import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcaragencyComponent } from './addcaragency.component';

describe('AddcaragencyComponent', () => {
  let component: AddcaragencyComponent;
  let fixture: ComponentFixture<AddcaragencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcaragencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddcaragencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
