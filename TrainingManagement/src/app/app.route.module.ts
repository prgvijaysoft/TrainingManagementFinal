import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { AdminComponent } from './AdminModule/Component/admin.component';
import { TrainerComponent } from './TrainerModule/Component/trainer.component';
import { UserManagementComponent } from './AdminModule/Component/usermanagement.component';
import { TrainingManagementComponent } from './AdminModule/Component/trainingmanagement.component';
import { TrainingDetailComponent } from './TrainerModule/Component/trainingdetail.component';


const routes: Routes = [
    { path:'',  redirectTo: '/login', pathMatch: 'full' },
    { path:'login', component: LoginComponent },
    { path:'admin', component: AdminComponent,
      children: [
       { path:'',  component: UserManagementComponent },
       { path:'user', component: UserManagementComponent },
       { path:'training', component: TrainingManagementComponent }
      ]  
    },
    { path:'trainer', component: TrainerComponent },
    { path:'trainingdetail/:id', component: TrainingDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouteModule {}