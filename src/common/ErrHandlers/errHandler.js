function err404Handler(req,res,next) {
    return res.send(
        {
            status : 404,
            message : "Route Not Found."
        }
    )
}
function allErrHandler(err,req,res,next) {
    return res.send({
        status : err.status ?? err.statusCode ?? 500,
        message : err.message ?? err.stack ?? "ServerInternalError"
    })  
}

module.exports ={
    err404Handler,
    allErrHandler
}