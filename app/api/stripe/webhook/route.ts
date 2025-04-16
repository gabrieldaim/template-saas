import stripe from "@/app/lib/stripe";
import { handleStripeCancelSubscription } from "@/app/server/stripe/handle-cancel-subscription";
import { handleStripePayment } from "@/app/server/stripe/handle-payment";
import { handleStripeSubscription } from "@/app/server/stripe/handle-subscription";

import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    try{
        const body = await req.text();
        const headerList = await headers();
        const signature = headerList.get("stripe-Signature");
    
        if (!signature) {
            return NextResponse.json({ error: "Signature not found" }, { status: 400 });
        }
    
        const event = stripe.webhooks.constructEvent(body, signature, secret!);
    
        switch(event.type) {
            case "checkout.session.completed": //pagamento realizado se status = paid / pode ser pagamento unico ou assinatura
                const metadata = event.data.object.metadata;
    
                if(metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
                    await handleStripePayment(event)
                }
    
                if(metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
                    await handleStripeSubscription(event)
                }
                console.log("Checkout session completed");
                break;
            case "checkout.session.expired":
                const expiredSession = event.data.object;
                console.log("Checkout session expired:", expiredSession);
                break;
            case "checkout.session.async_payment_succeeded": //boleto pago
                const asyncPaymentSucceededSession = event.data.object;
                console.log("Async payment succeeded:", asyncPaymentSucceededSession);
                break;
            case "checkout.session.async_payment_failed": //boleto falhou
                const asyncPaymentFailedSession = event.data.object;
                console.log("Async payment failed:", asyncPaymentFailedSession);
                break;
            case "customer.subscription.created":
                const subscription = event.data.object;
                console.log("Subscription created:", subscription);
                break;
            case "customer.subscription.updated":
                const subscriptionUpdate = event.data.object;
                console.log("Subscription updated:", subscriptionUpdate);
                break;
            case "customer.subscription.deleted":
                await handleStripeCancelSubscription(event)
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
                break;
        }

        return NextResponse.json({ message: "funcionou o webhook" }, { status: 200 });
    }catch (error) {
        console.error("Error processing webhook:", error);
        return NextResponse.json({ error: "Webhook error" }, { status: 500 });
    }
}
