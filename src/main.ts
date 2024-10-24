


import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { loggingInterceptor } from './app/interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([loggingInterceptor])), provideAnimationsAsync(),
  ]
}).catch((err) => console.error(err));
