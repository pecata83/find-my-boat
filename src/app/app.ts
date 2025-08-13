import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

import { Footer, Header } from './shared/components';
import { ErrorModal } from './shared/components/error-modal/error-modal';
import { ErrorModalService } from './core/services/error-modal.service';
import { AsyncPipe } from '@angular/common';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ErrorModal, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  visible$ = this.modal.visible$;
  message$ = this.modal.message$;

  constructor(private modal: ErrorModalService) {
    Amplify.configure(outputs);
  }
}
