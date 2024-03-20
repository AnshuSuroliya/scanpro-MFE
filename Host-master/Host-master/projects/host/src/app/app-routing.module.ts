import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInService } from './GuardServices/is-logged-in.service';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () =>
      import('remoteapp1/homeModule').then((module)=>module.HomePageModule),
  },
  {
    path: 'authpage',
    loadChildren: () =>
      import('remoteapp2/authModule').then((module)=>module.AuthModule)
  },
  {
    path: 'showImg/:path/:name',
    loadChildren: () =>
      import('remoteapp1/imgModule').then((module) => module.ImgModule),canActivate:[IsLoggedInService]
  },
  {
    path:'manageRepo/:name',
    loadChildren: () =>
      import('remoteapp1/repoManageModule').then((module) => module.RepoManageModule),canActivate:[IsLoggedInService]
  },
 
  {
    path:'reset/password',
    loadChildren: () =>
      import('remoteapp2/resetModule').then((module) => module.ResetModule),
  },
  {
    path:'email/verification',
    loadChildren: () =>
      import('remoteapp2/emailModule').then((module) => module.EmailModule),
  },
  {
    path:'addDirectory/:path/:type',
    loadChildren: () =>
      import('remoteapp1/directoryModule').then((module) => module.DirectoryModule),canActivate:[IsLoggedInService]
  },
  {
    path:'repo',
    loadChildren: () =>
      import('remoteapp1/repoModule').then((module) => module.RepoModule),canActivate:[IsLoggedInService]
  },
  {
    path:'admin-dashboard',
    loadChildren: () =>
      import('remoteapp3/adminModule').then((module) => module.AdminModule),
  },
  {
    path:'edit-profile',
    loadChildren: () =>
      import('remoteapp3/editModule').then((module) => module.EditModule),
  },
  {
    path:'user-management',
    loadChildren: () =>
      import('remoteapp3/userManageModule').then((module) => module.UserManageModule),
  },
  {
    path:'user-details',
    loadChildren: () =>
      import('remoteapp3/userModule').then((module) => module.UserModule),canActivate:[IsLoggedInService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
