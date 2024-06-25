import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsearchComponent } from './hotelsearch.component';

describe('HotelsearchComponent', () => {
  let component: HotelsearchComponent;
  let fixture: ComponentFixture<HotelsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
