import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { UserProfileService } from '../../../core/services/user-profile.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AmplifyAuthenticatorModule, TitleCasePipe],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected authService = inject(AuthService);
  protected userProfileService = inject(UserProfileService);
  private router = inject(Router);

  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;
  readonly userProfile = this.userProfileService.userProfile;

  async logout(event: Event): Promise<void> {
    event.preventDefault();
    await this.authService.logout();
    this.router.navigate(['/home']);
  }
}
