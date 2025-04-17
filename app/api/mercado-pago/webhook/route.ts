import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import mpClient from "@/app/lib/mercado-pago";
import { handleMercadoPagoPayment } from "@/app/server/mercado-pago/handle-payment";

export async function POST(req: NextRequest) {
    try{


        const body = await req.json();

        const {type, data} = body;

        //webhook
        switch(type) {
            case "payment":
                const payment = new Payment(mpClient);
                const paymentData = await payment.get({ id: data.id });
                if(paymentData.status === "approved" || paymentData.date_approved !== null) {
                    await handleMercadoPagoPayment(paymentData);
                }
                break;
            case "subscription_preapproval":
                break;
            default:
                console.log("Unhandled event type:", type);        

        }

        return NextResponse.json({recived: true}, {status: 200});



    }catch (error) {
        console.log("Error handling webhook:", error);
        return NextResponse.json({error: "Error handling webhook"}, {status: 500});
    }
}