import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { LocalStorageService } from '../local-storage.service';
import { SideModule } from '../side-menu/side-menu.module';
import { UserManageModule } from '../user-management-page/user-management-page.module';
import { UserModule } from '../user-details/user-details.module';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
      FormsModule,
      HttpClientModule,
      SideModule,
      UserManageModule,
      UserModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: AdminDashboardComponent}]),
  ],
  providers:[
      LocalStorageService
  ]
})
export class AdminModule {}
