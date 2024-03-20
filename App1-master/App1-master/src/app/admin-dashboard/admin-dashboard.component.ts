import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  menuOpen: boolean = true;
  showUserDetails: boolean = false;
  showManageUsers: boolean = false;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    const lastVisitedPage = this.localStorageService.getItem('lastVisitedPage');
    if (lastVisitedPage === 'manageUsers') {
      this.showManageUsers = true;
      this.showUserDetails = false;
    } else {
      this.showUserDetails = true;
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  handleShowUserDetails(): void {
    this.showUserDetails = true;
    this.showManageUsers = false;
    this.localStorageService.setItem('lastVisitedPage', 'userDetails');
  }

  handleShowManageUsers(): void {
    this.showManageUsers = true;
    this.showUserDetails = false;
    this.localStorageService.setItem('lastVisitedPage', 'manageUsers');
  }
}
