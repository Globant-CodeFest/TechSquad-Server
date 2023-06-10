import Router from "express";
import { queryRouter } from "./queryRoutes.js";
export const v1Router = new Router();

v1Router.use(queryRouter);
