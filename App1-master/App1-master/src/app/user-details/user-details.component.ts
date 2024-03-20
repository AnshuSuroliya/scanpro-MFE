import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  fullname: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  searchQuery: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<User[]>('http://localhost:6767/getUserProfiles')
      .subscribe(
        (response) => {
          console.log('Response data:', response);
          this.users = response;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching user profiles:', error);
          this.loading = false;
        }
      );
  }

  handleSearch(event: any) {
    this.searchQuery = event.target.value;
  }

  get filteredUsers(): User[] {
    return this.users.filter(user =>
      user.fullname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
