import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/service/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./module/account/account.module').then(module => module.AccountModule),
    canLoad: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },

  {
    path: 'day-of-eating',
    loadChildren: () => import('./module/day-of-eating/day-of-eating.module').then(module => module.DayOfEatingModule),
    canLoad: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },

  {
    path: 'product',
    loadChildren: () => import('./module/product/product.module').then(module => module.ProductModule),
    canLoad: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },

  {
    path: 'recipe',
    loadChildren: () => import('./module/recipe/recipe.module').then(module => module.RecipeModule),
    canLoad: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: '**',
    redirectTo: 'product'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules,
        enableTracing: false,
        relativeLinkResolution: 'corrected',
        onSameUrlNavigation: 'reload'
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
