const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bcrypt");

app.use(compression()); //it compresses our responses, should be always used!!!!

app.use(express.static("./public"));
app.use(express.json());

app.use(
    cookieSession({
        secret: `Secret`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(
    express.urlencoded({
        extended: false
    })
);

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

app.get("/welcome", function(req, res) {
    // if (req.sesssion.userId) {
    //     res.redirect("/");
    // } else {
    res.sendFile(__dirname + "/index.html");
    // }
});

app.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    hash(password).then(hash => {
        db.addUser(firstName, lastName, email, hash)
            .then(result => {
                req.session.userId = result.rows[0].id;
                res.json();
            })
            .catch(e => {
                console.log(e);
                res.render("register", { error: true });
            });
    });
});

//DO NOT DELETE - matches all urls
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
//DO NOT DELETE

app.listen(8080, function() {
    console.log("I'm listening.");
});
