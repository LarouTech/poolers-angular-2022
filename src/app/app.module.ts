import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconService } from './icon.service';
import { MatIconModule } from '@angular/material/icon';
import { ConfigurationService } from './configuration.service';
import { LayoutService } from './layout.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SeasonsService } from './nhl/seasons.service';
import { FranchisesService } from './nhl/franchises.service';
import { GamesService } from './nhl/games.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './toolbar/auth/auth.service';
import { ToolbarModule } from './toolbar/toolbar.module';
import { TokenInterceptor } from './toolbar/auth/token.interceptor';
import { ProfileService } from './profile.service';

// export function StartupServiceFactory(configService: ConfigurationService) {
//   return () => configService.getConfig().subscribe((data) => console.log(data));
// }

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    ToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [
    IconService,
    AuthService,
    LayoutService,
    ProfileService,
    SeasonsService,

    GamesService,
    ConfigurationService,
    FranchisesService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: StartupServiceFactory,
    //   deps: [ConfigurationService],
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
