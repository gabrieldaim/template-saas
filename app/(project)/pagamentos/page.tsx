"use client"

import { useStripe } from "@/app/hooks/useStripe"
import test from "node:test"


export default function Pagamentos() {

    const {createPeyamentStripeCheckout, handleCreateStripePortal, createSubscriptionStripeCheckout} = useStripe()

    return(
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-4xl font-bold">Pagamentos</h1>
            <button onClick={() => {
                createPeyamentStripeCheckout({
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
        </div>
    )
}