import { Component, inject } from '@angular/core';
import { BoatsService, AuthService, ReviewsService, UserProfileService } from '../../core/services/';
import { Boat } from '../../models';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReviewsPreviewList } from '../../shared/components/reviews/reviews-preview-list/reviews-preview-list';
import { MapView } from '../../shared/components/map/map-view/map-view';

@Component({
  selector: 'app-boats',
  imports: [ReactiveFormsModule, ReviewsPreviewList, MapView],
  templateUrl: './boats.html',
  styleUrl: './boats.css'
})
export class Boats {
  protected userProfileService = inject(UserProfileService);
  private authService = inject(AuthService);
  private boatsService = inject(BoatsService);
  private router = inject(Router);
  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;
  private reviewsService = inject(ReviewsService);
  readonly userProfile = this.userProfileService.userProfile;


  boat: Boat | null = null;

  boatId = this.router.routerState.snapshot.root.firstChild?.params['boatId'];

  reviewForm: FormGroup;

  constructor() {
    const fb = inject(FormBuilder);
    this.reviewForm = fb.group({
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      content: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  submitReview() {
    if (this.reviewForm.valid && this.boatId) {
      const review = this.reviewForm.value;
      this.reviewsService.addReview({ ...review, boatId: this.boatId, author: this.userProfile()?.name || this.currentUser()?.username }).subscribe(() => {
        this.reviewForm.reset();
        this.getBoat();
      });
    }
  }

  getBoat() {
    if (this.boatId) {
      this.boatsService.getBoat(this.boatId).subscribe((boat: Boat | null) => {
        if (boat) {
          this.boat = boat;
        }
      });
    }
  }

  ngOnInit() {
    this.getBoat();
  }
}
