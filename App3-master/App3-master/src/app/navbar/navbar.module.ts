import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FileHandlerService } from '../Services/file-handler.service';
import { JwtService } from '../Services/jwt.service';
import { RepoService } from '../Services/repo.service';
import { CheckService } from '../Services/check.service';
import { ValidatorService } from '../Services/validator.service';
import { NavbarComponent } from './navbar.component';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    
    RouterModule.forChild([{ path: '', component: NavbarComponent }]),
  ],
  providers:[
      FileHandlerService,
      JwtService,
      RepoService,
      CheckService,
      ValidatorService,
      
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule {}
