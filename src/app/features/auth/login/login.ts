import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { Hub, HubCallback } from '@aws-amplify/core';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, AmplifyAuthenticatorModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private authenticatorService = inject(AuthenticatorService);
  private removeHubListener: any;
  private router = inject(Router);

  ngOnInit() {
    const listener: HubCallback = ({ payload }: { payload: any }) => {
      if (payload.event === 'signedIn') {
        this.authService.login(payload.data);
        this.router.navigate(['/home']);
      }
    }
    this.authenticatorService.toSignIn();
    this.removeHubListener = Hub.listen('auth', listener);
  }

  ngOnDestroy() {
    this.removeHubListener && this.removeHubListener();
  }

}
