
interface IPaymob {
    authenticate(): Promise<string>;
    registerOrder(token: string, amount: number): Promise<number>;
    generatePaymentKey(token: string, order_id: number, user: any, amount: number): Promise<string>;
    createPayment(user: any, amount: number): Promise<PaymobCreatedPayment>;
    getPaymentKey(user: any, amount: number): Promise<PaymobPayload>;
}