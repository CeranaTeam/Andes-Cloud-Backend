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

setGlobalOptions({region: "asia-east1", maxInstances: 5});

export const api = onRequest(app);

export const dev = onRequest(app);
