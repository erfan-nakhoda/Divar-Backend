const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const createHttpError = require("http-errors");
const optionMessage = require("../../common/messages/option.message");
const { default: slugify } = require("slugify");
const categoryService = require("../categories/category.service");
const { isValidObjectId } = require("mongoose");

class OptionService {
    #Db;
    #categorySerivce
    constructor() {
        autoBind(this);
        this.#Db = OptionModel;
        this.#categorySerivce = categoryService;
    }
    async create(optionDto) {
        if (!optionDto.category || !isValidObjectId(optionDto.category)) throw new createHttpError.BadRequest(optionDto.emptyInput);
        else !!await this.#categorySerivce.checkById(optionDto.category);
        await this.checkExistByCategoryIdAndKey(optionDto.category, optionDto.key);
        if (!optionDto.title || !optionDto.type) throw new createHttpError.BadRequest(optionMessage.emptyInput);
        if (!optionDto.key) slugify(optionDto.title, { trim: true, replacement: "_", lower: true });
        if (!optionDto.selection) delete optionDto.selection;
        if (!optionDto.guide) delete optionDto.guide;
        await this.#Db.create(optionDto);
        return true

    }
    async get() {
        return await this.#Db.find({});
    }

    async getById(id) {
        const option = await this.checkIfNotById(id);
        return option;
    }
    async getByCategory(id) {
        const option = await this.#Db.findOne({ category: id });
        if (!option) throw new createHttpError.NotFound(optionMessage.NotFound);
        return option;
    }

    async delete(id) {
        const option = await this.checkIfNotById(id);
        await this.#Db.deleteOne({ id: option.id });
        return true;
    }

    async updateById(id, data) {
        await this.checkIfNotById(id);
        if (data.category && isValidObjectId(data.category)) {
            const existCategory = await this.#categorySerivce.checkById(data.category);
            data.category = existCategory.id;
        } else delete data.category;

        if (data.key) {
            data.key = slugify(data.key, { trim: true, replacement: "_", lower: true });
            if (await this.#Db.findOne({ key: data.key })) throw new createHttpError.Conflict(optionMessage.Conflict);
        }
        if (data.required) {
            if (["true", true, 1].includes(data.required)) data.required = true;
            else data.required = false
        }
        if (data.selection && typeof data.selection === "string") data.selection = data.selection.split(',');
        else delete data.selection;

        await this.#Db.updateOne({ _id: id }, { $set: data });
        return true;
    }

    async checkIfNotByIdOrKey(id, key = null) {
        const option = await this.#Db.findById(id);
        if (!option) throw new createHttpError.NotFound(optionMessage.NotFound);
        return option;
    }

    async checkExistByCategoryIdAndKey(id, key = null) {
        const option = await this.#Db.findOne({ category: id });
        if (!option) throw new createHttpError.NotFound(optionMessage.NotFound);
        if (key) {
            const option = await this.#Db.findOne({ key });
            if (option) throw new createHttpError.Conflict(optionMessage.Conflict);
        }
        return option;
    }
}

module.exports = new OptionService();