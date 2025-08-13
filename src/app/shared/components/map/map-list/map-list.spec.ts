import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapList } from './map-list';

describe('MapList', () => {
  let component: MapList;
  let fixture: ComponentFixture<MapList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
