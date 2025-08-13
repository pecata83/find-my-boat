import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAnchor } from './map-anchor';

describe('MapAnchor', () => {
  let component: MapAnchor;
  let fixture: ComponentFixture<MapAnchor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapAnchor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapAnchor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
