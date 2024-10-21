const autoBind = require("auto-bind");
const categoryModel = require("./category.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const categoryMessages = require("../../common/messages/category.message");
const { default: slugify } = require("slugify");
const OptionModel = require("../options/option.model");

class CategorySerivce {
    #Db;
    #OptionDb;
    constructor() {
        autoBind(this)
        this.#Db = categoryModel;
        this.#OptionDb = OptionModel;
    }
    async createCategory(categoryDto) {
        if (isValidObjectId(categoryDto.parent)) {
            const existCategory = await this.checkById(categoryDto.parent);
            categoryDto.parents = [... new Set(existCategory?.parents?.map(id => id.toString()).concat(existCategory._id.toString()))].map(id => Types.ObjectId(id));
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
        const categories = await this.#Db.find({parent : {$exists : false}}, {__v : 0 , updatedAt : 0 , createdAt : 0, })
        return categories
    }

    async deleteCategory(id) {
        await this.checkById(id);
        await this.#OptionDb.deleteMany({category : id}).then(async () => {
            await this.#Db.deleteMany({_id : id});
        })

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