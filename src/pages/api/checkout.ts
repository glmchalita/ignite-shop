import { stripe } from "@/lib/stripe";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  checkoutUrl?: string;
  error?: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const {priceId} = req.body
  const successUrl = `${process.env.NEXT_URL}/sucess?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method now allowed'})
  }

  if (!priceId) {
    return res.status(400).json({error: 'Price not found'})
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ]
  })

  if (checkoutSession.url) {
    return res.status(201).json({
      checkoutUrl: checkoutSession.url
    })
  }
  
}
