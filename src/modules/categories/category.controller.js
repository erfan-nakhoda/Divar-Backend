const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const categoryMessages = require("../../common/messages/category.message");
const categoryService = require("./category.service");
const httpCode = require("http-codes");
const omitEmpty = require("omit-empty");

class CategoryController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = categoryService;
    }
    async createCategory(req, res, next) {
        try {
            const { name, slug, parent, icon } = req.body;
            if (!name || !icon) throw new createHttpError.BadRequest(categoryMessages.emptyInput);
            await this.#service.createCategory(omitEmpty({name, slug, parent, icon}));
            return res.status(httpCode.CREATED).send({
                status: httpCode.CREATED,
                message: categoryMessages.Success
            })
        } catch (err) {
            next(err)
            console.log(err);
            
        }
    }
    async getCategories(req,res,next) {
        try {
            const result = await this.#service.getCategories();
            return res.status(httpCode.OK).send({
                status : httpCode.OK,
                data : result
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new CategoryController(); 