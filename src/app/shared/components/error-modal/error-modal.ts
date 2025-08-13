import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  imports: [],
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.css'
})
export class ErrorModal {

  @Input() visible = false;
  @Input() message = 'An unexpected error occurred.';

  close() {
    this.visible = false;
  }

}
