const { hashSync } = require("bcryptjs");

module.exports = [
    {
        id: 1,
        login: 'Lina',
        password: hashSync('Password'),
    }
];