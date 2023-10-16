class PaymobService {
    async handlePaymobCallback(orderId: number, success: boolean) {
        // Do something with the orderId and success to the transactioned product
    }
}

const paymobService = new PaymobService();
export default paymobService;