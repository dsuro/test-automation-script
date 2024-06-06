const express = require("express");
const router = express.Router();
const controller = require("../controllers/test-case-controller");
const utility = require("./../utils/utility");

//#region [All Routes]
router.post(
  "/upload-test-cases",
  utility.uploadMulter.single("file"),
  controller.uploadTestCases
);
router.get("/test-case-data", controller.getTestCaseData);
router.post("/script-code", controller.getScriptCodes);
router.post("/script-compile", controller.compileScript);
//#endregion
module.exports = router;
