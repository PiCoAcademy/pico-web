'use server'

import type { CartItem } from '@/lib/cart'

export interface ShippingAddress {
  firstName: string
  lastName:  string
  address:   string
  city:      string
  phone:     string
  email:     string
}

export interface CreateOrderResult {
  ok: boolean
  orderId?: string
  clientSecret?: string
  error?: string
}

export async function createOrder(
  items: CartItem[],
  shipping: ShippingAddress,
): Promise<CreateOrderResult> {
  try {
    const totalMad = items.reduce((s, i) => s + i.priceMad * i.qty, 0)

    // ── Supabase: insert order ──────────────────────────────────────────────
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    let orderId: string | undefined

    if (supabaseUrl && !supabaseUrl.includes('YOUR')) {
      const { createAdminClient } = await import('@pico/db')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const db = createAdminClient() as any

      const { data: order, error: orderErr } = await db
        .from('orders')
        .insert({
          contact_email:  shipping.email,
          contact_phone:  shipping.phone,
          shipping_name:  `${shipping.firstName} ${shipping.lastName}`,
          shipping_address: shipping.address,
          shipping_city:  shipping.city,
          total_mad:      totalMad,
          status:         'pending',
        })
        .select('id')
        .single()

      if (orderErr) throw orderErr
      orderId = order.id

      // Insert order items
      const orderItems = items.map((i) => ({
        order_id:   orderId,
        product_id: i.id,
        qty:        i.qty,
        unit_price: i.priceMad,
      }))
      await db.from('order_items').insert(orderItems)
    } else {
      console.log('[order] Would create order:', { items, shipping, totalMad })
      orderId = `mock-${Date.now()}`
    }

    // ── Stripe: create PaymentIntent ────────────────────────────────────────
    const stripeKey = process.env.STRIPE_SECRET_KEY
    let clientSecret: string | undefined

    if (stripeKey && !stripeKey.startsWith('sk_YOUR')) {
      const Stripe = (await import('stripe')).default
      const stripe = new Stripe(stripeKey)
      const pi = await stripe.paymentIntents.create({
        amount:   Math.round(totalMad * 100), // centimes MAD
        currency: 'mad',
        metadata: { orderId: orderId ?? '', email: shipping.email },
      })
      clientSecret = pi.client_secret ?? undefined
    }

    // ── Email: order confirmation ────────────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey && !resendKey.startsWith('re_YOUR')) {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from:    'PICO Store <noreply@pico.ma>',
        to:      shipping.email,
        subject: `Confirmation de commande — PICO Store`,
        text: [
          `Bonjour ${shipping.firstName},`,
          ``,
          `Votre commande a bien été reçue.`,
          `Numéro : ${orderId}`,
          `Total  : ${totalMad} MAD`,
          ``,
          items.map((i) => `• ${i.name} x${i.qty} — ${i.priceMad * i.qty} MAD`).join('\n'),
          ``,
          `Merci de votre confiance — PICO Group`,
        ].join('\n'),
      })
    }

    return { ok: true, orderId, clientSecret }
  } catch (err) {
    console.error('[order]', err)
    return { ok: false, error: String(err) }
  }
}
