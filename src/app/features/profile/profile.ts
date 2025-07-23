import { Component, inject, OnInit } from '@angular/core';
import { UserProfileService } from '../../core/services/user-profile.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  private userProfileService = inject(UserProfileService);
  readonly userProfile = this.userProfileService.userProfile;

}
