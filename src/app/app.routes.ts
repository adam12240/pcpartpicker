import {Routes} from '@angular/router';
import { admincheckerGuard} from './adminchecker.guard';
import { userCheckerGuard } from './auth.guard';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent)
        
    },
    {
        path: 'addpc',
        pathMatch: 'full',
        loadComponent: () => import('./components/addpc/addpc.component').then((m) => m.AddpcComponent),
        canActivate: [admincheckerGuard]
    },
    {
        path:'make-a-config',
        pathMatch: 'full',
        loadComponent: () => import('./components/make-a-config/make-a-config.component').then((m) => m.MakeAConfigComponent),
        canActivate: [userCheckerGuard]
    },
];
