import makeWASocket, { DisconnectReason } from '@adiwajshing/baileys'

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {

async function connectToWhatsApp () {
    const sock = makeWASocket({
        // can provide additional config here
        printQRInTerminal: true
    })
    return m.reply('*Fitur Erorr*')
}
// run in main file
connectToWhatsApp()
}
handler.help = ['jadibot']
handler.tags = ['jadibot']
handler.command = /^jadibot$/i

export default handler