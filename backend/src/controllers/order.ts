import { Request,Response,NextFunction} from "express";
import Gig from "../model/Gig";
import Stripe from "stripe";

export const intent = async (req:Request, res:Response, next:NextFunction) => {
    const apiKey = 'sk_test_51NTLUhDeujXI8Gmvy43Fm8SM6QfZLAU2irCemDj06vkXGp0bI9iUXNqsswBl2spKWEYT37HXo1qTQcUD35PjKBiI00WNZ9fY1K';
    const config: Stripe.StripeConfig = {
        apiVersion: "2022-11-15"
    }; // Add any additional configuration options here if needed
    const stripe = new Stripe(apiKey, config);

  const gig:any = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

//   const newOrder = new Order({
//     gigId: gig._id,
//     img: gig.cover,
//     title: gig.title,
//     buyerId: req.userId,
//     sellerId: gig.userId,
//     price: gig.price,
//     payment_intent: paymentIntent.id,
//   });

//   await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};
