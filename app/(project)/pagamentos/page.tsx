"use client"

import { useMercadoPago } from "@/app/hooks/useMercadoPago"
import { useStripe } from "@/app/hooks/useStripe"


export default function Pagamentos() {

    const {createPaymentStripeCheckout, handleCreateStripePortal, createSubscriptionStripeCheckout} = useStripe()
    const {createMercadoPagoCheckout} = useMercadoPago()

    return(
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-4xl font-bold">Pagamentos</h1>
            <button onClick={() => {
                createPaymentStripeCheckout({
                    testeId: "123"
                })
            }} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Criar pagamento Stripe</button>
            <button onClick={() => {
                createSubscriptionStripeCheckout({
                    testeId: "123"
                })
            }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Criar assinatura Stripe</button>
            <button onClick={handleCreateStripePortal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Criar portal Stripe</button>

            <button onClick={() => {
                createMercadoPagoCheckout({
                    testeId: "123",
                    userEmail: "teste@teste.com",
                })
            }} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Criar pagamento PIX</button>
        </div>
    )
}