const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

mongoose.connect("mongodb://mongo:27017/todos");

const Todo = mongoose.model("Todo", { text: String });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.render("index", { todos });
});

app.post("/add", async (req, res) => {
  const { todo } = req.body;
  await new Todo({ text: todo }).save();
  res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
