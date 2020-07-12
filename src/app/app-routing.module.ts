import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router"
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [

  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},

  {path: 'auth', loadChildren: () => import('./module/auth/auth.module').then(module => module.AuthModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
