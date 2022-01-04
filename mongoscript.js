/* eslint-disable no-undef */
conn = new Mongo();
db = conn.getDB("ircEpi");

db.channels.insertMany([

    {
        name:"gaming",
        creator:"epitest",
    },
    {
        name:"general",
        creator:"epitest",
    },
    {
        name:"chatting",
        creator:"epitest",
    }

]);

db.messages.insertMany([
    {
        text:"texte premier",
        author: "moi",
        date:"2022-03-01 17:00:00",
        channel: 'general'
    },
    {
        text:"texte second",
        author: "moi2",
        date:"2022-03-01 17:00:00",
        channel: 'general'
    },
    {
        text:"texte troisieme",
        author: "moi",
        date:"2022-04-01 17:00:00",
        channel: 'chatting'
    },
    {
        text:"texte quatre",
        author: "moi2",
        date:"2022-05-01 17:00:00",
        channel: 'gaming'
    },
    {
        text:"texte cinq",
        author: "epitest",
        date:"2022-03-01 17:00:00",
        channel: 'general'
    },
]);
db.users.insertMany([
    {
        username:"epitest",
        email:"epitest@gmail.com",
        password:"epitest",
        role:"admin"
    },
    {
        username:"moi",
        email:"moi1@gmail.com",
        password:"moi1",
        role:"user"
    },
    {
        username:"moi2",
        email:"moi2@gmail.com",
        password:"moi2",
        role:"user"
    },
]);
