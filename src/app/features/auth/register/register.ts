import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { Hub, HubCallback } from '@aws-amplify/core';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, AmplifyAuthenticatorModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private authenticatorService = inject(AuthenticatorService);
  private removeHubListener: any;

  ngOnInit(): void {
    this.authenticatorService.toSignUp();

    const listener: HubCallback = ({ payload }: { payload: { event: string; data?: any } }) => {
      if (payload.event === 'signedIn') {
        this.authService.login(payload.data);
        this.router.navigate(['/home']);
      }
    }
    this.authenticatorService.toSignUp();
    this.removeHubListener = Hub.listen('auth', listener);
  }

  ngOnDestroy() {
    this.removeHubListener && this.removeHubListener();
  }
}
