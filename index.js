const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bcrypt");
const csurf = require("csurf");
const s3 = require("./s3");
const { s3Url } = require("./config");
const uidSafe = require("uid-safe");
const multer = require("multer");
const path = require("path");
//SETUP FOR SOCKET.IO:
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

const diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + "/uploads");
    },
    filename: (req, file, callback) => {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

uidSafe(24);

app.use(compression()); //it compresses our responses, should be always used!!!!

app.use(express.static("./public"));
app.use(express.json());

// app.use(
//     cookieSession({
//         secret: `Secret`,
//         maxAge: 1000 * 60 * 60 * 24 * 14
//     })
// );

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(csurf());

app.use((req, res, next) => {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    hash(password).then(hash => {
        db.addUser(firstName, lastName, email, hash)
            .then(result => {
                const user = result.rows[0];
                req.session.userId = user.id;
                res.json("/welcome");
            })
            .catch(err => {
                console.log(err);
                res.json("/register", { error: true });
            });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.getUserByEmail(email)
        .then(result => {
            const user = result.rows[0];
            return compare(password, user.password).then(isValid => {
                if (isValid) {
                    req.session.userId = user.id;
                    res.json("/welcome");
                } else {
                    res.json("/login", { error: true });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/user", (req, res) => {
    const userId = req.session.userId;

    db.getUserById(userId)
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/api/user/:id", (req, res) => {
    const userId = req.params.id;
    const loggedInUserId = req.session.userId;

    if (userId === loggedInUserId) {
        res.sendStatus(204);
        return;
    }

    db.getUserById(userId)
        .then(result => {
            if (result.rows.count === 0) {
                res.sendStatus(204);
            } else {
                res.json(result.rows[0]);
            }
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/api/users/", (req, res) => {
    db.getLastThreeUsers()
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/api/users/:query", (req, res) => {
    const query = req.params.query;

    db.getMatchingUsers(query)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/get-initial-status/:id", (req, res) => {
    const userId = req.params.id;
    const loggedInUserId = req.session.userId;

    db.getFriendshipInfo(userId, loggedInUserId)
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/send-friend-request/:id", (req, res) => {
    const userId = req.params.id;
    const loggedInUserId = req.session.userId;

    db.addSentRequest(userId, loggedInUserId)
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/accept-friend-request/:id", (req, res) => {
    const userId = req.params.id;
    const loggedInUserId = req.session.userId;

    db.addAcceptRequest(userId, loggedInUserId)
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/end-friendship/:id", (req, res) => {
    const userId = req.params.id;
    const loggedInUserId = req.session.userId;

    db.deleteFriendship(userId, loggedInUserId)
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/upload", uploader.single("image"), s3.upload, (req, res) => {
    const imageUrl = `${s3Url}${req.file.filename}`;
    const userId = req.session.userId;

    db.updateImage(imageUrl, userId)
        .then(() => {
            res.json({
                imageUrl: imageUrl
            });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.post("/bio", (req, res) => {
    const { bio } = req.body;
    const userId = req.session.userId;

    db.updateBio(bio, userId)
        .then(() => {
            res.json({
                bio: bio
            });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/friends-wannabes", (req, res) => {
    const userId = req.session.userId;

    db.getFriendsAndWannabes(userId)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/register");
});

//DO NOT DELETE - matches all urls
app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
//DO NOT DELETE

// io.on("connetion", socket => {
//     console.log(`A socket with the id ${socket.id} just connected`);
//     socket.on('IamHere', data)
//     socket.on("disconnect", () => {
//         console.log(`A socket with the id ${socket.id} just disconnect`);
//     });
// io.emit('somebodyNew') //sent to everybody
//soket.broadcast.emit('excludesomebody')
// });

server.listen(8080, () => {
    console.log("I'm listening.");
});

//SERVER SIDE SOCKET CODE//
io.on("connection", function(socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;

    //we want to get last 10 messages...
    // db.getLastTenChatMessages().then(data => {
    //     // io.socket.emit("chatMessages", data.rows);
    // });

    socket.on("My amazing chat message: ", function(msg) {
        console.log("My amazing chat message: ", msg);
        io.sockets.emit("chat message", msg);
    });

    socket.on("newMessage", function(newMessage) {
        //do stuff in here...
        //we want to find info about user who sent message...
        //we want to emit this message OBJECT
        //we also want to store it in the DB.
    });
});
