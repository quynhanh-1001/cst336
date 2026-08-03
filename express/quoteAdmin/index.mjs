import "dotenv/config";
import express from "express";
import mysql from "mysql2/promise";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.locals.currentPath = req.path;
    next();
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    waitForConnections: true
});

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/dbTest", async function (req, res) {
    try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send("Database error");
    }
});

app.get("/author/new", function (req, res) {
    res.render("newAuthor");
});

app.post("/author/new", async function (req, res) {
    let deathDate = req.body.deathDate || null;

    let sql = `INSERT INTO q_authors
               (firstName, lastName, dob, dod, sex,
                profession, country, portrait, biography)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    let params = [
        req.body.fName,
        req.body.lName,
        req.body.birthDate,
        deathDate,
        req.body.sex,
        req.body.profession,
        req.body.country,
        req.body.portrait,
        req.body.biography
    ];

    await pool.query(sql, params);

    res.render("newAuthor", {
        message: "Author added!"
    });
});

app.get("/authors", async function (req, res) {
    let sql = `SELECT *
               FROM q_authors
               ORDER BY lastName`;

    const [rows] = await pool.query(sql);

    res.render("authorList", {
        authors: rows
    });
});

app.get("/author/edit", async function (req, res) {
    let authorId = req.query.authorId;

    let sql = `SELECT *,
               DATE_FORMAT(dob, '%Y-%m-%d') AS dobISO,
               DATE_FORMAT(dod, '%Y-%m-%d') AS dodISO
               FROM q_authors
               WHERE authorId = ?`;

    const [rows] = await pool.query(sql, [authorId]);

    res.render("editAuthor", {
        authorInfo: rows
    });
});

app.post("/author/edit", async function (req, res) {
    let deathDate = req.body.dod || null;

    let sql = `UPDATE q_authors
               SET firstName = ?,
                   lastName = ?,
                   dob = ?,
                   dod = ?,
                   sex = ?,
                   profession = ?,
                   country = ?,
                   portrait = ?,
                   biography = ?
               WHERE authorId = ?`;

    let params = [
        req.body.fName,
        req.body.lName,
        req.body.dob,
        deathDate,
        req.body.sex,
        req.body.profession,
        req.body.country,
        req.body.portrait,
        req.body.biography,
        req.body.authorId
    ];

    await pool.query(sql, params);

    res.redirect("/authors");
});

app.get("/author/delete", async function (req, res) {
    let authorId = req.query.authorId;

    let sql = `DELETE FROM q_authors
               WHERE authorId = ?`;

    await pool.query(sql, [authorId]);

    res.redirect("/authors");
});

app.get("/quote/new", async function (req, res) {
    let sql = `SELECT authorId, firstName, lastName
               FROM q_authors
               ORDER BY lastName`;

    const [rows] = await pool.query(sql);

    res.render("newQuote", {
        authors: rows
    });
});

app.post("/quote/new", async function (req, res) {
    let sql = `INSERT INTO q_quotes
               (quote, authorId, category, likes)
               VALUES (?, ?, ?, ?)`;

    let params = [
        req.body.quote,
        req.body.authorId,
        req.body.category,
        req.body.likes
    ];

    await pool.query(sql, params);

    let authorSql = `SELECT authorId, firstName, lastName
                     FROM q_authors
                     ORDER BY lastName`;

    const [authors] = await pool.query(authorSql);

    res.render("newQuote", {
        authors: authors,
        message: "Quote added!"
    });
});

app.get("/quotes", async function (req, res) {
    let sql = `SELECT quoteId, quote, category, likes,
                      authorId, firstName, lastName
               FROM q_quotes
               NATURAL JOIN q_authors
               ORDER BY quoteId`;

    const [rows] = await pool.query(sql);

    res.render("quoteList", {
        quotes: rows
    });
});

app.get("/quote/edit", async function (req, res) {
    let quoteId = req.query.quoteId;

    let quoteSql = `SELECT *
                    FROM q_quotes
                    WHERE quoteId = ?`;

    const [quoteRows] = await pool.query(quoteSql, [quoteId]);

    let authorSql = `SELECT authorId, firstName, lastName
                     FROM q_authors
                     ORDER BY lastName`;

    const [authors] = await pool.query(authorSql);

    res.render("editQuote", {
        quoteInfo: quoteRows,
        authors: authors
    });
});

app.post("/quote/edit", async function (req, res) {
    let sql = `UPDATE q_quotes
               SET quote = ?,
                   authorId = ?,
                   category = ?,
                   likes = ?
               WHERE quoteId = ?`;

    let params = [
        req.body.quote,
        req.body.authorId,
        req.body.category,
        req.body.likes,
        req.body.quoteId
    ];

    await pool.query(sql, params);

    res.redirect("/quotes");
});

app.get("/quote/delete", async function (req, res) {
    let quoteId = req.query.quoteId;

    let sql = `DELETE FROM q_quotes
               WHERE quoteId = ?`;

    await pool.query(sql, [quoteId]);

    res.redirect("/quotes");
});

app.listen(3000, function () {
    console.log("Express server running");
});
