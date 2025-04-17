import { metadata } from './../../(project)/layout';
import { PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes';

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
    const metadata = paymentData.metadata
    const userEmail = metadata.user_email
    const testId = metadata.teste_id
    console.log("PAGAMENTO COM SUCESSO ", paymentData , userEmail, testId);
}