import { Routes } from '@angular/router';


export const AppRoutes: Routes = [
    {
        path: '',
        children: [{
            path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
        }]
    }];
