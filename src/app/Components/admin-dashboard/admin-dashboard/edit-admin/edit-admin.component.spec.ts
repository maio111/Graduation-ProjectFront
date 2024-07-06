import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminComponent } from './edit-admin.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditAdminComponent', () => {
  let component: EditAdminComponent;
  let fixture: ComponentFixture<EditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdminComponent,ReactiveFormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
