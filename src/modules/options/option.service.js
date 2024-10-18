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
        console.log(optionDto);
        
        if (!optionDto.category || !isValidObjectId(optionDto.category)) throw new createHttpError.BadRequest(optionMessage.emptyInput);
        else await this.#categorySerivce.checkById(optionDto.category);
        await this.checkExistByCategoryId(optionDto.category);
        if (!optionDto.title || !optionDto.type) throw new createHttpError.BadRequest(optionMessage.emptyInput);
        if (!optionDto.key) slugify(optionDto.title, { trim: true, replacement: "_" });
        if (!optionDto.selection) delete optionDto.selection;
        else {
            optionDto.selection =  optionDto.selection.split(',');
        }
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

    async checkIfNotById(id) {
        const option = await this.#Db.findById(id);
        if (!option) throw new createHttpError.NotFound(optionMessage.NotFound)
        return option;
    }

    async checkExistByCategoryId(id) {
        const option = await this.#Db.findOne({ category: id });
        if (option) throw new createHttpError.Conflict(optionMessage.Conflict)
        return true;
    }
}

module.exports = new OptionService();