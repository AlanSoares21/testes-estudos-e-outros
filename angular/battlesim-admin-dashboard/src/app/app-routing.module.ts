import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogsListComponent } from './logs-list/logs-list.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { PlayersListComponent } from './players-list/players-list.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'logs', component: LogsListComponent},
  {path: 'blacklist', component: BlacklistComponent},
  {path: 'players', component: PlayersListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
