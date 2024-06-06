const ExportVar = {};
const testCaseData = require("./../../json/test_case_data.json");
const scriptCode = require("./../../json/script_codes.json");
const scriptPartialCompileSuccess = require("./../../json/script_compile_partail_success.json");
const scriptCompileFailure = require("./../../json/script_compile_failure.json");

//#region [All Service Methods]
ExportVar.uploadTestCases = async () => {
  const promiseObj = new Promise((res, rej) => {
    res(testCaseData);
  });
  return await promiseObj;
};

ExportVar.getTestCaseData = async () => {
  const promiseObj = new Promise((res, rej) => {
    res(testCaseData);
  });
  return await promiseObj;
};

ExportVar.getScriptCodes = async (testCaseId, subStepId) => {
  const promiseObj = new Promise((res, rej) => {
    //console.log(subStepId);
    //console.log(findScriptCodeById(testCaseId, subStepId));
    res(findScriptCodeById(testCaseId, subStepId));
  });
  return await promiseObj;
};

ExportVar.compileScript = async (testCaseId, subStepId) => {
  const promiseObj = new Promise((res, rej) => {
    //console.log("testCaseId::", testCaseId);
    //console.log("subStepId::", subStepId);
    res(scriptPartialCompileSuccess);
    //res(scriptCompileFailure);
  });
  return await promiseObj;
};
//#endregion
//#region [All private methods]

findScriptCodeById = (testCaseId, subStepId) => {
  return scriptCode["data"].find((item) => {
    return item["testCaseId"] === testCaseId && item["subStepId"] === subStepId;
  });
};
//#endregion
module.exports = ExportVar;
