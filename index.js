const express = require("express");
const app = express();
require("dotenv").config();
const mongoose  = require('mongoose');

const cloudinary = require("./cloudinary");
const uploader = require("./uploader");
const urlScehma = require('./urlSchema');

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://0.0.0.0:27017/multerTesting")
  .then(() => console.log("Connected too MongoDB..."))
  .catch((err) => console.error(err));




app.post("/upload", uploader.single("file"), async (req, res) => {
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    const url = new urlScehma({url:upload.url})
    console.log(upload)
    console.log(url);
    await url.save();
    return res.json({
      success: true,
      file: upload.secure_url,
    });
  });


// const PORT = process.env.PORT ;
app.listen(process.env.PORT, () => {
  console.log(`Connecting to the port ${process.env.PORT}.`);
});
