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

module.exports.updateBio = (bio, userId) => {
    return db.query(
        `
        UPDATE users
        SET bio = $1
        WHERE id = $2;
        `,
        [bio, userId]
    );
};

module.exports.getMatchingUsers = query => {
    return db.query(
        `
        SELECT id, first_name, last_name, image_url
        FROM users
        WHERE first_name ILIKE $1
        OR last_name ILIKE $1
        LIMIT 3;
        `,
        [query + "%"]
    );
};

module.exports.getLastThreeUsers = () => {
    return db.query(
        `
        SELECT id, first_name, last_name, image_url
        FROM users
        ORDER BY id DESC
        LIMIT 3;
        `
    );
};

module.exports.getFriendshipInfo = (userId, loggedInUserId) => {
    return db.query(
        `
        SELECT * FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1);
        `,
        [userId, loggedInUserId]
    );
};

module.exports.addSentRequest = (userId, loggedInUserId) => {
    return db.query(
        `
        INSERT INTO friendships (receiver_id, sender_id)
        VALUES($1, $2)
        RETURNING id;
        `,
        [userId, loggedInUserId]
    );
};

module.exports.addAcceptRequest = (userId, loggedInUserId) => {
    return db.query(
        `
            UPDATE friendships
            SET accepted = TRUE
            WHERE sender_id = $1
            AND receiver_id = $2;
        `,
        [userId, loggedInUserId]
    );
};

module.exports.deleteFriendship = (userId, loggedInUserId) => {
    return db.query(
        `
            DELETE FROM friendships
            WHERE (receiver_id = $1 AND sender_id = $2)
            OR (receiver_id = $2 AND sender_id = $1);
        `,
        [userId, loggedInUserId]
    );
};

module.exports.getFriendsAndWannabes = userId => {
    return db.query(
        `
            SELECT users.id, first_name, last_name, image_url, accepted
            FROM friendships
            JOIN users
            ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
            OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
            OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
        `,
        [userId]
    );
};

module.exports.addChatMessage = (msg, userId) => {
    return db.query(
        `
            INSERT INTO chats (message, sender_id)
            VALUES($1, $2)
            RETURNING id, message;
        `,
        [msg, userId]
    );
};

module.exports.getLastTenChatMessages = () => {
    return db.query(
        `
            SELECT chats.id, image_url, first_name, last_name, message, TO_CHAR(created_at :: TIMESTAMP, 'dd Month yyyy, HH:MM:SS') as created_at
            FROM chats
            JOIN users
            ON chats.sender_id = users.id
            ORDER BY chats.id DESC
            LIMIT 10
        `
    );
};

module.exports.getAllMessages = () => {
    return db.query(
        `
        SELECT chats.id, chats.message, chats.created_at, users.first_name, users.last_name, users.id AS user_id, users.image_url
        FROM chats
        JOIN users
        ON (chats.sender_id = users.id)
        ORDER BY chats.id DESC
        LIMIT 1
        `
    );
};
