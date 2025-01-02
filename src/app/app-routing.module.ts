import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// auth guard
import { AuthGuard } from './core/guards/auth.guard';

// components
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/ecommerce',
    pathMatch: 'full'
  },
  {
    path: "",
    component: PrivateLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
      }
    ]
  },
  // {
  //   path: "",
  //   component: PublicLayoutComponent,
  //   children: [
  //     { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
