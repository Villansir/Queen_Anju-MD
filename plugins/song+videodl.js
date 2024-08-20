const { WAConnection, MessageType, Mimetype } = require('@whiskeysockets/baileys');
const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

cmd({
    pattern: "song",
    desc: "To download songs.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please give me a URL or title.");
        
        // Perform YouTube search
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        // Construct the message description
        let desc = `
⫷⦁[ * '-'_꩜ 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝙎𝙊𝙉𝙂 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍 ꩜_'-' * ]⦁⫸

🎵 *Song Found!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎧 *Enjoy the music brought to you by* *Queen Anju Bot*! 

> *Created with ❤️ by Janith Rashmika* 

> *© 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝘽𝙊𝙏 - MD* 
*💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD
`;

        // Send the song information
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Create a list message to select the download format
        const sections = [
            {
                title: "Download Options",
                rows: [
                    { title: "🎧 Audio File", rowId: "audio" },
                    { title: "📄 Document File", rowId: "document" }
                ]
            }
        ];

        const listMessage = {
            text: 'Please select how you would like to download the song:',
            footer: 'Queen Anju Bot',
            title: 'Song Download Options',
            buttonText: 'Select Download Format',
            sections: sections
        };

        // Send the list message
        await conn.sendMessage(from, listMessage, MessageType.listMessage);

        // Handle the user's selection (this part might depend on how Baileys handles responses)
        const collected = await conn.waitForMessage({ quoted: mek });

        const selectedRowId = collected.message?.listResponseMessage?.singleSelectReply?.selectedRowId;

        if (!selectedRowId) {
            return reply("No option selected. Please try again.");
        }

        // Download audio
        let down = await fg.yta(url);
        let downloadUrl = down.dl_url;

        if (selectedRowId === 'audio') {
            await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        } else if (selectedRowId === 'document') {
            await conn.sendMessage(from, {
                document: { url: downloadUrl },
                mimetype: "audio/mpeg",
                fileName: data.title + ".mp3",
                caption: "*© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*"
            }, { quoted: mek });
        } else {
            reply("Invalid option selected.");
        }

    } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
    }
});





//====================video_dl=======================

cmd({
    pattern: "video",
    desc: "To download videos.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me a url or title")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url
    
    
let desc = `
⫷⦁[ * '-'_꩜ 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝙑𝙄𝘿𝙀𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍 ꩜_'-' * ]⦁⫸ 

🎬 *Video Found!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

📹 *Enjoy your video with* *Queen Anju Bot*! 

> *Created with passion by Janith Rashmika* 

> *© 𝙌𝙐𝙀𝙀𝙉 𝘼𝙉𝙅𝙐 𝘽𝙊𝙏 - MD* 
*💻 GitHub:* github.com/Mrrashmika/Queen_Anju-MD
`

await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download video

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video message
await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:"*© 𝘘𝘜𝘌𝘌𝘕 𝘈𝘕𝘑𝘜 ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ*"},{quoted:mek})

}catch(e){
console.log(e)
  reply('${e}')
}
})
