const express = require("express");
const foodController = require("../controller/food");

const router = express.Router();

router.get("/foods", foodController.read);
router.get("/foods/:category", foodController.getByCategory);
router.get("/food/:id", foodController.readById);
router.post("/food/add", foodController.create);
router.put("/food/:id", foodController.updateById);
router.delete("/food/:id", foodController.delete);

module.exports = router;
