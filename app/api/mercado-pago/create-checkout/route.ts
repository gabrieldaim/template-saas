import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import mpClient from "@/app/lib/mercado-pago";

export async function POST(req: NextRequest) {
    const { testeId, userEmail } = await req.json();

    try{
        const preference = new Preference(mpClient)

        const createdPreference = await preference.create({
            body: {
                external_reference: testeId,
                metadata: {
                    testeId,// Variavel convertida em snake_case - teste_id
                    userEmail, // Variavel convertida em snake_case - user_email
                },
                ...(userEmail && { payer: { email: userEmail } }), // Adiciona o email do usuário se estiver disponível
                items: [
                    {
                        title: "Teste",
                        description: "Teste",
                        quantity: 1,
                        currency_id: "BRL",
                        unit_price: 1.0,
                        category_id: "Teste",
                    },
                ],
                payment_methods: {
                    installments: 12,
                    // excluded_payment_types: [
                    //     { id: "bolbradesco" }, // Exclui boleto
                    //     { id: "pec" }, // Exclui 
                    // ],
                    // excluded_payment_methods: [
                    //     { id: "credit_card" }, // Exclui cartão de crédito
                    //     { id: "debit_card" },
                    // ]

                },
                auto_return: "approved",
                back_urls: {
                    success: `${req.headers.get("origin")}/api/mercado-pago/pending`,
                    failure: `${req.headers.get("origin")}/api/mercado-pago/pending`,
                    pending: `${req.headers.get("origin")}/api/mercado-pago/pending`,
                }
            }
        });

        if(!createdPreference.id) {
            return NextResponse.json({ error: "Erro ao criar checkout no mercado pago" }, { status: 500 });
        }

        return NextResponse.json({
            preferenceId: createdPreference.id,
            initPoint: createdPreference.init_point},
            { status: 200 }
        );

    } catch (error) {
        console.log("Error creating checkout session:", error);
        return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 });
    }

}