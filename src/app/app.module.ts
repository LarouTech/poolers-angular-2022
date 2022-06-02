import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconService } from './icon.service';
import { MatIconModule } from '@angular/material/icon';
import { ConfigurationService } from './configuration.service';
import { AuthService } from './home/auth-card/auth.service';
import { LayoutService } from './layout.service';
import { TokenInterceptor } from './home/auth-card/token.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileService } from './profile.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ProfilePictureService } from './profile-picture.service';

export function StartupServiceFactory(configService: ConfigurationService) {
  return () => configService.getConfig().subscribe((data) => console.log(data));
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
  ],
  providers: [
    IconService,
    AuthService,
    LayoutService,
    ProfileService,
    ProfilePictureService,
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [ConfigurationService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
