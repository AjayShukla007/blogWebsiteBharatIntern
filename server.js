require("dotenv").config();


const express = require("express");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const connectToMongo = require("./db.js");

const app = express();

connectToMongo();
// mongoose.connect("mongodb://localhost/bharatInternDatabase");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

mongoose.connection.once("open", () => {
  console.log("connected to mongo db");
  // STARTING SERVER
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});

mongoose.connection.on("error", err => {
  console.log(err);
});

// app.listen(3000);
