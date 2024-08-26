import { ErrorLogComponent } from './error-log/error-log.component';
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
import { SystemLogComponent } from './system-log/system-log.component';
import { PathsAndGuidesComponent } from './paths-and-guides/paths-and-guides.component';
import { MissionsComponent } from './missions/missions.component';
import { CreateMissionsComponent } from './missions/create-missions/create-missions.component';
import { AnalyticsComponent } from './analytics/analytics.component';

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
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
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
        path:'monitoring/system-log',
        title: 'System Log | Monitoring | App',
        component: SystemLogComponent
      },
      {
        path:'monitoring/analytics',
        title: 'Analytics | Monitoring | App',
        component: AnalyticsComponent
      },
      {
        path:'monitoring/error-log',
        title: 'Error Log | Monitoring | App',
        component: ErrorLogComponent
      },
      {
        path: 'setup/maps',
        title: 'Maps | Setup | App',
        component: MapsComponent
      },
      {
        path: 'setup/paths-and-guides',
        title: 'P&G | Setup | App',
        component: PathsAndGuidesComponent
      },
      {
        path: 'setup/transitions',
        title: 'Transition | Setup | App',
        component: TransitionComponent
      },
      {
        path: 'setup/missions',
        title: 'Missions | Setup | App',
        component: MissionsComponent
      },
      {
        path: 'setup/maps/create-map',
        title: 'Maps | Setup | App',
        component: CreateMapComponent
      },
      {
        path: 'setup/missions/create-missions',
        title: 'Missions | Setup | App',
        component: CreateMissionsComponent
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
