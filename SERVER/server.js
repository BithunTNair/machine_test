const express = require("express");
const cors = require("cors");
require("dotenv").config();
const DB = require("./config/db");

const app = express();
DB();
const PORT = process.env.PORT;
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use("/auth", authRouter);
app.use("/users", userRouter);


app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
});
