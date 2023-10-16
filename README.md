# paymob-nodejs-integration

This guide demonstrates a modular and efficient approach to using the PayMob library for seamless integration of PayMob's payment services into your project.

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Webhook Callback](#webhook-callback)
- [Issues](#issues)

## Introduction

This guide is intended to help you integrate PayMob's payment services into your project in a modular and efficient way. It is recommended that you read the [official documentation](https://docs.paymob.com/docs) before proceeding with this guide.

## Usage

You can know more about the usage of the library by reading the [official documentation](https://docs.paymob.com/docs).
This guide will focus on the integration of the library into your project, and how to use it in a modular way.

## Environment Variables

The library uses environment variables to configure the library. You can set the environment variables in a `.env` file in the root directory of your project. The required environment variables can be found in `.env.samples` file.

```bash
PAYMOB_API_KEY
PAYMOB_FRAME_ID
PAYMOB_CREDIT_CARD_INTEGRATION_ID
PAYMOB_CREDIT_CARD_INTEGRATION_ID
PAYMOB_MOBILE_WALLET_INTEGRATION_ID
```

## Webhook Callback

 Paymob uses webhook callbacks to notify you of the status of the payment. You can set the webhook callback url in paymob dashboard.
 For testing purposes, you can use [ngrok](https://ngrok.com/) to create a tunnel to your localhost. You can then use the generated url as the webhook callback url as mentioned in the [official documentation](https://docs.paymob.com/docs/transaction-webhooks).

 You can check the webhook callback example in the router file `src/routes/paymobRouter.ts`.

## Issues

If you encounter any issues while using the library, please open an issue in the [issues](https://github.com/Abanoub321/paymob-nodejs-integration/issues) section of the repository.
