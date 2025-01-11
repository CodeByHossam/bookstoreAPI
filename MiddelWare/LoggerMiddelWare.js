function looger(req,res,next){
    console.log("request is reciveid: " ,req.method,req.protocol,req.hostname,req.originalUrl)
    next()
}

module.exports={looger}