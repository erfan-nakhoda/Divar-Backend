const { Router } = require("express");
const categoryController = require("./category.controller");

const router = Router();

router.post("/create", categoryController.createCategory);
router.get("/get", categoryController.getCategories);

module.exports = {
    CategoryRoutes : router
} 