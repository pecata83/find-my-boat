import { Routes } from '@angular/router';
import { authGuard, unAuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
},
{
    path: 'home',
    loadComponent: () => import('./features/home/home').then(c => c.Home)
},
{
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(c => c.Login),
    canActivate: [unAuthGuard]
},
{
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(c => c.Register),
    canActivate: [unAuthGuard]
},
{
    path: 'profile',
    loadComponent: () => import('./features/profile/profile').then(c => c.Profile),
    canActivate: [authGuard],
},
{
    path: 'profile/edit',
    loadComponent: () => import('./features/profile/edit/edit').then(c => c.EditProfile),
    canActivate: [authGuard],
},
{
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found').then(c => c.NotFound)
}
];
