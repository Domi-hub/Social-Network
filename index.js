const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bcrypt");
const csurf = require("csurf");

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
                console.log("res", result.rows[0]);
            })
            .catch(e => {
                console.log(e);
                res.json("/register", { error: true });
            });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.getUser(email)
        .then(result => {
            const user = result.rows[0];
            return compare(password, user.password).then(isValid => {
                if (isValid) {
                    req.session.userId = user.id;
                    res.json();
                } else {
                    res.json("/login", { error: true });
                }
            });
        })
        .catch(e => {
            console.log(e);
            // show error
        });
});

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
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

app.listen(8080, () => {
    console.log("I'm listening.");
});
