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
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UserInfoComponent } from './add-employee/user-info/user-info.component';
import { UserDocumentComponent } from './add-employee/user-document/user-document.component';
import { ContactInfoComponent } from './add-employee/contact-info/contact-info.component';
import { OtherComponent } from './add-employee/other/other.component';
import { UserRoleComponent } from './add-employee/user-role/user-role.component';
import { FileUploadModule } from 'primeng/fileupload';
import { AddRoleComponent } from './employee-settings/add-role/add-role.component';

@NgModule({
  declarations: [
    AddEmployeeComponent,
    UserListComponent,
    EmployeeSettingsComponent,
    AddDepartmentComponent,
    AddDesignationComponent,
    BasicInfoComponent,
    JobDetailsComponent,
    EmployeeListComponent,
    UserInfoComponent,
    UserDocumentComponent,
    ContactInfoComponent,
    OtherComponent,
    UserRoleComponent,
    AddRoleComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    PrimeuiSharedModule,
    FileUploadModule
  ]
})
export class EmployeeModule { }
