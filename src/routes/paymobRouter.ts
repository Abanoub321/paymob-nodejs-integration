import { Router } from "express";
import paymobController from "../controllers/paymobController.controller";

const router = Router();

router.route('/callback')
    .post(paymobController.paymobCallback)

export default router;