import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { filter, finalize, map, switchMap, take } from 'rxjs';
import { CustomModel } from 'src/app/_models/CustomModel';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  customModel = new CustomModel();
  employeeId = 0;

  constructor(
    private router: Router,
    private utilService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.customModel.disabled = true;
    this.utilService.queryParamsSanitization();
    this.utilService.turnModalStateErrorOn = false;

    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.customModel.disabled = false;
      this.customModel.isAmend = true;
      this.employeeId = this.activatedRoute.snapshot.params['id'];
    }
  }

  ngOnDestroy(): void {
    this.utilService.turnModalStateErrorOn = true;
  }

  setInfo(reference: string) {
    setTimeout(() => {
      var dom: any = document.getElementById(reference);
      if (dom) dom.click();
    }, 100);
  }

  changeTab(event: any) {
    //console.log(event);
    switch (event.originalEvent.target.innerText.toLowerCase()) {
      case 'job details':
        this.setInfo('getEmployeeJobDetails');
        break;

      case 'user info':
        this.setInfo('getUserData');
        break;

      case 'user role':
        this.setInfo('getAllRole');
        break;

      case 'contact info':
        break;

      case 'document':
        this.setInfo('getDocumentInfo');
        break;

      case 'others':
        break;

      default:
        break;
    }
  }
}
