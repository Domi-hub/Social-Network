const spicedPg = require("spiced-pg");
const db = spicedPg(`postgres:postgres:postgres@localhost:5432/socialnetwork`);

module.exports.addUser = (firstName, lastName, email, password) => {
    return db.query(
        `
        INSERT INTO users (first_name, last_name, email, password)
        VALUES($1, $2, $3, $4)
        RETURNING id;
        `,
        [firstName, lastName, email, password]
    );
};

module.exports.getUser = email => {
    return db.query(
        `
        SELECT *
        FROM users
        WHERE email = $1;
        `,
        [email]
    );
};
