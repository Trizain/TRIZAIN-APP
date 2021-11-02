import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PanelRoutingModule } from './panel-routing.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { MainComponent } from './components/main/main.component';
import { FilesComponent } from './components/files/files.component';
import { NewUserComponent } from './components/new-user/new-user.component';

@NgModule({
    declarations:[
        MainComponent,
        FilesComponent,
        NewUserComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        HttpClientModule,
        PanelRoutingModule,
        AngularFileUploaderModule,
        NgMultiSelectDropDownModule
    ],
    exports:[
        MainComponent,
        FilesComponent
    ],
    providers: []
})

export class PanelModule {}


