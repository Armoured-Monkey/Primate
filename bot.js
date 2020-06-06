require("dotenv").config();
const discord = require("discord.js");
const client = new discord.Client({ partials: ["MESSAGE", "REACTION"] });
client.login(process.env.token);
client.on("ready", () => {
  client.user
    .setActivity(process.env.activity, { type: "WATCHING" })
    .catch(console.error);
  console.log(client.user.tag + " has logged in!");
});

client.on("ready", () => {
  console.log(client.user.tag + " has logged in.");
});

client.on("messageReactionAdd", async (reaction, user) => {
  let applyRole = async () => {
    let emojiName = reaction.emoji.name;
    let role = reaction.message.guild.roles.cache.find(
      role => role.name.toLowerCase() === emojiName.toLowerCase()
    );
    let member = reaction.message.guild.members.cache.find(
      member => member.id === user.id
    );
    try {
      if (role && member) {
        console.log("Role and member found.");
        await member.roles.add(role);
        console.log("Done.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (reaction.message.partial) {
    try {
      let msg = await reaction.message.fetch();
      console.log(msg.id);
      if (msg.id === process.env.reactionroles) {
        console.log("Cached");
        applyRole();
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Not a partial.");
    if (reaction.message.id === process.env.reactionroles) {
      console.log(true);
      applyRole();
    }
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  let removeRole = async () => {
    let emojiName = reaction.emoji.name;
    let role = reaction.message.guild.roles.cache.find(
      role => role.name.toLowerCase() === emojiName.toLowerCase()
    );
    let member = reaction.message.guild.members.cache.find(
      member => member.id === user.id
    );
    try {
      if (role && member) {
        console.log("Role and member found.");
        await member.roles.remove(role);
        console.log("Done.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (reaction.message.partial) {
    try {
      let msg = await reaction.message.fetch();
      console.log(msg.id);
      if (msg.id === process.env.reactionroles) {
        console.log("Cached");
        removeRole();
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("Not a partial.");
    if (reaction.message.id === process.env.reactionroles) {
      console.log(true);
      removeRole();
    }
  }
});
client.on("guildMemberAdd", member => {
  member.roles.add("402111697843912714").catch(console.error);
});

