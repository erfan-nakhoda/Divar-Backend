const autoBind = require("auto-bind");
const optionMessage = require("../../common/messages/option.message");
const optionService = require("./option.service");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");

class OptionController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = optionService;
    }
    async create(req,res,next) {
        try {

            const {title,key,selection,type,guide,category} = req.body;
            await this.#service.create({title,type,key,selection,guide,category});
            return res.status(201).send({
                status: 201,
                message : optionMessage.success
            })
        } catch (err) {
            next(err)
        }}
    async get(req,res,next) {
        try {
            const result = await this.#service.get();
            return res.status(200).send({
                status : 200,
                data : result
            })
        } catch (err) {
            next(err)
        }
    }

    async getById(req,res,next) {
        try {
            const {id} = req.params;
            if(!id || !isValidObjectId(id)) throw new createHttpError.BadRequest(optionMessage.invalidOrEmpty)
            const result = await this.#service.getById(id)
            return res.status(201).send({
                status : 200,
                data : result

            })
        } catch (err) {
            next(err)
        }
    }

    async getByCategory(req,res,next) {
        try {
            const {id} = req.params;
            if(!id || !isValidObjectId(id)) throw new createHttpError.BadRequest(optionMessage.invalidOrEmpty);
            const result = await this.#service.getByCategory(id);
            return res.status(200).send({
                status : 200,
                data : result
            })

        } catch (err) {
            next(err)
        }
    }

    async deleteById(req,res,next) {
        try {
            const {id} = req.params;
            if(!id || !isValidObjectId(id)) throw new createHttpError.BadRequest(optionMessage.invalidOrEmpty);
            await this.#service.deleteById(id);
            return res.send({
                status : 200,
                message : optionMessage.DeleteSuccess
            })
        } catch (err) {
            next(err)
        }
    }

    async updateById(req,res,next) {
        try {
            const {id} = req.params
            const data =req.body;
            await this.#service.updateById(id,data);
            return res.status(200).send({
                status : 200,
                message : optionMessage.UpdateSuccess
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new OptionController();