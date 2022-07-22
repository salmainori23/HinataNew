import fs from 'fs'
import { randomBytes } from 'crypto'

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let names = await conn.getName(who)
let imgr = flaaa.getRandom()

    let [_, code, expired] = text.match(linkRegex) || []
    if (!code) throw `*Example:* ${usedPrefix + command} https://chat.whatsapp.com/DpqXHCpKCvi1TquMkI3mCI`
    let res = await conn.groupAcceptInvite(code)
    if (!res) throw res.toString()
    let name = await conn.getName(res).catch(_ => null)
    expired = Math.floor(Math.min(5, Math.max(999, isOwner ? expired && expired.isNumber() ? parseInt(expired) : 0 : 3)))
    let caption = `*Berhasil join grup* ${name || res} ${expired ? `selama *${expired}* hari` : ''}\n*Jangan lupa baca rules ngap!*`
    await conn.sendButton(m.chat, caption, wm, imgr + 'join', [
                ['Rules', `${usedPrefix}rules`]
            ], m, { quoted: fgif, contextInfo: { externalAdReply: { showAdAttribution: true,
title: `「 👋 Hai ${names} 」`,
sourceUrl: sgc,
thumbnail: fs.readFileSync('./thumbnail.jpg')
  }}})
  await delay(1500)
  let chats = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0])
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text
  conn.reply(m.chat, `Membagikan Link Grup Kamu ke ${chats.length} chat`, m)
  for (let id of chats) {
  await delay(1500)
  await conn.sendHydrated(id, "*「 New Group 」* \n\n" + text, wm, imgr + 'New Group', linkRegex, 'LINK GROUP', null, null, [[null, null]], m)
  
    let chats = global.db.data.chats[res]
    if (!chats) chats = global.db.data.chats[res] = {}
    if (expired) chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24
}
handler.command = /^join$/i

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const delay = time => new Promise(res => setTimeout(res, time))
const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)
