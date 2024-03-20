import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'; // Import the necessary FontAwesome icons

import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  fullname: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-management-page',
  templateUrl: './user-management-page.component.html',
  styleUrls: ['./user-management-page.component.css']
})
export class UserManagementPageComponent implements OnInit {
  faSearch = faSearch; // Assign the imported faSearch icon
  faUser = faUser; // Assign the imported faUser icon

  users: User[] = [];
  filteredUsers: User[] = []; // Define filteredUsers property

  selectedUser: User | null = null;
  editMode: boolean = false;
  newRole = '';
  searchQuery = '';
  isDeleteConfirmationOpen = false;
  noMatches: boolean = false; // Add noMatches property

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<User[]>('http://localhost:6767/getUserProfiles')
      .subscribe(
        (response) => {
          console.log('Response data:', response);
          this.users = response;
          // Ensure to update filteredUsers initially with all users
          this.filteredUsers = this.users;
        },
        (error) => {
          console.error('Error fetching user profiles:', error);
        }
      );
  }

  filterUsers(): void {
    // Filter users based on searchQuery
    this.filteredUsers = this.users.filter(user =>
      user.fullname.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    // Check if there are no matches
    this.noMatches = this.filteredUsers.length === 0;
  }

  showDeleteConfirmation(user: User): void {
    this.selectedUser = user;
    this.isDeleteConfirmationOpen = true;
  }

  confirmDeleteUser(): void {
    if (this.selectedUser) {
      axios.delete(`http://localhost:6767/deleteUserProfile/${this.selectedUser.id}`)
        .then(response => {
          const updatedUsers = this.users.filter(user => user.id !== this.selectedUser?.id);
          this.users = updatedUsers;
          // After deletion, update filteredUsers too
          this.filteredUsers = this.users;
          console.log('User profile deleted successfully!');
          this.isDeleteConfirmationOpen = false;
          this.selectedUser = null;
        })
        .catch(error => {
          console.error('Error deleting user profile:', error);
          this.isDeleteConfirmationOpen = false;
          this.selectedUser = null;
        });
    }
  }

  handlePromoteUser(user: User): void {
    this.selectedUser = user;
    this.editMode = true;
  }

  async handleSaveRole(): Promise<void> {
    try {
      const response = await axios.put(`http://localhost:6767/updateUserRole/${this.selectedUser?.id}`, {
        role: this.newRole.toUpperCase()
      });
      if (response.status === 200) {
        console.log('Role updated successfully:', this.selectedUser);
        this.editMode = false;
      } else {
        console.error('Failed to update role:', response.statusText);
        throw new Error(response.statusText);
      }
    } catch (error: any) {
      console.error('Error updating role:', error.message);
    }
  }

  closeDialog(): void {
    // Implement the logic to close the dialog here
    // For example, you can set isDeleteConfirmationOpen to false
    this.isDeleteConfirmationOpen = false;
  }
}
