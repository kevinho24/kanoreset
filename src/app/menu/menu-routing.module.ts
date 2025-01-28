import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren:() =>
          import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'account',
        loadChildren: () => 
          import('../account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: 'search-users',
        loadChildren: () => import('../search-users/search-users.module').then( m => m.SearchUsersPageModule)
      },
      {
        path: '',
        redirectTo: '/home', 
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
