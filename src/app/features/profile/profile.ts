import { Component, inject } from '@angular/core';
import { UserProfileService } from '../../core/services/user-profile.service';
import { RouterLink } from '@angular/router';
import { ReviewsPreviewList } from '../../shared/components/reviews/reviews-preview-list/reviews-preview-list';
import { ReviewsService } from '../../core/services';
import { Review } from '../../models';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, ReviewsPreviewList],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  private userProfileService = inject(UserProfileService);
  readonly userProfile = this.userProfileService.userProfile;
  private reviewsService = inject(ReviewsService)
  reviews: Review[] = [];

  ngOnInit() {
    this.reviewsService.listMyReviews().subscribe(reviews => {
      this.reviews = reviews || [];
    });
  }


}
