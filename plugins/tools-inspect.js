import * as baileys from '@adiwajshing/baileys'
let linkRegex = /chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, usedPrefix, command, args, text }) => {
if (!args[0] && args[1]) throw `Masukkan link`
if (args[0] && args[1]) {
	const sections = [
    {
	title: htki + 'INSPECT' + htka,
	rows: [
{title: "V1", rowId: usedPrefix + command + ' inspectv1 ' + args[1]},
{title: "V2", rowId: usedPrefix + command + ' inspectv2 ' + args[1]}
	]
    }
]

const listMessage = {
  text: `⚡ Silakan pilih INSPECT di bawah...`,
  footer: global.wm,
  title: `⎔───「 ${command} 」───⎔`,
  buttonText: `☂️ Klik Disini ☂️`,
  sections
}
await conn.sendMessage(m.chat, listMessage, {quoted: fgif})
}

if (args[0] == 'inspectv2') {
  let [, code] = args[1].match(linkRegex) || []
  if (!code) throw 'Link invalid'
  let res = await conn.query({
    json: ["query", "invite", code],
    expect200: true
  })
  if (!res) throw res
  let caption = `
-- [Group Link Inspector] --
${res.id}
*Judul:* ${res.subject}
*Dibuat* oleh @${res.id.split('-')[0]} pada *${formatDate(res.creation * 1000)}*${res.subjectOwner ? `
*Judul diubah* oleh @${res.subjectOwner.split`@`[0]} pada *${formatDate(res.subjectTime * 1000)}*`: ''}${res.descOwner ? `
*Deskripsi diubah* oleh @${res.descOwner.split`@`[0]} pada *${formatDate(res.descTime * 1000)}*` : ''}
*Jumlah Member:* ${res.size}
*Member yang diketahui join*: ${res.participants ? '\n' + res.participants.map((user, i) => ++i + '. @' + user.id.split`@`[0]).join('\n').trim() : 'Tidak ada'}
${res.desc ? `*Deskripsi:*
${res.desc}` : '*Tidak ada Deskripsi*'}

*JSON Version*
\`\`\`${JSON.stringify(res, null, 1)}\`\`\`
`.trim()
  let pp = await conn.getProfilePicture(res.id).catch(console.error)
  if (pp) conn.sendFile(m.chat, pp, 'pp.jpg', null, m)
  m.reply(caption, false, {
    contextInfo: {
      mentionedJid: conn.parseMention(caption)
    }
  })
  }
  if (args[0] == 'inspectv1') {
  let [, code] = args[1].match(/chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i) || []
	if (!code) throw 'Invalid URL'
	let res = await conn.query({ tag: 'iq', attrs: { type: 'get', xmlns: 'w:g2', to: '@g.us' }, content: [{ tag: 'invite', attrs: { code } }] }),
		data = extractGroupMetadata(res),
		txt = Object.keys(data).map(v => `*${v.capitalize()}:* ${data[v]}`).join('\n'),
		pp = await conn.profilePictureUrl(data.id, 'image').catch(console.error)
	if (pp) return conn.sendMessage(m.chat, { image: { url: pp }, caption: txt }, { quoted: m })
	m.reply(txt)
  }
}
handler.help = ['inspect <chat.whatsapp.com>']
handler.tags = ['tools']

handler.command = /^inspect$/i

export default handler

function formatDate(n, locale = 'id') {
  let d = new Date(n)
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  })
}

const extractGroupMetadata = (result) => {
	const group = baileys.getBinaryNodeChild(result, 'group')
	const descChild = baileys.getBinaryNodeChild(group, 'description')
	let desc
	if (descChild) desc = baileys.getBinaryNodeChild(descChild, 'body')?.content
	const metadata = {
		id: group.attrs.id.includes('@') ? group.attrs.id : baileys.jidEncode(group.attrs.id, 'g.us'),
		subject: group.attrs.subject,
		creation: new Date(+group.attrs.creation * 1000).toLocaleString('id', { timeZone: 'Asia/Jakarta' }),
		owner: group.attrs.creator ? 'wa.me/' + baileys.jidNormalizedUser(group.attrs.creator).split('@')[0] : undefined,
		desc
	}
	return metadata
}
