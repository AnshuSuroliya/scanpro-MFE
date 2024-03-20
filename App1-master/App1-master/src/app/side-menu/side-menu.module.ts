import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SideMenuComponent } from './side-menu.component';

@NgModule({
  declarations: [SideMenuComponent],
  imports: [
      FormsModule,
      HttpClientModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: SideMenuComponent }]),
  ],
  exports:[
      SideMenuComponent
  ]
})
export class SideModule {}
