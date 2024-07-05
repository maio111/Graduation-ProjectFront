import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapModalForCarComponent } from './map-modal-for-car.component';

describe('MapModalForCarComponent', () => {
  let component: MapModalForCarComponent;
  let fixture: ComponentFixture<MapModalForCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapModalForCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapModalForCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
