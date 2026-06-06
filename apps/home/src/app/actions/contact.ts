'use server'

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(payload: ContactPayload): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || apiKey.startsWith('re_YOUR')) {
    // No real key yet — log locally and succeed so the form works in dev
    console.log('[contact] Would send email:', payload)
    return { ok: true }
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'PICO Group <noreply@pico.ma>',
      to: 'info@pico.ma',
      reply_to: payload.email,
      subject: `[pico.ma] ${payload.subject}`,
      text: `De: ${payload.name} <${payload.email}>\n\n${payload.message}`,
    })

    return { ok: true }
  } catch {
    return { ok: false }
  }
}
