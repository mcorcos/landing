import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { email, name, message } = await req.json()

  if (!email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Unit Landing <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL!,
    replyTo: email,
    subject: `Nuevo contacto desde unit.build`,
    text: `De: ${name || 'Sin nombre'} <${email}>\n\n${message}`,
    html: `
      <p style="font-family:monospace;color:#8A8A87;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">Nuevo contacto — unit.build</p>
      <p style="font-family:sans-serif;font-size:14px;color:#1A1A1A;"><strong>De:</strong> ${name || '-'} &lt;${email}&gt;</p>
      <hr style="border:1px solid #E5E5E3;margin:16px 0;" />
      <p style="font-family:sans-serif;font-size:16px;color:#1A1A1A;line-height:1.6;">${message.replace(/\n/g, '<br/>')}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
