const autoBind = require("auto-bind");
const optionMessage = require("../../common/messages/option.message");
const optionService = require("./option.service");

class OptionController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = optionService;
    }
    async create(req,res,next) {
        try {
            const {title,key,selection,guide,category} = req.body;
            await this.#service.create({title,key,selection,guide,category});
            return res.status(200).send({
                status: 200,
                message : optionMessage.success
            })
        } catch (err) {
            next(err)
        }}
    get(req,res,next) {
        try {
            
        } catch (err) {
            next(err)
        }
    }
}