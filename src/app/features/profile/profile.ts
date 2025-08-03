import { Component, inject } from '@angular/core';
import { UserProfileService } from '../../core/services/user-profile.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  private userProfileService = inject(UserProfileService);
  readonly userProfile = this.userProfileService.userProfile;

}
