import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { CustomModel } from 'src/app/_models/CustomModel';
import { DesignModel } from 'src/app/_models/DesignModel';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import { UtilsService } from 'src/app/_services/utils/utils.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user-document',
  templateUrl: './user-document.component.html',
  styleUrls: ['./user-document.component.scss'],
})
export class UserDocumentComponent implements OnInit, AfterViewInit {
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  customModel = new CustomModel();
  designModel = new DesignModel();
  env = environment.apiUrl;
  files: any = [];
  isFileAvailable = false;
  showFileByModal = false;
  isGeneralInfoButton = false;
  @Input() documentInfoData: any;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private utilService: UtilsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] !== undefined) {
      this.customModel.model = {
        ...this.customModel.model,
        ...{ employeeId: this.activatedRoute.snapshot.params['id'] },
      };
    }
  }

  ngAfterViewInit(): void {}

  setDocumentInfoData() {
    //console.log(this.documentInfoData);
    if (this.documentInfoData != null) {
      this.customModel.model = this.documentInfoData.docmasterData;
      this.files = this.documentInfoData.docDetailsData;
      this.files.length > 0
        ? (this.isFileAvailable = true)
        : (this.isFileAvailable = false);
      this.showFileByModal = false;
      this.isGeneralInfoButton = true;
    }
  }

  updateDocumentMasterData() {
    this.employeeService
      .updateDocumentMaster(this.customModel.model)
      .subscribe({
        next: (v: any) => {
          this.messageService.add(
            this.utilService.successMessage(v.message, 2000)
          );
        },
      });
  }

  addDocumentInfo() {
    const formData = new FormData();
    var files = this.customModel.files;

    Object.entries(this.customModel.model).forEach(([key, value]: any) => {
      formData.append(key, value);
    });

    if (files !== undefined) {
      for (const file of files) {
        formData.append('files', file, file.name);
      }
    }

    this.employeeService.saveEmployeeDocumentInfo(formData).subscribe({
      next: (v: any) => {
        //console.log(v);
        if (v.status == true) {
          this.messageService.add(
            this.utilService.successMessage(v.message, 2000)
          );
          this.isFileAvailable = true;
          this.showFileByModal = true;
          this.customModel.clearAllFiles();
          this.clearFileFromCache();
          this.isGeneralInfoButton = true;
        }
      },
      error: (e) => {
        //console.log(e);
        this.displayError(e);
      },
    });
  }

  displayError(e: any) {
    const error: any = this.customModel.handleError(e);
    //console.log(error)
    if (error.isDbError) {
      this.messageService.add(
        this.utilService.dangerMessage(error.dbError, 4000)
      );
    }
  }

  clearFileFromCache() {
    const myElement = document.getElementById('file-upload-cancel-btn');
    if (myElement) myElement.click();
  }

  showFile() {
    if (this.showFileByModal == true) {
      this.employeeService
        .getDocumentMasterInfoByEmployee(this.customModel.model.employeeId)
        .subscribe({
          next: (v: any) => {
            //console.log(v);
            this.files = v.docDetailsData;
          },
          complete: () => {
            this.customModel.displayModal = true;
            this.showFileByModal = false;
          },
        });
    } else {
      this.customModel.displayModal = true;
    }
  }

  deleteFile(data: any) {
    const fileId = data.fileId;
    this.employeeService
      .deleteEmpoloyeeDoc(fileId, this.customModel.model.employeeId)
      .subscribe();
    if (data.currentFileLength == 0) {
      this.customModel.displayModal = false;
      this.isFileAvailable = false;
    }
  }
}