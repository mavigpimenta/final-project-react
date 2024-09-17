const express = require("express");
const user = require("../routes/user");
const post = require("../routes/post");
const comment = require("../routes/comment");

module.exports = function (app) {
  app.use(express.json())
    .use("/post", post)
    .use("/user", user)
    .use("/comment", comment);
};
