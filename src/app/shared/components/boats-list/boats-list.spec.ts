import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatsList } from './boats-list';

describe('BoatsList', () => {
  let component: BoatsList;
  let fixture: ComponentFixture<BoatsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoatsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoatsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
