import { Component, inject } from '@angular/core';
import { BoatsService } from '../../../core/services/boats.service';
import { Boat, Review } from '../../../models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReviewsPreviewList } from '../../../shared/components/reviews/reviews-preview-list/reviews-preview-list';
import { MapComponent } from '../../../shared/components/map/map';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, ReviewsPreviewList, MapComponent],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class Edit {
  private boatsService = inject(BoatsService);
  private router = inject(Router);

  private fb = inject(FormBuilder);
  boatForm: FormGroup;
  boatId = this.router.routerState.snapshot.root.firstChild?.params['boatId'];
  reviews: Review[] = [];

  ngOnInit() {
    if (this.boatId) {
      this.boatsService.getBoat(this.boatId).subscribe((boat: Boat | null) => {
        if (boat) {
          this.reviews = boat?.reviews || [];
          this.boatForm.patchValue(boat);
        }
      });
    }
  }
  constructor() {

    this.boatForm = this.fb.group({
      id: [""],
      name: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.maxLength(500)]],
      thumb: this.fb.group({
        src: ['', [Validators.required, Validators.pattern(/^(https?:\/\/[^\s]+)$/)]],
        title: ['', [Validators.required, Validators.minLength(2)]]
      }),
      location: {
        lat: 0,
        lng: 0
      }
    });
  }

  onSubmit() {
    if (this.boatForm.valid) {
      const boat: Boat = this.boatForm.value;
      this.boatsService.editBoat(boat).subscribe({
        next: () => {
          this.router.navigate(['/my-boats']);
        }
      });
      this.boatForm.reset();
    }
  }
}
