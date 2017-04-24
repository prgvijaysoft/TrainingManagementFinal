
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable'
import { Ng2Accordion } from 'ng2-native-accordion';

import { AppRouteModule } from './app.route.module';

import { AppComponent }  from './app.component';
import { LoginComponent } from './login.component';
import { AdminComponent } from './AdminModule/Component/admin.component';
import { TrainerComponent } from './TrainerModule/Component/trainer.component';
import { UserManagementComponent } from './AdminModule/Component/usermanagement.component';
import { TrainingManagementComponent } from './AdminModule/Component/trainingmanagement.component';
import { TrainingDetailComponent } from './TrainerModule/Component/trainingdetail.component';

import { DataFilterPipe } from './Pipes/data.filter.pipe';

@NgModule({
  imports:      [ BrowserModule, AppRouteModule, FormsModule, HttpModule, DataTableModule, Ng2Accordion ],
  declarations: [ AppComponent, LoginComponent, AdminComponent, TrainerComponent, UserManagementComponent,
   TrainingManagementComponent, TrainingDetailComponent, DataFilterPipe
   ],
  
  bootstrap:    [ AppComponent ] 
})
export class AppModule {
}
