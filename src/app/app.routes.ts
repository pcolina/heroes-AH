import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'hero', loadComponent: () => import('./pages/hero-detail/hero-detail.component'),


    },
    {
        path: 'heroes', loadComponent: () => import('./pages/heroes-list/heroes-list.component'),


    },
    {
        path: 'hero/:id', loadComponent: () => import('./pages/hero-detail/hero-detail.component'),


    },



    { path: '**', redirectTo: '/heroes', pathMatch: 'full' }
];
