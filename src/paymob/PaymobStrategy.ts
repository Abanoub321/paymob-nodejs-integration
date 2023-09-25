import axios from "axios";

export default abstract class PaymobStrategy implements IPaymob {
    public frameId: string;
    public apiUrl: string = "https://accept.paymobsolutions.com/api";
    abstract integrationId: string;

    constructor() {
        this.frameId = process.env.PAYMOB_FRAME_ID!;
    }

    async authenticate(): Promise<string> {
        try {
            let response = await axios.post(`${this.apiUrl}/auth/tokens`, {
                api_key: process.env.PAYMOB_API_KEY
            })
            return response.data.token;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async registerOrder(token: string, amount: number): Promise<number> {
        let response = await axios.post(`${this.apiUrl}/ecommerce/orders`, {
            auth_token: token,
            delivery_needed: false,
            amount_cents: amount * 100,
            currency: "EGP",
            items: [],
        })
        return response.data.id;
    }
    async generatePaymentKey(token: string, order_id: number, user: User, amount: number): Promise<string> {
        try {
            let response = await axios.post(`${this.apiUrl}/acceptance/payment_keys`, {
                auth_token: token,
                amount_cents: amount * 100,
                expiration: 3600,
                order_id,
                currency: "EGP",
                billing_data: {
                    email: user.email || "NA",
                    phone_number: user.phone,
                    apartment: user.address ? user.address.apartment : "NA",
                    floor: user.address ? user.address.floor : "NA",
                    building: user.address ? user.address.building : "NA",
                    street: user.address ? user.address.street : "NA",
                    city: user.address ? user.address.city : "NA",
                    country: user.address ? user.address.country : "NA",
                    first_name: user.firstName,
                    last_name: user.lastName,
                    state: user.address ? user.address.state : "NA",
                    zip_code: user.address ? user.address.zip_code : "NA",
                },
                integration_id: this.integrationId,
                lock_order_when_paid: "false"
            })
            return response.data.token;
        } catch (error: any) {
            throw new Error(error);
        }
    }
    async createPayment(user: User, amount: number): Promise<PaymobCreatedPayment> {
        let token = await this.authenticate();
        let orderId = await this.registerOrder(token, amount);
        let paymentToken = await this.generatePaymentKey(token, orderId, user, amount);
        return {
            orderId: orderId,
            token: paymentToken
        };
    }

    abstract getPaymentKey(user: any, amount: number): Promise<PaymobPayload>;
}