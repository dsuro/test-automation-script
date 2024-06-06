import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScriptService } from '../../services/script.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-script-uploader',
  templateUrl: './script-uploader.component.html',
  styleUrls: ['./script-uploader.component.css'],
})
export class ScriptUploaderComponent implements OnInit {
  @Output() onCompletion: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('fileUploader') fileUploader!: FileUpload;
  public allowedExtensions: string = '.xlsx';
  public fileList: any[] = [];
  constructor(
    private spinner: NgxSpinnerService,
    private scriptService: ScriptService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  onUpload() {
    //console.log(this.fileUploader.files);
    if (this.fileUploader) {
      let formData: FormData = new FormData();
      const fileList = this.fileUploader?.files;
      if (fileList != null) {
        formData.append('file', fileList[0]);
      }
      this.fileUpload(formData);
    }
  }
  fileUpload(dto: any) {
    this.spinner.show();
    this.scriptService.uploadTestCases(dto).subscribe({
      next: (res) => {
        //console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'File uploaded successfully',
        });
        this.onCompletion.emit(res);
      },
      error: (err) => {
        //console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: err.message,
        });
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }
}
