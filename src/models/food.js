const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
  qty: {
    type: Number,
  },
  category: {
    type: String,
    enum: [
      "Appetizers",
      "Salads",
      "Main Courses",
      "Desserts",
      "Beverages",
      "Sandwiches",
      "Burgers",
      "Pizza",
      "Pasta",
      "Seafood",
      "Vegetarian",
      "Vegan",
      "Soups",
      "Steaks",
      "Sushi",
      "Mexican",
      "Indian",
      "Chinese",
      "Thai",
      "Mediterranean",
    ],
  },
  code: {
    type: String,
  },
});

module.exports = mongoose.model("Food", foodSchema);
