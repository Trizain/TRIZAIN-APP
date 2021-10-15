import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PanelRoutingModule } from './panel-routing.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';

import { MainComponent } from './components/main/main.component';
import { FilesComponent } from './components/files/files.component';

@NgModule({
    declarations:[
        MainComponent,
        FilesComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        HttpClientModule,
        PanelRoutingModule,
        AngularFileUploaderModule
    ],
    exports:[
        MainComponent,
        FilesComponent
    ],
    providers: []
})

export class PanelModule {}


