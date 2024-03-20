import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AuthPageComponent],
  imports: [
      FormsModule,
      HttpClientModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: AuthPageComponent }]),
  ],
})
export class AuthModule {}
