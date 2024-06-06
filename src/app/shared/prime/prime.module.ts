import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { FileUploadModule } from 'primeng/fileupload';
import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

const sharedModules = [
  ButtonModule,
  SplitterModule,
  FileUploadModule,
  StepsModule,
  ToastModule,
];
@NgModule({
  imports: [CommonModule, ...sharedModules],
  exports: [...sharedModules],
  providers: [MessageService],
})
export class PrimeModule {}
