import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, TitleStrategy } from '@angular/router';
import { JwtService } from '../jwt.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private router:Router,private jwtService:JwtService){

  }
  

  loggedIn:boolean = false;
  isAdmin:boolean =false;
  
  jwtToken:string ="";
  ngOnInit(): void {
    this.CheckData();
  }

  CheckData(){
    this.jwtToken=this.jwtToken+localStorage.getItem("jwtToken");
    this.isAdmin = (this.jwtService.getClaim(this.jwtToken,"Role")=="ADMIN");
    this.jwtService.validateToken(this.jwtToken).subscribe((res:any)=>{
      this.loggedIn =res;
    })
  }

  toggleSearchBar(){
    document.getElementsByClassName("nav")[0].classList.toggle("search");
    document.getElementsByClassName("nav")[0].classList.toggle("no-search");
    document.getElementsByClassName("search-input")[0].classList.toggle("search-active");
  }

  toggleMenu(){
    document.getElementsByClassName("nav")[0].classList.toggle("mobile-nav");
    document.getElementsByClassName("nav-item")[0].classList.toggle("is-active");
    document.getElementsByClassName("menu-toggle")[0].classList.toggle("is-active");
  }

  GoToAdminDashboard(){
   this.router.navigate(['admin-dashboard']);
  }

  GotToUserDetails(){
    this.router.navigate(['edit-profile']);
  }

  GoToHome(){
    this.router.navigate(['']);
  }

  Logout(){
    localStorage.removeItem("jwtToken");
    this.router.navigate(['authpage']);
    this.loggedIn=false;
  }
  
}
