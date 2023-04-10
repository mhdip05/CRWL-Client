import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UserListComponent } from './user-list/user-list-component';
import { PrimeuiSharedModule } from 'src/app/_shared/primeui-shared.module';
import { EmployeeSettingsComponent } from './employee-settings/employee-settings.component';
import { AddDepartmentComponent } from './employee-settings/add-department/add-department.component';
import { AddDesignationComponent } from './employee-settings/add-designation/add-designation.component';
import { BasicInfoComponent } from './add-employee/basic-info/basic-info.component';
import { JobDetailsComponent } from './add-employee/job-details/job-details.component';

@NgModule({
  declarations: [
    AddEmployeeComponent,
    UserListComponent,
    EmployeeSettingsComponent,
    AddDepartmentComponent,
    AddDesignationComponent,
    BasicInfoComponent,
    JobDetailsComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    PrimeuiSharedModule
  ]
})
export class EmployeeModule { }
