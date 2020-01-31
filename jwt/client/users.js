const userList = require("../data/users");
const _ = require("lodash");

async function list() {
    return userList;
}

async function find(value) {
    return _.find(userList, value);
}

module.exports = {
    list,
    find
};
