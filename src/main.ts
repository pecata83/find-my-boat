import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

import Bugsnag from '@bugsnag/js';
import BugsnagPerformance from '@bugsnag/browser-performance';
import { BugsnagErrorHandler } from '@bugsnag/plugin-angular';
import { ErrorHandler, Provider, inject } from '@angular/core';
import { ErrorModalService } from './app/core/services/error-modal.service';

// ToDo move to environment variables for production
Bugsnag.start({
  apiKey: '77911f5aeee17c88421409d33d569ee2',
});

BugsnagPerformance.start({
  apiKey: '77911f5aeee17c88421409d33d569ee2'
});

class GlobalErrorHandler extends BugsnagErrorHandler {
  private modal = inject(ErrorModalService);

  override handleError(error: any): void {
    super.handleError(error);
    this.modal.show(error?.message || 'Something went wrong.');
  }
}

const bugsnagProvider: Provider = {
  provide: ErrorHandler,
  useClass: GlobalErrorHandler
};

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    bugsnagProvider
  ]
}).catch((err) => console.error(err));
