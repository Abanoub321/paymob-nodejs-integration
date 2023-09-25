import PaymobStrategy from "./PaymobStrategy";

export default class CreditCardPaymobStrategy extends PaymobStrategy {
    integrationId: string;
    constructor() {
        super();
        this.integrationId = process.env.PAYMOB_CREDIT_CARD_INTEGRATION_ID!;
    }
    async getPaymentKey(user: any, amount: number): Promise<PaymobPayload> {
        let { orderId, token } = await this.createPayment(user, amount)
        return {
            paymentId: orderId,
            data: `https://accept.paymobsolutions.com/api/acceptance/iframes/${this.frameId}?payment_token=${token}`
        }
    }
}