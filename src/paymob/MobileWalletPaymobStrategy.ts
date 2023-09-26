import axios from "axios";
import PaymobStrategy from "./PaymobStrategy";

export default class MobileWalletPaymobStrategy extends PaymobStrategy {
    integrationId: string;
    constructor() {
        super();
        this.integrationId = process.env.PAYMOB_MOBILE_WALLET_INTEGRATION_ID!
    }
    async getPaymentKey(user: User, amount: number): Promise<PaymobPayload> {
        let { orderId, token } = await this.createPayment(user, amount)
        let walletPayment = await this.identifyWalletPayment(token, user.phone);
        return {
            paymentId: orderId,
            data: walletPayment.iframe_redirection_url
        }
    }

    async identifyWalletPayment(token: string, phone: string) {
        try {
            let response = await axios.post(`${this.apiUrl}/acceptance/payments/pay`, {
                source: {
                    identifier: phone,
                    subtype: "WALLET"
                },
                payment_token: token
            })
            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}