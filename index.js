const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRoute = require("./routes/userRouter");
const vehicleRoute = require("./routes/vehicleRouter");
const bookingRouter = require("./routes/bookingRouter");
const paymentRouter = require("./routes/paymentRouter");
const reviewRouter = require("./routes/reviewRouter");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.get("/", (req, res) => {
  res.send("HI ALL WELCOME TO ZOOMCAR");
});

app.use("/user", userRoute);
app.use("/vehicle", vehicleRoute);
app.use("/booking", bookingRouter);
app.use("/payment", paymentRouter);
app.use("/review", reviewRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongodb is connected");
    app.listen(PORT, () =>
      console.log(`Server is created with the port ${PORT}`)
    );
  })
  .catch((err) => {
    console.log("Error", err);
  });
