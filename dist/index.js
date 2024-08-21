"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// import connectDB from "./components/db/conn"
const port = Number(process.env.PORT) || 3000;
app.use(express_1.default.urlencoded({
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
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Import Routes
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const todoRoute_1 = __importDefault(require("./routes/todoRoute"));
// Routes
app.get("/", (req, res) => {
    res.send("Welcome to Todos Api");
});
app.use("/api/user", userRoute_1.default);
app.use("/api/todo", todoRoute_1.default);
// Start the server
const startServer = async (port) => {
    //   await connectDB();
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
};
startServer(port);
