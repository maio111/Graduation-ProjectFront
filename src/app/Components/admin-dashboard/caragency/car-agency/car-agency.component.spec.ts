import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaragencyComponent } from './car-agency.component';

describe('CarAgencyComponent', () => {
  let component: CaragencyComponent;
  let fixture: ComponentFixture<CaragencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaragencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaragencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
