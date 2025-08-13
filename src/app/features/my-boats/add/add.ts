import { Component, inject } from '@angular/core';
import { BoatsService } from '../../../core/services/boats.service';
import { Boat } from '../../../models';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MapComponent } from '../../../shared/components/map/map';
import { LatLngTuple } from 'leaflet';

const INITIAL_POSITION: LatLngTuple = [37.54457732085584, 23.510742187500004];

@Component({
  selector: 'app-add',
  imports: [ReactiveFormsModule, MapComponent],
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class Add {
  private boatsService = inject(BoatsService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  boatForm: FormGroup;

  constructor() {
    this.boatForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.maxLength(500)]],
      thumb: this.fb.group({
        src: ['', [Validators.required, Validators.pattern(/^(https?:\/\/[^\s]+)$/)]],
        title: ['', [Validators.required, Validators.minLength(2)]]
      }),
      location: this.fb.control({
        lat: INITIAL_POSITION[0],
        lng: INITIAL_POSITION[1]
      })
    });
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          this.boatForm.patchValue({
            location: {
              lat: latitude,
              lng: longitude
            }
          });
        },
        err => {
          console.warn('Geolocation error:', err.message);
        },
        { enableHighAccuracy: true }
      );
    }
  }

  onSubmit() {
    if (this.boatForm.valid) {
      const boat: Boat = this.boatForm.value;
      this.boatsService.addBoat(boat).subscribe({
        next: () => {
          this.router.navigate(['/my-boats']);
        }
      });
      this.boatForm.reset();
    } else {
      // Mark all fields as touched to show errors
      this.boatForm.markAllAsTouched();
    }
  }
}
