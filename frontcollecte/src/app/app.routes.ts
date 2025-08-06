import { Routes } from '@angular/router';
import { LoginComponent } from './composant/login/login.component';
import { DashboardComponent } from './composant/dashboard/dashboard.component';
import { DoctoratComponent } from './composant/doctorat/doctorat.component';
import { ListComponent } from './composant/doctorat/list/list.component';
import { ListuserComponent } from './composant/user/listuser/listuser.component';
import { AdduserComponent } from './composant/user/adduser/adduser.component';
import { UploadComponent } from './composant/csv/upload/upload.component';
import { GetdetailsComponent } from './composant/doctorat/getdetails/getdetails.component';
import { doctoratdetailsResolver } from './resolver/doctoratdetails.resolver';
import { EditComponent } from './composant/doctorat/edit/edit.component';
import { NewPublicationComponent } from './composant/doctorat/new-publication/new-publication.component';
import { TableauBoardComponent } from './composant/tableau-board/tableau-board.component';

export const routes: Routes = [
    {
        path:"",
        pathMatch:"full",
        component:LoginComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"home",
        component:DashboardComponent,
        children:[
            {
                path:"dashboard",
                component:TableauBoardComponent
            },
              {
                path:"doctorat",
                component:DoctoratComponent
            },
            {
                path:"doctorat-list",
                component:ListComponent
            },
            {
                path:"user-list",
                component:ListuserComponent
            },
            {
                path:"user-add",
                component:AdduserComponent
            },
             {
                path:"csv-upload",
                component:UploadComponent
            },
            {
            path: "detail/:Id",
            component:GetdetailsComponent,
            resolve: {
                doctorat: doctoratdetailsResolver
            }
            },
            {
            path: "edit-doctorat/:Id",
            component:EditComponent,
            resolve: {
                doctorat: doctoratdetailsResolver
            }
            },
            {
            path: "doctorat-publication/:Id",
            component:NewPublicationComponent,
            resolve: {
                doctorat: doctoratdetailsResolver
            }
            }
        ]
    }
];
