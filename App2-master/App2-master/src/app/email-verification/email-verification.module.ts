import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailVerificationComponent } from './email-verification.component';

@NgModule({
  declarations: [EmailVerificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EmailVerificationComponent }]),
  ],
})
export class EmailModule {}
