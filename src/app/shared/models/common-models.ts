export interface HeaderNavigation {
  stage: string;
  data: any;
  action: string;
}
export interface ScenarioModel {
  scenarioId: number;
  scenarioTitle: string;
  isCompleted: boolean;
  selected: boolean;
}
export interface TestCaseModel {
  testCaseId: number;
  steps: Array<TestStepsModel>;
}
export interface TestStepsModel {
  testCaseId: number;
  stepId: number;
  stepDesc: string;
  isCompleted: boolean;
  selected: boolean;
}
export interface ScriptCodeModel {
  testCaseId: number;
  subStepId: number;
  code: string;
}
export interface ScriptCodeReq {
  testCaseId: number;
  subStepId: number;
  code?: string;
}
export interface ScriptCompileResponse {
  success: boolean;
  message: string;
  isAllStepsCompleted: boolean;
}
export interface TestCaseDataModel {
  testCaseId: number;
  testCaseDesc: string;
  isCompleted: boolean;
  selected: boolean;
  steps: Array<string>;
  subSteps: Array<SubStepDataModel>;
}
export interface SubStepDataModel {
  testCaseId: number;
  subStepId: number;
  steps: Array<string>;
  isCompleted: boolean;
  selected: boolean;
}
