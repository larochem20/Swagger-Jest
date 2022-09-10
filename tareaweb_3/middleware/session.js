const {handleHttpError} = require("../utils/handleError");
const {verifyToken} = require("../utils/handleJwt")
const {userModel} = require("../models") 
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties()
const authMiddleware = async (req, res, next) => {
try{
if (!req.headers.authorization){
    handleHttpError(res, "NOT_TOKEN", 401);  
    return  
}
}catch(e){
    handleHttpError(res, "NOT_SESSION", 401);  
}
const token = req.headers.authorization.split(' ').pop();
const dataToken = await verifyToken(token);

if(!dataToken){
    handleHttpError(res, "NOT_PAYLCAD_DATA", 401); 
    return 
}

const query = {
    [propertiesKey.id]:dataToken[propertiesKey.id]
}

const user = await userModel.findOne(query)
req.user = user


next()

};
module.exports = authMiddleware