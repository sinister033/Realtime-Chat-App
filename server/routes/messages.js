import express from "express";
import { addMessage, getAllMessage } from "../controllers/messages.js";

const router = express.Router();

router.post("/addMessage", addMessage);
router.post("/getMessage", getAllMessage);
export default router;
