import express from "express";

let configViewEnginer = (app) => {
  app.use(express.static("./src/public"));
  app.set("view enginer", "ejs");
  app.set("views", "./src/views");
};

module.exports = configViewEnginer;
