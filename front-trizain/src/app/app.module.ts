import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {appRoutingProviders,routing} from './app.routing';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Modules
import { PanelModule } from './modules/panel/panel.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamsComponent } from './components/teams/teams.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TeamsComponent,
  ],
  imports: [
    routing,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    PanelModule,
    AngularFileUploaderModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
