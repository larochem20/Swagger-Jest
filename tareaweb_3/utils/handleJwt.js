const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties()
/**
 * debes pasar el objeto del usuario
 * @param {*} user
 */
const tokenSing = async (user) => {
    const sign = jwt.sign(
        {
            [propertiesKey._id]:user.[propertiesKey._id],
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );
    return sign
};
/**
 * debes de pasar el JWT token de sesion
 * @param {*} tokenJwt
 * @returns
 */
const verifyToken = async () => {
try {
return jwt.verify (tokenJwt, JWT_SECRET)   
} catch (e) {
  return null  
}
};

module.exports = {tokenSing, verifyToken};