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

module.exports.getUserByEmail = email => {
    return db.query(
        `
        SELECT *
        FROM users
        WHERE email = $1;
        `,
        [email]
    );
};

module.exports.getUserById = userId => {
    return db.query(
        `
        SELECT *
        FROM users
        WHERE id = $1;
        `,
        [userId]
    );
};

module.exports.updateImage = (imageUrl, userId) => {
    return db.query(
        `
        UPDATE users
        SET image_url = $1
        WHERE id = $2;
        `,
        [imageUrl, userId]
    );
};

module.exports.getImageById = userId => {
    return db.query(
        `
        SELECT image_url
        FROM users
        WHERE id = $1;
        `[userId]
    );
};
