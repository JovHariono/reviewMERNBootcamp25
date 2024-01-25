require("dotenv").config();

const express = require("express");
const { DatabaseMongoDBConnector } = require("./libs/databases");
const { LibModuleRegister } = require("./libs/modules");
const { UserRouter } = require("./providers/users/routers");
const { HelloRouter } = require("./modules/hello/routers");
const { BarangRouter } = require("./modules/barang/routers");
const { TerimaRouter } = require("./modules/terima/routers");
const { KasRouter } = require("./modules/kas/routers");
const cors = require("cors")

const app = express();

app.use(cors({
  origin: "*",
}))

DatabaseMongoDBConnector({ hideSuccessMessage: false });

app.use(express.json());

LibModuleRegister(app, "users", UserRouter);
LibModuleRegister(app, "hello", HelloRouter);
LibModuleRegister(app, "barang", BarangRouter);
LibModuleRegister(app, "terima", TerimaRouter);
LibModuleRegister(app, "kas", KasRouter);

app.listen(process.env.APP_PORT, function () {
  console.log(`Server berjalan di port ${process.env.APP_PORT}.`);
});
