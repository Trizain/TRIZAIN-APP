import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";

import { MainComponent } from './components/main/main.component';
import { FilesComponent } from './components/files/files.component';
import { NewUserComponent } from "./components/new-user/new-user.component";


const panelRoutes: Routes = [
    {
        path:'panel',
        component:MainComponent,
        children:[
            {path:'files/:id',component:FilesComponent},
            {path:'new-user',component:NewUserComponent}
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