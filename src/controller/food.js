// dependencies
const Food = require("../models/food");

// module scaffolding
const foodController = {};
// Create (POST) a new food item
foodController.create = async (req, res) => {
  const { description, img, price, code, qty, category, name } = req.body;

  try {
    const newFood = new Food({
      name,
      price,
      description,
      img,
      code,
      qty,
      category,
    });
    await newFood.save();
    const responseObj = newFood.toObject({ versionKey: false });

    res.status(201).json(responseObj); // Created status code
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating food item" });
  }
};

// Read (GET) all food items
foodController.read = async (req, res) => {
  console.log(req.url);
  try {
    const foods = await Food.find({}, { __v: 0 });
    console.log(foods);
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching foods" });
  }
};

// Read (GET) a specific food item by ID
foodController.readById = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id, { __v: 0 });
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching food" });
  }
};

// Update (PUT) a food item
foodController.updateById = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, img, qty, category, code } = req.body;
  try {
    const updatedFood = await Food.findByIdAndUpdate(
      id,
      { name, price, description, img, qty, category, code },
      { new: true }
    ); // { new: true } returns the updated document
    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json(updatedFood);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error updating food" });
  }
};

// Delete (DELETE) a food item
foodController.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFood = await Food.findByIdAndDelete(id);
    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json({ message: "Food deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting food" });
  }
};

// GET foods by category
foodController.getByCategory = async (req, res) => {
  const { category } = req.params; // Assuming category is passed in URL params

  try {
    let foods;
    if (category === "All") {
      foods = await Food.find({}, { __v: 0 });
    } else {
      foods = await Food.find({ category }, { __v: 0 });
    }

    if (!foods.length) {
      return res.status(200).json([]);
    }
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching foods by category" });
  }
};

module.exports = foodController;
