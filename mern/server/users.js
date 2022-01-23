const users = [];

const addUser = ({ id, pseudo, room }) => {
    pseudo = pseudo.trim().toLowerCase();
    room = room.trim().toLowerCase();


    const existingUser = users.find((user) => user.room === room && user.pseudo === pseudo);


    if(existingUser) return "USER INEXISTANT";

    //{ error: "Pseudo déjà utilisé !"}

    const user = { id, pseudo, room }
    users.push(user);

    return { user };
}

const removeUser = (name) => {
    name = name.trim().toLowerCase();
    const index = users.findIndex((user) => user.pseudo === name);


    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (name) => {
    name = name.trim().toLowerCase();
    const user = users.find((user) => user.pseudo === name);
    return user;
}

const getUsersInRoom = (room) => {
    let catchUsers = users.filter((user) => user.room === room);
    console.log("TYPECATCH: " + typeof(catchUsers));
    let usersRoom = [];
    for(let i = 0; i < users.length; i++) {
        usersRoom.push(catchUsers[i].pseudo);
    }
    console.log("TYPE: " + typeof(usersRoom));
    return usersRoom;
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };