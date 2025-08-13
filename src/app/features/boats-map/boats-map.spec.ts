import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatsMap } from './boats-map';

describe('BoatsMap', () => {
  let component: BoatsMap;
  let fixture: ComponentFixture<BoatsMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoatsMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoatsMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
