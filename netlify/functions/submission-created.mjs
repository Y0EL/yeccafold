const RECIPIENT = process.env.MAIL_TO || 'yoelandreasmanoppo@gmail.com'
const FROM = process.env.MAIL_FROM || 'yeccafold <onboarding@resend.dev>'
const HIDDEN_FIELDS = new Set(['form-name', 'bot-field'])

const FIELD_LABELS = {
  email: 'Email',
  name: 'Nama',
  message: 'Pesan',
  company: 'Perusahaan',
  phone: 'Telepon',
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatWaktu(iso) {
  try {
    return new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Jakarta',
    }).format(new Date(iso)) + ' WIB'
  } catch {
    return iso
  }
}

function renderRows(data) {
  const entries = Object.entries(data).filter(([key, value]) => !HIDDEN_FIELDS.has(key) && String(value).trim() !== '')
  if (entries.length === 0) {
    return '<tr><td style="padding:14px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#7a6f5f;">Tidak ada data tambahan.</td></tr>'
  }
  return entries.map(([key, value]) => {
    const label = FIELD_LABELS[key] || (key.charAt(0).toUpperCase() + key.slice(1))
    return `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #efe9df;font-family:Arial,Helvetica,sans-serif;">
          <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#a8987f;font-weight:700;margin-bottom:4px;">${escapeHtml(label)}</div>
          <div style="font-size:15px;color:#1a1208;font-weight:500;word-break:break-word;">${escapeHtml(value)}</div>
        </td>
      </tr>`
  }).join('')
}

function renderEmail({ data, formName, createdAt, primaryEmail }) {
  const waktu = formatWaktu(createdAt)
  const replyHint = primaryEmail
    ? `<a href="mailto:${escapeHtml(primaryEmail)}" style="display:inline-block;background:#1a1208;color:#faf7f2;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;padding:13px 26px;border-radius:10px;">Balas ke ${escapeHtml(primaryEmail)}</a>`
    : ''

  return `<!doctype html>
<html lang="id">
  <body style="margin:0;padding:0;background:#faf7f2;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:100%;background:#ffffff;border:1px solid #efe9df;border-radius:18px;overflow:hidden;">
            <tr><td style="height:4px;background:#b07d28;"></td></tr>
            <tr>
              <td style="padding:32px 36px 8px 36px;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#1a1208;letter-spacing:-0.5px;">yeccafold</div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#b07d28;font-weight:700;margin-top:6px;">Permintaan Demo Baru</div>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 36px 0 36px;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.25;color:#1a1208;">Ada calon klien yang tertarik.</div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#7a6f5f;margin-top:10px;">Seseorang baru saja meminta demo melalui situs yeccafold. Berikut detail yang mereka kirim.</div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 36px 8px 36px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;border:1px solid #efe9df;border-radius:14px;">
                  <tr>
                    <td style="padding:6px 22px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        ${renderRows(data)}
                        <tr>
                          <td style="padding:12px 0;font-family:Arial,Helvetica,sans-serif;">
                            <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#a8987f;font-weight:700;margin-bottom:4px;">Waktu</div>
                            <div style="font-size:14px;color:#1a1208;">${escapeHtml(waktu)}</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:12px 0 4px 0;font-family:Arial,Helvetica,sans-serif;">
                            <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#a8987f;font-weight:700;margin-bottom:4px;">Sumber</div>
                            <div style="font-size:14px;color:#1a1208;">Formulir ${escapeHtml(formName)}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            ${replyHint ? `<tr><td style="padding:18px 36px 4px 36px;">${replyHint}</td></tr>` : ''}
            <tr>
              <td style="padding:24px 36px 30px 36px;border-top:1px solid #efe9df;margin-top:10px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#a8987f;line-height:1.6;">Dikirim otomatis oleh platform yeccafold.<br>PT. Yeccafold Indonesia.</div>
              </td>
            </tr>
          </table>
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#c4b9a6;margin-top:16px;">yeccafold. Manajemen KOL. Jadi Efisien.</div>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    const payload = body.payload || {}
    const data = payload.data || {}
    const formName = payload.form_name || data['form-name'] || 'demo-request'
    const createdAt = payload.created_at || new Date().toISOString()
    const primaryEmail = data.email || payload.email || ''

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY belum diset. Email tidak dikirim.')
      return { statusCode: 200, body: 'no api key, skipped' }
    }

    const html = renderEmail({ data, formName, createdAt, primaryEmail })

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [RECIPIENT],
        reply_to: primaryEmail || undefined,
        subject: primaryEmail ? `Permintaan demo baru dari ${primaryEmail}` : 'Permintaan demo baru di yeccafold',
        html,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error('Resend gagal:', res.status, detail)
      return { statusCode: 200, body: 'resend error logged' }
    }

    return { statusCode: 200, body: 'email terkirim' }
  } catch (err) {
    console.error('submission-created error:', err)
    return { statusCode: 200, body: 'error handled' }
  }
}
