import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import viewEnginer from "./config/viewEnginer";
import initWebRoutes from "./route/web";
import connectBD from "./config/connectBD";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEnginer(app);
initWebRoutes(app);

connectBD();

let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log("starting.. in port" + port);
});
