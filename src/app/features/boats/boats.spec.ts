import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Boats } from './boats';

describe('Boats', () => {
  let component: Boats;
  let fixture: ComponentFixture<Boats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Boats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Boats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
