import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBoats } from './my-boats';

describe('MyBoats', () => {
  let component: MyBoats;
  let fixture: ComponentFixture<MyBoats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBoats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBoats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
