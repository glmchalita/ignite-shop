import type { NextApiRequest, NextApiResponse } from 'next'

import { stripe } from '@/lib/stripe'

type Data = {
  checkoutUrl?: string
  error?: string
}

interface CheckoutCart {
  priceId: string
  quantity: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { cart } = req.body
  const successUrl = `${process.env.NEXT_URL}/sucess?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method now allowed' })
  }

  if (!cart) {
    return res.status(400).json({ error: 'Cart not found' })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: cart.map((item: CheckoutCart) => ({
      price: item.priceId,
      quantity: item.quantity,
    })),
  })

  if (checkoutSession.url) {
    return res.status(201).json({
      checkoutUrl: checkoutSession.url,
    })
  }
}
