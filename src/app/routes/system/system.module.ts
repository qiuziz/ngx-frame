import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AccountFormComponent } from './account/account-form/account-form.component';


const COMPONENTS = [
  AccountComponent,
  AccountFormComponent,
];

const routes: Routes = [
  {path: '', redirectTo: 'account', pathMatch: 'full'},
  {
    path: 'account',
    component: AccountComponent,
    data: {
      title: '账号管理'
    },
  },
  {
    path: 'account/:type',
    component: AccountFormComponent,
    data: {
      title: '账号信息'
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // ComponentModule,
    SharedModule
  ],
  declarations: COMPONENTS,
})
export class SystemModule { }
