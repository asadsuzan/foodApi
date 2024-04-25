const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./src/route/api");
const dotenv = require("dotenv");
dotenv.config();

const DB_Pass = process.env.DB_PASS;
const uri = `mongodb+srv://asadsuzan7:Mw9K4BIpUsZSQVM5@cluster0.vmkorgz.mongodb.net/FoodApi?retryWrites=true&w=majority&appName=Cluster0`;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", router);

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: "Internal Server Error" });
    });

    return app; // Return the Express app instance
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error to be caught elsewhere if needed
  }
}

module.exports = run; // Export the run function
