import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { MainComponent } from './components/main/main.component';
import { FilesComponent } from './components/files/files.component';


const panelRoutes: Routes = [
    {
        path:'panel',
        component:MainComponent,
        children:[
            {path:'files/:id',component:FilesComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(panelRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PanelRoutingModule {}