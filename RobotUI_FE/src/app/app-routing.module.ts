import { MonitoringOptionsComponent } from './monitoring-options/monitoring-options.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRUIComponent } from './login-rui/login-rui.component';
import { SubappComponent } from './subapp/subapp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SetupOptionsComponent } from './setup-options/setup-options.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { MapsComponent } from './maps/maps.component';
import { CreateMapComponent } from './maps/create-map/create-map.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TransitionComponent } from './transition/transition.component';
import { MissionLogComponent } from './mission-log/mission-log.component';

const routes: Routes = [
  {
    path: 'login',
    title: 'Login | ROBIS',
    component: LoginRUIComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'app',
    title: 'Robot | ROBIS',
    component: SubappComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'user-management',
        title: 'User-Management | App',
        component: UserManagementComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'setup',
        title: 'Setup | App',
        component: SetupOptionsComponent
      },
      {
        path: 'monitoring',
        title: 'Monitoring | App',
        component: MonitoringOptionsComponent
      },
      {
        path:'monitoring/mission-log',
        title: 'Mission Log | Monitoring | App',
        component: MissionLogComponent
      },
      {
        path: 'setup/maps',
        title: 'Maps | Setup | App',
        component: MapsComponent
      },
      {
        path: 'setup/transitions',
        title: 'Transition | Setup | App',
        component: TransitionComponent
      },
      {
        path: 'setup/maps/create-map',
        title: 'Maps | Setup | App',
        component: CreateMapComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
