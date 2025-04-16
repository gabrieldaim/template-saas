import Stripe from "stripe";
import "server-only"
import { db } from "@/app/lib/firebase";

export async function handleStripeCancelSubscription(event: Stripe.CustomerSubscriptionDeletedEvent){

    console.log("Cancel subscription")

            
    const customerId = event.data.object.customer;
    console.log("Customer ID    testeeeeee:", customerId);

    const userRef = await db.collection("users").where("stripeCustomerId", "==", customerId).get();

    if(userRef.empty){
        console.error("User ID not found in metadata");
        return;
    }

    const userId = userRef.docs[0].id;

    await db.collection("users").doc(userId).update({
        subscriptionStatus: "inactive",
    })

}