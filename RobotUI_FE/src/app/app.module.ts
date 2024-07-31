import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRUIComponent } from './login-rui/login-rui.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './Component/side-bar/side-bar.component';
import { TopBarComponent } from './Component/top-bar/top-bar.component';
import { SubappComponent } from './subapp/subapp.component';
import { MonitoringOptionsComponent } from './monitoring-options/monitoring-options.component';
import { SetupOptionsComponent } from './setup-options/setup-options.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { MapsComponent } from './maps/maps.component';
import { CreateMapComponent } from './maps/create-map/create-map.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TransitionComponent } from './transition/transition.component';
import { MissionLogComponent } from './mission-log/mission-log.component';
import { SystemLogComponent } from './system-log/system-log.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRUIComponent,
    DashboardComponent,
    SidebarComponent,
    TopBarComponent,
    SubappComponent,
    MonitoringOptionsComponent,
    SetupOptionsComponent,
    SetupOptionsComponent,
    MonitoringOptionsComponent,
    UserManagementComponent,
    MapsComponent,
    CreateMapComponent,
    ErrorPageComponent,
    TransitionComponent,
    MissionLogComponent,
    SystemLogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
