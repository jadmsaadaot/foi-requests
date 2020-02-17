import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreHeaderComponent } from './core-header/core-header.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TransomApiClientService } from './transom-api-client.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ServicesModule } from './services/services.module';
import { RouteComponentsModule } from './route-components/route-components.module';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import {KeycloakService} from './services/keycloak.service';

export function kcFactory(keycloakService: KeycloakService) {
  return () => {
    console.log('HELO WORLD---------') ;
    keycloakService.init();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    CoreHeaderComponent,
    ProgressBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ServicesModule,
    RouteComponentsModule,
    NgxWebstorageModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    TransomApiClientService,
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true
    }
  ],
  bootstrap: [AppComponent, FooterComponent]
})
export class AppModule { }
