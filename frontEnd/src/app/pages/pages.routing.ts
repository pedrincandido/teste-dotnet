import { Routes } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { CrediarioComponent } from './crediario/crediario.component';
import { SaleComponent } from './sale/sale.component';



export const PagesRoutes: Routes = [
    {
        path: 'person',
        component: PersonComponent
    },
    {
        path: 'crediario',
        component: CrediarioComponent
    },
    {
        path: 'sale',
        component: SaleComponent
    },
];

