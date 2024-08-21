import express from "express";
const router = express.Router();
import { protect } from "../middleware/checkToken";

import {
  updatetodo,
  getAlltodo,
  addtodo,
  getSpecifictodo,
  deletetodo,
} from "../controllers/TodoController";

router.post("/update", protect, updatetodo);

router.get("/getall/:id", getAlltodo);
router.get("/get/:id", getSpecifictodo);

router.post("/add", protect, addtodo);

router.delete("/delete/:id", protect, deletetodo);

export default router;
