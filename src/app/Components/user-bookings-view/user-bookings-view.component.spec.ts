import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingsViewComponent } from './user-bookings-view.component';

describe('UserBookingsViewComponent', () => {
  let component: UserBookingsViewComponent;
  let fixture: ComponentFixture<UserBookingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBookingsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserBookingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
