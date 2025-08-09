import { Component, inject } from '@angular/core';
import { BoatsService } from '../../../core/services/boats.service';
import { Boat } from '../../../models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class Edit {
  private boatsService = inject(BoatsService);
  private router = inject(Router);

  private fb = inject(FormBuilder);
  boatForm: FormGroup;
  boatId = this.router.routerState.snapshot.root.firstChild?.params['boatId'];

  ngOnInit() {
    if (this.boatId) {
      this.boatsService.getBoat(this.boatId).subscribe((boat: Boat | null) => {
        if (boat) {
          this.boatForm.patchValue(boat);
        }
      });
    }
  }
  constructor() {

    this.boatForm = this.fb.group({
      id: [''],
      name: [''],
      content: [''],
      thumb: this.fb.group({
        src: [''],
        title: ['']
      }),
      location: this.fb.group({
        lat: [''],
        lng: ['']
      })
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
