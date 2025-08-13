import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

import Bugsnag from '@bugsnag/js';
import BugsnagPerformance from '@bugsnag/browser-performance';
import { BugsnagErrorHandler } from '@bugsnag/plugin-angular';
import { ErrorHandler, Provider } from '@angular/core';

// ToDo Move keys to environment variables for production
Bugsnag.start({
  apiKey: '77911f5aeee17c88421409d33d569ee2',
});

BugsnagPerformance.start({
  apiKey: '77911f5aeee17c88421409d33d569ee2'
});


const bugsnagProvider: Provider = {
  provide: ErrorHandler,
  useFactory: () => new BugsnagErrorHandler()
};

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    bugsnagProvider
  ]
}).catch((err) => console.error(err));
