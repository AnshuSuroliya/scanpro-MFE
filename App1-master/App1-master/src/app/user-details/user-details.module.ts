import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './user-details.component';

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
      FormsModule,
      HttpClientModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: UserDetailsComponent }]),
  ],
  exports:[
      UserDetailsComponent
  ]
})
export class UserModule {}
