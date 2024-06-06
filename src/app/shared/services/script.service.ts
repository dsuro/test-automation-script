import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, lastValueFrom, map } from 'rxjs';
import { HelperService } from './helper.service';
import { SharedConstants } from '../constants/shared-constants';
import {
  ScriptCodeReq,
  SubStepDataModel,
  TestCaseDataModel,
} from '../models/common-models';

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  constructor(
    private httpClient: HttpClient,
    private helperService: HelperService
  ) {}

  uploadTestCases(reqBody: FormData) {
    const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
    const resourceUrl = this.helperService.getResourceUrl(
      SharedConstants.UPLOAD_TEST_CASE_API,
      true
    );
    return this.httpClient.post<any>(resourceUrl, reqBody, {
      headers: headers,
    });
  }
  getTestCaseData() {
    const resourceUrl = this.helperService.getResourceUrl(
      SharedConstants.TEST_CASE_DARA_API,
      true
    );
    return this.httpClient.get<any>(resourceUrl).pipe(map((res) => res));
  }
  getScriptCodes(reqBody: ScriptCodeReq) {
    const resourceUrl = this.helperService.getResourceUrl(
      SharedConstants.SCRIPT_CODE_API,
      true
    );
    return this.httpClient
      .post<any>(resourceUrl, reqBody)
      .pipe(map((res) => res));
  }
  async compileScript(reqBody: ScriptCodeReq) {
    const resourceUrl = this.helperService.getResourceUrl(
      SharedConstants.SCRIPT_COMPILE_API,
      true
    );
    return await lastValueFrom(
      this.httpClient.post<any>(resourceUrl, reqBody).pipe(delay(1000))
    );
  }
  //#region [Utility Methods]
  manupulateTestCaseData(
    allTestCases: Array<TestCaseDataModel>,
    testCaseId: number
  ) {
    let result = [];
    if (testCaseId) {
      allTestCases.forEach((element) => {
        if (element.testCaseId < testCaseId) {
          element.isCompleted = true;
          element.selected = false;
        } else if (element.testCaseId == testCaseId) {
          element.isCompleted = true;
          element.selected = false;
        } else if (element.testCaseId == testCaseId + 1) {
          element.isCompleted = false;
          element.selected = true;
        } else {
          element.isCompleted = false;
          element.selected = false;
        }
        result.push(element);
      });
    } else {
      for (let index = 0; index < allTestCases.length; index++) {
        const element = allTestCases[index];
        if (index == 0) {
          element.selected = true;
          element.isCompleted = false;
        } else {
          element.selected = false;
          element.isCompleted = false;
        }
        result.push(element);
      }
    }
    return result;
  }
  manupulateSteps(allSubSteps: Array<SubStepDataModel>, subStepId: number) {
    let result = [];
    if (subStepId) {
      allSubSteps.forEach((element) => {
        if (element.subStepId < subStepId) {
          element.isCompleted = true;
          element.selected = false;
        } else if (element.subStepId == subStepId) {
          element.isCompleted = true;
          element.selected = false;
        } else if (element.subStepId == subStepId + 1) {
          element.isCompleted = false;
          element.selected = true;
        } else {
          element.isCompleted = false;
          element.selected = false;
        }
        result.push(element);
      });
    } else {
      for (let index = 0; index < allSubSteps.length; index++) {
        const element = allSubSteps[index];
        if (index == 0) {
          element.selected = true;
          element.isCompleted = false;
        } else {
          element.selected = false;
          element.isCompleted = false;
        }
        result.push(element);
      }
    }
    return result;
  }
  isLastSubStep(
    testCaseData: Array<TestCaseDataModel>,
    testCaseId: number,
    subStepId: number
  ) {
    const testCase = testCaseData.find((item) => {
      return item['testCaseId'] == testCaseId;
    });
    const allSubSteps = testCase?.subSteps || [];
    const index = allSubSteps?.findIndex((item) => {
      return item['subStepId'] == subStepId;
    });
    // console.log("allSubSteps::", allSubSteps);
    // console.log("index::", index);
    if (index == allSubSteps.length - 1) {
      return true;
    } else {
      return false;
    }
  }
  //#endregion
}
