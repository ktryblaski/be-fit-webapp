import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [

  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},

  // {path: 'auth',
  //   loadChildren: () => import('./module/auth/auth.module').then(module => module.AuthModule)},

  {path: 'day-of-eating',
    loadChildren: () => import('./module/day-of-eating/day-of-eating.module').then(module => module.DayOfEatingModule)},

  // {path: 'diet',
  //   loadChildren: () => import('./module/diet/diet.module').then(module => module.DietModule)}

  // {path: 'meal',
  //   loadChildren: () => import('./module/meal/meal.module').then(module => module.MealModule)},

  {path: 'meal-template',
    loadChildren: () => import('./module/meal-template/meal-template.module').then(module => module.MealTemplateModule)},

  {path: 'product',
    loadChildren: () => import('./module/product/product.module').then(module => module.ProductModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
