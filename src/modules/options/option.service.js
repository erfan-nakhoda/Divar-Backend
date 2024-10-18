const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const createHttpError = require("http-errors");
const optionMessage = require("../../common/messages/option.message");
const { default: slugify } = require("slugify");
const categoryService = require("../categories/category.service");

class OptionService {
    #Db;
    #categorySerivce
    constructor() {
        autoBind(this);
        this.#Db = OptionModel;
        this.#categorySerivce = categoryService;
    }
    async create(optionDto) {
        if(!optionDto.category) throw new createHttpError.BadRequest(optionDto.emptyInput);
        else !!await this.#categorySerivce.checkById(optionDto.category);
        if(!optionDto.title) throw new createHttpError.BadRequest(optionMessage.emptyInput);
        if(!optionDto.key) slugify(optionDto.title, {trim : true, replacement : "_"});
        if(!optionDto.selection) delete optionDto.selection;
        if(!optionDto.guide) delete optionDto.guide;
        await this.#Db.create(optionDto);
        return true

    }
    get() {}
}

module.exports = new OptionService();