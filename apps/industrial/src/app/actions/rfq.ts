'use server'

export interface RfqPayload {
  company: string
  sector:  string
  name:    string
  email:   string
  phone:   string
  type:    string
  brief:   string
  budget:  string
  timeline: string
}

export async function submitRfq(payload: RfqPayload): Promise<{ ok: boolean; id?: string }> {
  try {
    // ── Supabase insert ──────────────────────────────────────────────────────
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    let rfqId: string | undefined

    if (supabaseUrl && !supabaseUrl.includes('YOUR')) {
      const { createAdminClient } = await import('@pico/db')
      const db = createAdminClient()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (db as any)
        .from('rfq_requests')
        .insert({
          company:      payload.company,
          name:         payload.name,
          email:        payload.email,
          phone:        payload.phone,
          sector:       payload.sector,
          project_type: payload.type,
          brief:        payload.brief,
          budget:       payload.budget,
          timeline:     payload.timeline,
          status:       'new',
        })
        .select('id')
        .single()

      if (error) throw error
      rfqId = data.id
    } else {
      console.log('[rfq] Would insert to Supabase:', payload)
    }

    // ── Email notification ────────────────────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey && !resendKey.startsWith('re_YOUR')) {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)

      await resend.emails.send({
        from: 'PICO Industrial <noreply@pico.ma>',
        to:   'info@pico.ma',
        replyTo: payload.email,
        subject: `[RFQ] ${payload.company} — ${payload.type}`,
        text: [
          `Nouvelle demande de devis`,
          ``,
          `Société  : ${payload.company}`,
          `Secteur  : ${payload.sector}`,
          `Contact  : ${payload.name}`,
          `Email    : ${payload.email}`,
          `Tél      : ${payload.phone}`,
          ``,
          `Type de projet : ${payload.type}`,
          `Budget         : ${payload.budget}`,
          `Délai          : ${payload.timeline}`,
          ``,
          `Description :`,
          payload.brief,
          rfqId ? `\nID Supabase : ${rfqId}` : '',
        ].join('\n'),
      })
    } else {
      console.log('[rfq] Would send email for:', payload)
    }

    return { ok: true, id: rfqId }
  } catch (err) {
    console.error('[rfq] Error:', err)
    return { ok: false }
  }
}
