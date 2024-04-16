import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';

// const extendedConfig = {
//   ...appConfig,
//   providers: [...appConfig.providers, HttpClientModule]
// }

bootstrapApplication(AppComponent, { // appConfig extendedConfig
  ...appConfig,
  providers: [
    ...appConfig.providers,
    HttpClientModule
  ]
}).catch((err) => console.error(err));
