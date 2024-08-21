"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
// import connectDB from "./components/db/conn"
const port = Number(process.env.PORT) || 3000;
app.use(express.urlencoded({
    extended: true,
}));
// var whitelist = ["*"];
var corsOptions = {
    origin: "*",
    methods: ["GET", "PATCH", "POST", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "device-remember-token",
        "Access-Control-Allow-Origin",
        "Origin",
        "Accept",
    ],
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Import Routes
const userRoute = require("./routes/userRoute");
const todoRoute = require("./routes/todoRoute");
// Routes
app.get("/", (req, res) => {
    res.send("Welcome to Todos Api");
});
app.use("/api/user", userRoute);
app.use("/api/todo", todoRoute);
// Start the server
const startServer = (port) => __awaiter(void 0, void 0, void 0, function* () {
    //   await connectDB();
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
});
startServer(port);
