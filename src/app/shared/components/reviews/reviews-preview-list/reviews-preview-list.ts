import { Component, inject, Input } from '@angular/core';
import { AuthService, ReviewsService, } from '../../../../core/services/';
import { Review as ReviewModel } from '../../../../models';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-reviews-preview-list',
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './reviews-preview-list.html',
  styleUrl: './reviews-preview-list.css'
})

export class ReviewsPreviewList {
  @Input() reviews: ReviewModel[] | null = null;
  @Input() title: string | null = null
  private authService = inject(AuthService);
  private reviewsService = inject(ReviewsService);
  readonly currentUser = this.authService.currentUser;


  onDeleteReview(reviewId: string) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewsService.deleteReview(reviewId).subscribe({
        next: () => {
          this.reviews = this.reviews?.filter(review => review.id !== reviewId) || null;
        },
        error: (err) => {
          alert('Failed to delete review.');
          console.error(err);
        }
      });
    }
  }

}
