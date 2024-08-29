"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crypto_1 = require("crypto");
var body_parser_1 = require("body-parser");
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
var posts = {};
app.get("/posts", function (req, res) {
    res.send(posts);
});
app.post("/posts", function (req, res) {
    var id = (0, crypto_1.randomBytes)(4).toString('hex');
    var title = req.body.title;
    posts[id] = {
        id: id,
        title: title
    };
    res.status(201).send(posts[id]);
});
app.listen(4000, function () {
    console.log("Server is running on port 4000");
});
