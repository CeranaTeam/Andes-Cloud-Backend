import express from "express";
import {onRequest} from "firebase-functions/v2/https";
import _cors from "cors";
import * as logger from "firebase-functions/logger";
import {setGlobalOptions} from "firebase-functions/v2/options";
import bodyParser from "body-parser";
import router from "./routes";
logger.info("=========== start app ===========");
const app = express();
app.use(bodyParser.json({limit: "10mb"}));
const cors = _cors({
  origin: [
    // "https://ceranapos.ebg.tw",
    // "https://ceranapos.web.app",
    // "https://pos.cerana.tech",
    // "https://ledger.cerana.tech",
    // "https://ledger.v2.cerana.tech",
    // "http://localhost:5173",
    "http://localhost:5173",
    /cerana\.tech$/,
    /web\.app$/,
    /ebg\.tw$/,
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.use(cors);

app.use("/", router);
app.get("/health", (req, res) => {
  res.send("ok");
});

setGlobalOptions({region: "asia-east1", maxInstances: 5});

export const api = onRequest(app);

export const dev = onRequest(app);

export const test = onRequest(app);
