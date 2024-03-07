const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");

// Importing your models
const Bill = require("./models/bill");
const User = require("./models/user");
const Item = require("./models/item");
const Sales = require("./models/sales");

mongoose.connect("mongodb://127.0.0.1:27017/supermarket");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// Routes for MongoDB models

// Example route for creating a new item
app.post("/items", async (req, res) => {
  try {
    const { itemName, itemCode, quantity, unitPrice, description } = req.body;
    const item = new Item({ itemName, itemCode, quantity, unitPrice, description });
    await item.save();
    res.send("Item created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Example route for getting all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Example route for updating an item
app.put("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { itemName, itemCode, quantity, unitPrice, description } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(id, { itemName, itemCode, quantity, unitPrice, description }, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Example route for deleting an item
app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.send("Item deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

