const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const AppError = require("./AppError");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRoutes");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
    res.send("<p>hello world</p>");
});

app.use("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    console.log(err);
    res.status(statusCode).json({
        status: "error",
        message: statusCode === 500 ? "Something went wrong" : message,
    });
});


module.exports = app;
