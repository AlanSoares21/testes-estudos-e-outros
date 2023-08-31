import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiCallsService } from './api-calls.service';
import { LogsListComponent } from './logs-list/logs-list.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { TableComponent } from './table/table.component';
import { StorageService } from './storage.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    LoginComponent,
    LogsListComponent,
    BlacklistComponent,
    PlayersListComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ApiCallsService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
