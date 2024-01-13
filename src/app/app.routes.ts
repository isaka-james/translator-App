import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:'',redirectTo:'/translate',pathMatch: 'full' },
    {path:'translate', 'title':'Translate App', component: HomeComponent}
];
