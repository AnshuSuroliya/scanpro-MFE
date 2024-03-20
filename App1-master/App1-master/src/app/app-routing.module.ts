import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserManagementPageComponent } from './user-management-page/user-management-page.component';


const routes: Routes = [{
 
  path:'adminDashboard', component:AdminDashboardComponent,
 
},
{ path: 'edit-profile', component: EditProfilePageComponent },
{ path: 'user-management', component: UserManagementPageComponent },
{ path: 'user-details', component: UserDetailsComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
