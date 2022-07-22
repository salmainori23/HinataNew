let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i
import { readFileSync } from 'fs'

let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
let frep = { quoted: fgif, fileLength: fsizedoc, contextInfo: { externalAdReply: { showAdAttribution: true,
title: `「 👋 Hai ${name} 」`,
sourceUrl: sgc,
thumbnail: readFileSync('./thumbnail.jpg')
  }}}
let imgr = thumbnailUrl.getRandom()

    let [_, code, expired] = text.match(linkRegex) || []
    if (!code) throw `*Example:* ${usedPrefix + command} https://chat.whatsapp.com/DpqXHCpKCvi1TquMkI3mCI`
    let res = await conn.groupAcceptInvite(code)
    if (!res) throw res.toString()
    let name = await conn.getName(res).catch(_ => null)
    expired = Math.floor(Math.min(5, Math.max(999, isOwner ? expired && expired.isNumber() ? parseInt(expired) : 0 : 3)))
    let caption = `*Berhasil join grup* ${name || res} ${expired ? `selama *${expired}* hari` : ''}\n*Jangan lupa baca rules ngap!*`
    await conn.sendButton(m.chat, caption, wm, imgr, [
                ['Rules', `${usedPrefix}rules`]
            ], m, frep)
            
    let chats = global.db.data.chats[res]
    if (!chats) chats = global.db.data.chats[res] = {}
    if (expired) chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24
}
handler.command = /^join$/i

export default handler