import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './public/login/login.component';
import {AccountRecoveryComponent} from './public/account-recovery/account-recovery.component';
import {RegisterComponent} from './public/register/register.component';
import {AuthGuard} from './shared/service/auth.guard';

const routes: Routes = [
  {
    path: 'account-recovery',
    component: AccountRecoveryComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    loadChildren: () => import('./secured/secured.module').then(module => module.SecuredModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules,
        enableTracing: true,
        relativeLinkResolution: 'corrected',
        onSameUrlNavigation: 'reload'
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
