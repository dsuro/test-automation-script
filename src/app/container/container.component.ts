import { Component, OnInit, ViewChild } from '@angular/core';
import { ScriptViewerComponent } from '../shared/components/script-viewer/script-viewer.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
})
export class ContainerComponent implements OnInit {
  @ViewChild('scriptViewer') scriptViewer!: ScriptViewerComponent;
  constructor() {}

  ngOnInit() {}
  onTestCaseUpload(event: any) {
    console.log(event);
    if (event) {
      this.scriptViewer.loadTestCases(event);
    }
  }
}
