import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditProfilePageComponent } from './edit-profile-page.component';

@NgModule({
  declarations: [EditProfilePageComponent],
  imports: [
      FormsModule,
      HttpClientModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: EditProfilePageComponent }]),
  ],
})
export class EditModule {}
