import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomtypesDashboardComponent } from './roomtypes-dashboard.component';

describe('RoomtypesDashboardComponent', () => {
  let component: RoomtypesDashboardComponent;
  let fixture: ComponentFixture<RoomtypesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomtypesDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomtypesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
