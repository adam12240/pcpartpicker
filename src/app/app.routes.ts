import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent)
        
    },

    {
        path: 'addpc',
        pathMatch: 'full',
        loadComponent: () => import('./components/addpc/addpc.component').then((m) => m.AddpcComponent)
        
    },
];
