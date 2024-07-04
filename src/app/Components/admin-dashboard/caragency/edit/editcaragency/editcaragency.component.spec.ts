import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcaragencyComponent } from './editcaragency.component';

describe('EditcaragencyComponent', () => {
  let component: EditcaragencyComponent;
  let fixture: ComponentFixture<EditcaragencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcaragencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditcaragencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
