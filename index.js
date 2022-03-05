const { Intents, Client } = require("discord.js")
const dotenv = require("dotenv");
const nodecallspython = require("node-calls-python");


const intents = new Intents();
intents.add(
    Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS
);
const client = new Client({intents: intents});
const py = nodecallspython.interpreter;

dotenv.config();
client.login(process.env.token);

py.import("./discord.py").then(async function(pymodule) {
    client.on("ready", async () => {
        let ready = await py.call(pymodule, "ready", client.user.tag).catch(err => console.log(err));
        if (ready) console.log(ready);
    })

    client.on("messageCreate", async message => {
        if (message.author.bot) return;
        let msgObj = JSON.stringify(message)
        let msg = await py.call(pymodule, "message", msgObj).catch(err => console.log(err));
        msg = JSON.parse(msg);
        let [reply, str] = msg;
        if (reply) message.reply(str);
    })
})
