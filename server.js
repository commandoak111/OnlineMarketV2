const express = require("express");
const cors = require("cors");
const http = require("http");
const Path = require("path");
// const path = Path.resolve(__dirname,"./uploads")
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const server = http.createServer(app);
app.use(express.static(__dirname + "/dist/Learningv1"));

// Router
const productRouter = require("./app/routes/product.route");
const orderRouter = require("./app/routes/order.route");
const addressRouter = require("./app/routes/address.route");
const imageRouter = require("./app/routes/image.route");
// Connect database
const mongoose = require("mongoose");
const config = require("./DB");
mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(
    () => {
      console.log("database is connected");
    },
    (err) => {
      console.log("cannot connect to the database" + err);
    }
  );

const jwt = require("jsonwebtoken");
const secret = "secret";
const fs = require("fs");
const lodash = require("lodash");
app.use(cors());
app.use(bodyParser.json());

app.use("/market/product", productRouter);
app.use("/market/order", orderRouter);
app.use("/market/address", addressRouter);
app.use("/market/image",imageRouter)


server.listen(3010);
