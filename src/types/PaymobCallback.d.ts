type PaymobCallback = {
    obj: {
        order: {
            id: number
        }
    },
    success: boolean
    // There are more fields, but we don't need them for my use case you can check for them here: https://docs.paymob.com/docs/transaction-webhooks
}