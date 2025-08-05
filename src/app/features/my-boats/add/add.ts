import { Component, inject } from '@angular/core';
import { BoatsService } from '../../../core/services/boats.service';
import { Boat } from '../../../models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  imports: [ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class Add {
  private boatsService = inject(BoatsService);

  private fb = inject(FormBuilder);
  boatForm: FormGroup;


  constructor() {


    this.boatForm = this.fb.group({
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
      this.boatsService.addBoat(boat).subscribe();
      this.boatForm.reset(); // toDo redirect to new boat page
    }
  }
}
