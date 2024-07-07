import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRentsViewComponent } from './user-rents-view.component';

describe('UserRentsViewComponent', () => {
  let component: UserRentsViewComponent;
  let fixture: ComponentFixture<UserRentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRentsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
