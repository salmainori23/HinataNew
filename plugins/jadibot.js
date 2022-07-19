import { makeWASocket, protoType, serialize } from './lib/simple.js'
import pino from 'pino'
import qrcode from 'qrcode'
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {

const { AnyWASocket } = (await import('@adiwajshing/baileys'))

const start = async () => {
global.client = makeWASocket({
logger: pino({
level: 'silent'
}),
printQRInTerminal: false,
browser: ['bot', 'Chrome', '1.0.0'],
auth: state,
version: [2, 2224, 8]
})

client.ev.on('connection.update', async (update) => {
const {
connection,
lastDisconnect
} = update
if(lastDisconnect === undefined) {
if (update.qr !== undefined){
//printQRIfNecessaryListener
const { qrcode } = (await import('qrcode'))
const { AnyWASocket } = (await import('@adiwajshing/baileys'))
const client = new AnyWASocket()
conn.on("qr", (qr) => {
await client.sendFile(m.chat, qrcode.toDataURL(qr, { scale: 8 }), 'qrcode.png', 'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk WhatsApp Web\n3. Scan QR ini \nQR Expired dalam 20 detik', m)
console.log('Scan this qr')
)
}
}
if (connection === 'connecting') {}
if (connection === 'open') {
console.log(Connected, you login as ${client.user.name})
}
if (connection === 'close') console.log(update)
})

return client
}

start()
}
handler.help = ['jadibot']
handler.tags = ['jadibot']
handler.command = /^jadibot$/i

export default handler