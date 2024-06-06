const ExportVar = {};
//#region [File Upload]
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `public/test-cases`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  //console.log(file.mimetype);
  if (!file.originalname.match(/\.(xlsx)$/)) {
    // upload only png and jpg format
    return cb(new Error("Please upload a Excel file"));
  }
  cb(undefined, true);
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
ExportVar.uploadMulter = upload;

//#endregion
module.exports = ExportVar;
