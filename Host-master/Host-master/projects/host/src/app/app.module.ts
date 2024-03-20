import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JwtService } from './jwt.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, AdminComponent,NavbarComponent],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule],
  providers: [JwtService],
  bootstrap: [AppComponent],
})
export class AppModule {}
