const autoBind = require("auto-bind");
const categoryModel = require("./category.model");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const categoryMessages = require("../../common/messages/category.message");
const { default: slugify } = require("slugify");

class CategorySerivce {
    #Db
    constructor() {
        autoBind(this)
        this.#Db = categoryModel;
    }
    async createCategory(categoryDto) {
        if (isValidObjectId(categoryDto.parent)) {
            const existCategory = await this.checkById(categoryDto.parent);
            categoryDto.parents = [... new Set(existCategory?.parents?.concat(categoryDto.parent))];
        }
        if (categoryDto.slug) {
            categoryDto.slug = slugify(categoryDto.slug);
            await this.checkExistBySlug(categoryDto.slug)

        } else {
            categoryDto.slug = slugify(categoryDto.name);
            await this.checkExistBySlug(categoryDto.slug);
        }
        
        await this.#Db.create(categoryDto);
    }
    async getCategories() {
        const categories = await this.#Db.find({}, {__v : 0 , updatedAt : 0 , createdAt : 0,}).populate("children", {name : 1});
        return categories
    }

    async checkById(id) {
        const category = await this.#Db.findById(id);
        if (!category) throw new createHttpError.NotFound(categoryMessages.NotFound);
        return category
    }
    async checkByslug(slug) {
        const category = await this.#Db.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(categoryMessages.NotFound);
        return category
    }
    async checkExistBySlug(slug) {
        const category = await this.#Db.findOne({ slug });
        if (category) throw new createHttpError.Conflict(categoryMessages.Conflict);
        return null
    }
}
module.exports = new CategorySerivce();