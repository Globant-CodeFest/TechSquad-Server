import Router from "express";
import { queryController } from "../../../controllers/queryController.js";

export const queryRouter = new Router();

queryRouter.post("/query/", queryController.query);
