import express, { IRouter, NextFunction, Request, Response } from "express";
import dataContoller from "../controllers/usersContoller";
import authController from "../controllers/authController";
import busController from "../controllers/busesConroller";
import lineController from "../controllers/linesController";
import { verifyAdmin, verifyUser } from "../helpers/jwt";
import { handleError } from "../utils/ErrorHandle";

const router: IRouter = express.Router();

router.use("/users", dataContoller);
router.use("/lines", lineController);
router.use("/buses", busController);

router.use("/auth", authController);

router.use((req: Request, res: Response) => {
  handleError(res, 404, "Miki is not found at Nimrodi Tower");
});

export default router;
