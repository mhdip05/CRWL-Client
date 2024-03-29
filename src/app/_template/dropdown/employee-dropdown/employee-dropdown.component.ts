import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs';
import { UtilsService } from 'src/app/_services/utils/utils.service';
import { EmployeeService } from '../../../_services/employee/employee.service';

@Component({
  selector: 'app-employee-dropdown',
  templateUrl: './employee-dropdown.component.html',
  styleUrls: ['./employee-dropdown.component.scss'],
})
export class EmployeeDropdownComponent implements OnInit {
  emptyMessage = 'No Record Found';
  currentEmployees: any = [];
  showClear = true;
  @Input() applyCustomClass = false;
  @Input() employees: any = [];
  @Input() editMode = false;
  @Input() disabled = false;
  @Input() selectedEmployee: any;
  @Input() placeholder = 'Select Employee';
  @Input() applyDefaultText = false;
  @Output() changeEmployee = new EventEmitter();

  constructor(
    private employeeService: EmployeeService,
    private utilService: UtilsService
  ) {}

  ngOnInit(): void {
    this.showClear = false;
  }

  onChange() {
    //console.log(this.selectedEmployee)
    if (
      this.selectedEmployee == null ||
      this.selectedEmployee.employeeId == -1
    ) {
      this.checkSelected();
      return;
    }

    //this.showClear = true;
    this.changeEmployee.emit(this.selectedEmployee);
  }

  checkSelected() {
    this.showClear = false;
    this.selectedEmployee = { employeeName: null, employeeId: 0 };
    this.changeEmployee.emit(this.selectedEmployee);
  }

  onShow() {
    //console.log(this.currentEmployees)
    if (this.currentEmployees.length > 0) {
      this.employees = this.currentEmployees;
      return;
    }
    this.emptyMessage = 'Loading...';
    this.employeeService
      .getEmployeeDropdown()
      //.pipe(filter((res: any) => res.length > 0))
      .subscribe({
        next: (res: any) => {
          let empty: any = [];
          if (this.applyDefaultText == true) {
            empty = [
              {
                employeeName: this.utilService.dropdownDefaultText(),
                employeeId: -1,
              },
            ];
          }
          this.employees = [...empty, ...res];
          this.currentEmployees = [...empty, ...res];
        },
      });
  }
}
