import express from "express";
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {setGlobalOptions} from "firebase-functions/v2/options";
import bodyParser from "body-parser";
import router from "./routes";
logger.info("=========== start app ===========");
const app = express();
app.use(bodyParser.json({limit: "10mb"}));
app.use("/", router);

// app.post("/upload", async (req: Request, res: Response) => {
//   const base64Image = req.body.image as string;

//   if (typeof base64Image !== "string") {
//     res.status(400).send("Invalid image data");
//     return;
//   }

//   const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

//   const storageDAO = new FirebaseStorageDAO();
//   const result = await storageDAO.uploadImage("trashCanId", base64Data, "1212");
//   logger.info(result);

//   res.status(200).send("File uploaded successfully.");
//   return;
// });

setGlobalOptions({region: "asia-east1", maxInstances: 5});

export const api = onRequest(app);

// export const dev = onRequest(app);
