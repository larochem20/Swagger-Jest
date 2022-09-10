const customHeader = (req, res, next) => {
try {
    const apikey =req.headers.api_key;
    if(apikey === 'luis-01'){
        next()
    }else{
        res.status(403)
        res.send({error:"apikey_ANDA_MAL"})  
    }

    next()

}catch(e){
    res.status(403)
    res.send({error:"LAGO_ANDA_MAL"})
}
}
module.exports = customHeader