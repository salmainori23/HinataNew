import fetch from 'node-fetch'
import { tiktokdl, tiktokdlv2 } from '@bochilteam/scraper'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hoppai.getRandom())
let name = await conn.getName(who)

if (!args[0]) throw `Use example ${usedPrefix}${command} https://vt.tiktok.com/ZSwWCk5o/`
let buttons = [
	{ buttonText: { displayText: 'With Wm' }, buttonId: `${usedPrefix}tiktokwm ${args[0]}` },
	{ buttonText: { displayText: 'No Wm' }, buttonId: `${usedPrefix}tiktoknowm ${args[0]}` }
	]
if (command == 'tiktok') {
    const { author: { nickname }, video, description } = await tiktokdl(args[0]).catch(async _ => await tiktokdlv2(args[0]))
    const url = video.no_watermark || video.no_watermark_hd || video.with_watermark || video.no_watermark_raw
    if (!url) throw 'Can\'t download video!'
let caption = `${htki} *TIKTOK* ${htka}
🧏 *Nickname:* ${nickname}
🔗 *Url:* ${await shortUrl(url)}

*Description:* ${description}
`
	conn.sendHydrated(m.chat, `${htki} ᴛɪᴋᴛᴏᴋ ᴡᴍ ${htka}`, caption, `${await shortUrl(url)}`, url, '🌎 s ᴏ ᴜ ʀ ᴄ ᴇ', null, null, [
      ['🎀 Menu', '/menu']
    ], m)
}

if (command == 'tiktokwm') {
let linkwm = `https://api.lolhuman.xyz/api/tiktokwm?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`
if (!linkwm) throw 'Can\'t download video!'
let caption2 = `*TIKTOK WM*
*Url:* ${await shortUrl(`${args[0]}`)}
`
/*
	let buttonMessage= {
'video': {'url': linkwm},
'mimetype': "video/mp4",
'fileLength': fsizedoc,
'jpegThumbnail': await (await fetch(pp)).buffer(),
'contextInfo': {
'externalAdReply': {
'showAdAttribution': true,
'mediaUrl': gcwangsaf,
'mediaType': 2,
'previewType': 'pdf',
'title': `👋 Hai, ${name}` ,
'body': 'Role ',
'thumbnail': await (await fetch(hwaifu.getRandom())).buffer(),
'sourceUrl': gcwangsaf}},
'caption': caption2,
'footer': wm,
'buttons': buttons,
'headerType': 6}
    await conn.sendMessage(m.chat, buttonMessage, {quoted: fgif})
    */
    conn.sendHydrated(m.chat, `${htki} ᴛɪᴋᴛᴏᴋ ᴡᴍ ${htka}`, caption3, `${await shortUrl(linkwm)}`, linkwm, '🌎 s ᴏ ᴜ ʀ ᴄ ᴇ', null, null, [
      ['🎀 Menu', '/menu']
    ], m)
}

if (command == 'tiktoknowm') {
let link = await fetch(`https://api.lolhuman.xyz/api/tiktok?apikey=9b817532fadff8fc7cb86862&url=${args[0]}`)
let has = await link.json()
let x = has.result
if (!x.link) throw 'Can\'t download video!'
let caption3 = `*TIKTOK NO WM*
*Title:* ${x.title}
*Keyword:* ${x.keywords}
*Description:* ${x.description}
*Url:* ${await shortUrl(x.link)}
`
/*
let buttonMessage = {
'video': {'url': x.link},
'mimetype': "video/mp4",
'fileLength': fsizedoc,
'jpegThumbnail': await (await fetch(pp)).buffer(),
'contextInfo': {
'externalAdReply': {
'showAdAttribution': true,
'mediaUrl': gcwangsaf,
'mediaType': 2,
'previewType': 'pdf',
'title': `👋 Hai, ${name}` ,
'body': 'Role ',
'thumbnail': await (await fetch(hwaifu.getRandom())).buffer(),
'sourceUrl': gcwangsaf}},
'caption': caption3,
'footer': wm,
'buttons': buttons,
'headerType': 6}
    await conn.sendMessage(m.chat, buttonMessage, {quoted: fgif})
    */
	conn.sendHydrated(m.chat, `${htki} ᴛɪᴋᴛᴏᴋ ᴡᴍ ${htka}`, caption3, `${await shortUrl(x.link)}`, x.link, '🌎 s ᴏ ᴜ ʀ ᴄ ᴇ', null, null, [
      ['🎀 Menu', '/menu']
    ], m)
}

if (command == 'tiktokdl') {
if (!args[0]) throw `Use example ${usedPrefix}${command} https://www.tiktok.com/@omagadsus/video/7025456384175017243`
    const { author: { nickname }, video, description } = await tiktokdl(args[0])
    const url = video.no_watermark || video.no_watermark2 || video.no_watermark_raw
    if (!url) throw 'Can\'t download video!'
    conn.sendHydrated(m.chat, `${htki} ᴛɪᴋᴛᴏᴋ ᴡᴍ ${htka}`, `➔ ɴɪᴄᴋɴᴀᴍᴇ ${nickname}${description ? `\n➔ ᴅᴇsᴄʀɪᴘᴛɪᴏɴ:\n${description}` : ''}`, `${await shortUrl(url)}`, url, '🌎 s ᴏ ᴜ ʀ ᴄ ᴇ', null, null, [
      ['🎀 Menu', '/menu']
    ], m)
}

}
handler.command = handler.help = ['tiktok', 'tiktokwm', 'tiktoknowm', 'tiktokdl']
handler.tags = ['downloader']

export default handler

async function getInfo(url) {
	// url = (await fetch(url)).url
	let id = url.split('?')[0].split('/')
	let res = await (await fetch(`https://www.tiktok.com/node/share/video/${id[3]}/${id[5]}/`)).json()
	return res?.seoProps?.metaParams
}

async function shortUrl(url) {
	return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text()
}
