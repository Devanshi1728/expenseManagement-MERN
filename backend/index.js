const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transaction");

dotenv.config();

const app = express();
connectDB();
//middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/api/v1", transactionRoutes);

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
