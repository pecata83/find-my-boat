import { Component, inject, OnInit } from '@angular/core';
import { ReviewsService } from '../../../core/services/';
import { AuthService } from '../../../core/services';
import { Review as ReviewModel } from '../../../models';

@Component({
  selector: 'app-reviews',
  imports: [],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})
export class Reviews implements OnInit {
  private authService = inject(AuthService);
  private reviewsService = inject(ReviewsService);
  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;
  reviews: ReviewModel[] | null = null;

  ngOnInit() {
    this.reviewsService.listReviews().subscribe(reviews => {
      this.reviews = reviews;
    });
  }
}
