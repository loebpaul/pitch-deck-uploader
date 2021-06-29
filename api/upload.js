const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const pdf2img = require("pdf2img");
const app = express();
app.use(cors());

const uploadPath = "./public/uploads";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (req.file) {
      let pdfPath = req.file.filename;
      console.log("Uploaded file: " + pdfPath);

      pdf2img.setOptions({
        type: "png",
        density: 600,
        outputdir: uploadPath + path.sep + "output",
      });

      pdf2img.convert(uploadPath + path.sep + pdfPath, function (err, info) {
        if (err) console.log(err);
        else {
          console.log(info);
          let numPages = info.message.length;
          let pics = info.message;
          let imagePics = [];
          pics.forEach((elem) => {
            imagePics.push(elem.path);
          });
          res.send({
            status: true,
            numPages: numPages,
            images: imagePics,
            message: "File Uploaded. " + numPages + " pages",
          });
        }
      });
    } else {
      res.status(400).send({
        status: false,
        data: "File Not Uploaded",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => console.log("Server Running..."));
