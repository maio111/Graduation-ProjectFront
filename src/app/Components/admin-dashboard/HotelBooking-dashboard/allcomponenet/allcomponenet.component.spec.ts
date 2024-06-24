import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcomponenetComponent } from './allcomponenet.component';

describe('AllcomponenetComponent', () => {
  let component: AllcomponenetComponent;
  let fixture: ComponentFixture<AllcomponenetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllcomponenetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllcomponenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
