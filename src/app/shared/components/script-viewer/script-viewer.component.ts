import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ScriptService } from '../../services/script.service';
import {
  HeaderNavigation,
  ScriptCodeModel,
  ScriptCodeReq,
  ScriptCompileResponse,
  SubStepDataModel,
  TestCaseDataModel,
} from '../../models/common-models';
import { NgxSpinnerService } from 'ngx-spinner';
import { HighlightService } from '../../services/highlight.service';

@Component({
  selector: 'app-script-viewer',
  templateUrl: './script-viewer.component.html',
  styleUrls: ['./script-viewer.component.css'],
})
export class ScriptViewerComponent implements OnInit {
  @Output() onCompletion: EventEmitter<HeaderNavigation> =
    new EventEmitter<HeaderNavigation>();
  public allTestCaseList: Array<TestCaseDataModel> = [];
  public selectedTestCaseData!: TestCaseDataModel | null;
  public allSubSteps: Array<SubStepDataModel> = [];
  public selectedSubStep!: SubStepDataModel | null;
  public selectedScriptCode!: ScriptCodeModel | null;
  public scriptCompileResponse!: ScriptCompileResponse | null;
  public disabledScriptRun: boolean = false;
  public disabledExecute: boolean = true;
  public codeHtml!: string;

  public customCode!: string;
  public HTMLSnippet!: string;

  @ViewChild('customCodeHighlighter', { static: false })
  customCodeHighlighter!: ElementRef;
  @ViewChild('customCodeSnippet', { static: false })
  customCodeSnippet!: ElementRef;
  @ViewChild('javaCodeContent', { static: false })
  javaCodeContent!: ElementRef;
  @ViewChild('preCodeBlock', { static: false }) preCodeBlock!: ElementRef;

  constructor(
    private cd: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private scriptService: ScriptService,
    private highlightService: HighlightService
  ) {}

  ngOnInit() {
    // this.getTestCaseData();
  }
  ngOnDestroy(): void {
    this.selectedTestCaseData = null;
    this.selectedSubStep = null;
    this.selectedScriptCode = null;
    this.scriptCompileResponse = null;
  }
  loadTestCases(res: any) {
    this.selectedTestCaseData = null;
    this.selectedSubStep = null;
    this.selectedScriptCode = null;
    this.scriptCompileResponse = null;
    if (res) {
      this.allTestCaseList = res['data'] || [];
      if (this.allTestCaseList.length > 0) {
        this.allTestCaseList[0].selected = true;
      }
      console.log(this.allTestCaseList);
    }
  }
  //#region [Action Methods]
  onTestCaseSelect(testCase: TestCaseDataModel) {
    //console.log(testCase);
    this.selectedTestCaseData = testCase;
    this.allSubSteps = testCase.subSteps || [];
    if (this.allSubSteps.length > 0) {
      this.allSubSteps[0].selected = true;
    }
  }
  onNextTestCase() {}
  onPrevTestCase() {}
  onPlaySubStep() {
    const item = this.allSubSteps.find((x) => x.selected == true);
    if (item) {
      this.onSubStepSelection(item);
    }
  }
  onRePlaySubSteps() {
    if (this.allSubSteps && this.allSubSteps.length > 0) {
      this.clearScriptRunPanel();
      this.allSubSteps.forEach((item) => {
        item.selected = false;
        item.isCompleted = false;
      });
      this.allSubSteps[0].selected = true;
    }
  }
  onSubStepSelection(item: SubStepDataModel) {
    this.clearScriptRunPanel();
    this.selectedSubStep = item;
    this.allSubSteps.forEach((element) => {
      if (element.subStepId === item.subStepId) {
        element.selected = true;
      } else element.selected = false;
    });
    this.getScriptCodes(item.testCaseId, item.subStepId);
  }
  onScriptRun(selectedScriptCode: ScriptCodeModel) {
    this.compileScript(
      selectedScriptCode.testCaseId,
      selectedScriptCode.subStepId
    );
  }
  rebindSubSteps(subStepId: number) {
    this.allSubSteps = this.scriptService.manupulateSteps(
      this.allSubSteps,
      subStepId
    );
  }
  clearScriptRunPanel() {
    this.selectedScriptCode = null;
    this.scriptCompileResponse = null;
    this.disabledScriptRun = false;
  }
  checkForAllCompletion(
    testCaseData: Array<TestCaseDataModel>,
    testCaseId: number,
    subStepId: number
  ) {
    if (this.scriptCompileResponse) {
      const isLastSubStep = this.scriptService.isLastSubStep(
        testCaseData,
        testCaseId,
        subStepId
      );
      this.scriptCompileResponse.isAllStepsCompleted = isLastSubStep
        ? true
        : false;
    }
  }
  onInput(): void {
    let code = this.customCode;
    if (code.endsWith('\n')) {
      code += ' ';
    }
    this.javaCodeContent.nativeElement.innerHTML = code;
    this.highlightService.highlightElement(this.javaCodeContent.nativeElement);
  }
  syncScroll(): void {
    const elemContainer = this.customCodeHighlighter.nativeElement;
    const elemTextArea = this.customCodeSnippet.nativeElement;
    const preCodeBlock = this.preCodeBlock.nativeElement;
    window.setTimeout(() => {
      elemContainer.scrollTop = elemTextArea.scrollTop;
      preCodeBlock.scrollLeft = elemTextArea.scrollLeft;
    }, 1);
  }
  //#endregion
  //#region [Api Calls]
  getScriptCodes(testCaseId: number, subStepId: number) {
    this.spinner.show();
    const reqBody: ScriptCodeReq = {
      testCaseId: testCaseId,
      subStepId: subStepId,
    };
    this.scriptService.getScriptCodes(reqBody).subscribe({
      next: (response) => {
        this.selectedScriptCode = response;
        console.log(this.selectedScriptCode);
        this.cd.detectChanges();
        this.HTMLSnippet = this.selectedScriptCode?.code as string;
        if (this.javaCodeContent) {
          this.javaCodeContent.nativeElement.innerHTML = this.HTMLSnippet;
          this.customCode = this.selectedScriptCode?.code as string;
          this.highlightService.highlightElement(
            this.javaCodeContent.nativeElement
          );
        }
      },
      error: (err) => {},
      complete: () => {
        this.spinner.hide();
      },
    });
  }
  async compileScript(testCaseId: number, subStepId: number) {
    this.spinner.show();
    const reqBody: ScriptCodeReq = {
      testCaseId: testCaseId,
      subStepId: subStepId,
      code: this.codeHtml,
    };
    const resp = await this.scriptService.compileScript(reqBody);
    this.scriptCompileResponse = resp;
    console.log(this.scriptCompileResponse);
    this.checkForAllCompletion(this.allTestCaseList, testCaseId, subStepId);
    if (this.scriptCompileResponse?.success) {
      this.rebindSubSteps(subStepId);
      this.disabledScriptRun = true;
    } else {
      this.disabledScriptRun = false;
    }
    if (this.scriptCompileResponse?.isAllStepsCompleted) {
      setTimeout(() => {
        this.clearScriptRunPanel();
        //this.rebindTestCases(testCaseId);
      }, 2000);
    }
    this.spinner.hide();
  }
  //#endregion
}
