import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  // {path: 'auth',
  //   loadChildren: () => import('./module/auth/auth.module').then(module => module.AuthModule)},

  {
    path: 'day-of-eating',
    loadChildren: () => import('./module/day-of-eating/day-of-eating.module').then(module => module.DayOfEatingModule),
  },

  // {path: 'meal',
  //   loadChildren: () => import('./module/meal/meal.module').then(module => module.MealModule)},

  {
    path: 'recipe',
    loadChildren: () => import('./module/recipe/recipe.module').then(module => module.RecipeModule),
  },

  { path: 'product', loadChildren: () => import('./module/product/product.module').then(module => module.ProductModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
