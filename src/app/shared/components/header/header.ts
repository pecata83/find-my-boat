import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { signOut, SignOutInput } from 'aws-amplify/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AmplifyAuthenticatorModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected authService = inject(AuthService);
  private router = inject(Router);

  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;

  async logout(event: Event): Promise<void> {
    event.preventDefault();
    await this.authService.logout();
    this.router.navigate(['/home']);
  }
}
