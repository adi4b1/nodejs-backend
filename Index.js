const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const vendorRoutes = require("./Routes/vendorRoutes");
const firmRoutes = require("./Routes/firmRoutes");
const productRoutes=require('./Routes/productRoutes')
const bodyParser = require("body-parser");
dotEnv.config();

const app = express();

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connections is success");
  })
  .catch((e) => console.log("getting error while connecting...", e));

const PORT = 3000 || process.env.PORT;

// middleware
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product",productRoutes);
app.listen(PORT, (req, res) => {
  console.log("server is running on ", PORT);
});
