import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router"
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [

  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},

  {path: 'auth', loadChildren: () => import('./module/auth/auth.module').then(module => module.AuthModule)},
  {path: 'product', loadChildren: () => import('./module/product/product.module').then(module => module.ProductModule)},
  {path: 'meal', loadChildren: () => import('./module/meal/meal.module').then(module => module.MealModule)},
  {path: 'diet', loadChildren: () => import('./module/diet/diet.module').then(module => module.DietModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
