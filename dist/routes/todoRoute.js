"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const checkToken_1 = require("../middleware/checkToken");
const TodoController_1 = require("../controllers/TodoController");
router.put("/update", checkToken_1.protect, TodoController_1.updatetodo);
router.get("/getall/:id", TodoController_1.getAlltodo);
router.get("/get/:id", TodoController_1.getSpecifictodo);
router.post("/add", checkToken_1.protect, TodoController_1.addtodo);
router.delete("/delete/:id", checkToken_1.protect, TodoController_1.deletetodo);
module.exports = router;
