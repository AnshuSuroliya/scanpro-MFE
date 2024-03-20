// side-menu.component.ts

import { Input } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  @Output() showManageUsers = new EventEmitter<void>();
  @Output() showUserDetails = new EventEmitter<void>();
  @Input() menuOpen: boolean = false;

  constructor(private route:ActivatedRoute,private router:Router) { }

  handleShowManageUsers() {
    this.showManageUsers.emit();
    this.router.navigate(['user-management']);
  }

  handleShowUserDetails() {
    this.showUserDetails.emit();
    this.router.navigate(['user-details']);
  }
}

