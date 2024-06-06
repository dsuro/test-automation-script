const ExportVar = {};
var service = require("./../services/test-case-service");

//#region [All Controller Methods]
ExportVar.uploadTestCases = async (req, res) => {
  try {
    const testCaseData = await service.uploadTestCases();
    //console.log(testCaseData);
    return res.status(200).send(testCaseData);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
ExportVar.getTestCaseData = async (req, res) => {
  try {
    const testCaseData = await service.getTestCaseData();
    //console.log(testCaseData);
    return res.status(200).send(testCaseData);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

ExportVar.getScriptCodes = async (req, res) => {
  try {
    const { testCaseId, subStepId } = req.body;
    const scriptCode = await service.getScriptCodes(testCaseId, subStepId);
    return res.status(200).send(scriptCode);
  } catch (err) {
    //console.log(err);
    throw err;
  }
};

ExportVar.compileScript = async (req, res) => {
  try {
    const { testCaseId, subStepId } = req.body;
    const scriptCompileResult = await service.compileScript(
      testCaseId,
      subStepId
    );
    return res.status(200).send(scriptCompileResult);
  } catch (err) {
    //console.log(err);
    throw err;
  }
};
//#endregion
module.exports = ExportVar;
