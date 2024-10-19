const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router();

router.post("/create", optionController.create);
router.get("/get", optionController.get)
router.get("/:id",optionController.getById);
router.get("/by-category/:id",optionController.getByCategory);
router.delete("/delete/:id", optionController.delete);
router.put("/update/:id", optionController.updateById);

module.exports = {
    OptionRoutes : router
}