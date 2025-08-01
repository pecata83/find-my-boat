import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

import { Footer, Header } from './shared/components';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  title = 'amplify-angular-template';

  constructor() {
    Amplify.configure(outputs);
  }
}
