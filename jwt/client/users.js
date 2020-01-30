const usersList = require("../users");

async function list() {
    return usersList;
}

async function find(userId) {
    for(let user of usersList) {
        if(user.id == userId) {
            return user;
        }
    }

    return null;
}

module.exports = {
    list,
    find
};
