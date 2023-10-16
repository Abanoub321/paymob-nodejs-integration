import { NextFunction, Request, Response } from "express";
import paymobService from "../services/paymobService.service";
class PaymobController {
    public async paymobCallback(req: Request, res: Response, next: NextFunction) {
        const { obj, success }: PaymobCallback = req.body;
        const { id: orderId } = obj.order;
        await paymobService.handlePaymobCallback(orderId, success);
    }
}

const paymobController = new PaymobController();
export default paymobController;
