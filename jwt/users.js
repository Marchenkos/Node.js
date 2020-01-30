const { genSaltSync, hashSync } = require("bcryptjs");

let salt = genSaltSync(10);
let hash = hashSync("Password", salt);

module.exports = [
    {
        id: 1,
        login: "Lina",
        password: hash
    }
];