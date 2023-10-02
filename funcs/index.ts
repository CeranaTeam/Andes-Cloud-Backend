import express from "express";
import multer from "multer";
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {setGlobalOptions} from "firebase-functions/v2/options";

logger.info("=========== start app ===========");
// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({storage: storage});

const app = express();


app.use(express.static("public"));

app.post("/upload", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  } else {
    return res.status(200).send("File uploaded successfully.");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
// cloud functions

setGlobalOptions({region: "asia-east1", maxInstances: 5});

export const api = onRequest(app);

export const dev = onRequest(app);

export const hello = onRequest((req, res) => {
  res.send("Hello from Firebase!");
});
