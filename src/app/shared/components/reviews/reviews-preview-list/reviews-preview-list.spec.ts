import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsPreviewList } from './reviews-preview-list';

describe('ReviewsPreviewList', () => {
  let component: ReviewsPreviewList;
  let fixture: ComponentFixture<ReviewsPreviewList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsPreviewList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsPreviewList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
