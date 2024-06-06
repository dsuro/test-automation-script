import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptUploaderComponent } from './components/script-uploader/script-uploader.component';
import { ScriptViewerComponent } from './components/script-viewer/script-viewer.component';
import { PrimeModule } from './prime/prime.module';
import { FormsModule } from '@angular/forms';

const sharedComponents = [ScriptUploaderComponent, ScriptViewerComponent];
@NgModule({
  imports: [CommonModule, FormsModule, PrimeModule],
  declarations: [...sharedComponents],
  exports: [...sharedComponents],
})
export class SharedModule {}
