import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SecuredComponent} from './secured.component';

const routes: Routes = [
  {
    path: '',
    component: SecuredComponent,
    children: [
      {
        path: 'account',
        loadChildren: () => import('../secured/module/account/account.module').then(module => module.AccountModule)
      },

      {
        path: 'day-of-eating',
        loadChildren: () => import('../secured/module/day-of-eating/day-of-eating.module').then(module => module.DayOfEatingModule)
      },

      {
        path: 'product',
        loadChildren: () => import('../secured/module/product/product.module').then(module => module.ProductModule)
      },

      {
        path: 'recipe',
        loadChildren: () => import('../secured/module/recipe/recipe.module').then(module => module.RecipeModule)
      },

      {
        path: '**',
        redirectTo: 'product'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SecuredRoutingModule { }
