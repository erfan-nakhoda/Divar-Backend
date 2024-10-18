class OptionController {
    create(req,res,next) {
        try {
            const {title,key,enum,guide,category} = req.body;
            await this.#service.create({title,key,enum,guide,category});
            return res.status(200).send({
                status: 200,
                message : optionMessage.success
            })
        } catch (err) {
            
        }}
    get(req,res,next) {
        try {
            
        } catch (err) {
            
        }
    }
}