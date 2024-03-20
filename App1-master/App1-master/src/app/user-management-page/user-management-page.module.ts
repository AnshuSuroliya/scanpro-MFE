import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserManagementPageComponent } from './user-management-page.component';

@NgModule({
  declarations: [UserManagementPageComponent],
  imports: [
      FormsModule,
      HttpClientModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: UserManagementPageComponent }]),
  ],
  exports:[
      UserManagementPageComponent
  ]
})
export class UserManageModule {}
