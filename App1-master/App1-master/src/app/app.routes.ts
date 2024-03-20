import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserManagementPageComponent } from './user-management-page/user-management-page.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';


export const routes: Routes = [
    { path: '', component: EditProfilePageComponent },
    { path: 'user-details', component: UserDetailsComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: 'user-management', component: UserManagementPageComponent },
    { path: 'edit-profile', component: EditProfilePageComponent },

];
