import { Component, effect, inject } from '@angular/core';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class EditProfile {
  private userProfileService = inject(UserProfileService);
  readonly userProfile = this.userProfileService.userProfile;

  private fb = inject(FormBuilder);
  profileForm: FormGroup;

  loadInitData(): void {
    effect(() => {
      const profile = this.userProfile();
      if (profile) {
        this.profileForm.patchValue({
          name: profile.name,
          email: profile.email,
          img: profile.img
        });
      }
    });
  }

  constructor() {
    this.loadInitData();
    this.profileForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      img: ["", [Validators.pattern(/^\S+\.\S+$/)]]
    });

  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.userProfileService.updateProfile(this.profileForm.value).subscribe({
        next: () => window.location.href = '/profile',
        error: () => alert('Failed to update profile. Please try again.')
      });
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  get img() {
    return this.profileForm.get('img');
  }

  get name() {
    return this.profileForm.get('name');
  }

  get email() {
    return this.profileForm.get('email');
  }

  isNameValid(): boolean {
    const control = this.name;
    return control?.valid || false;
  }

  isEmailValid(): boolean {
    const control = this.email;
    return control?.valid || false;
  }

  isImgValid(): boolean {
    const control = this.img;
    return control?.valid || false;
  }

}
