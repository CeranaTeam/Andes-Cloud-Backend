import express from "express";
import _cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";
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

app.use("/static", express.static("public"));
app.use(cors);
app.use("/", router);
app.get("/health", (req, res) => {
  res.send("ok");
});

app.listen(6767, () => {
  console.log("server start at port 6767");
});
