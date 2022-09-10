const {matchData} = require ("express-validator")
const {encrypt, compare} = require("../utils/handlePassword")
const {tokenSign} = require("../utils/handleJwt")
const {handleHttpError} = require("../utils/handleError");
const {usersModel} = require("../models");
/**
 * este controlador se encarga de registrar usuaior
 * @param {ES} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
    try {
        req = matchData(req);
        const passwordHash = await encrypt(req.password);
        const body = {...req, password};
        const dataUser= await usersModel.create(body);
        dataUser.set('password', undefined, {strict:false});
        const data = {
            token: await tokenSign(dataUser),
            user:dataUser,
        };
    res.status(201)
        res.send({data:body});
    }catch(e){
handleHttpError(res, "ERROR_REGISTERUSER")
    }

    
    };
    /**
     * este contrrolador logea una persona
     * @param {*} req 
     * @param {*} res 
     */

    const loginCtrl  = async (req, res) => {
try {
    req= matchData(req);
    const user = await usersModel.findOne({email:req.email})
   
    if(!user){
        handleHttpError(res, "USER_NOT_EXISTS", 404)  
        return 
    }
    const hashPassword = user.get('password');
    const check = await compare(req.password, hashPassword)
    if(!check){
        handleHttpError(res, "PASSWORD_INVALID", 401)  
        return    
    }
user.set('password', undefined, {strict:false})
    const data = {
        token: await tokenSing(user),
        user
    }
    res.send({data})
}catch(e){
handleHttpError(res, "ERROR_loginRUSER")
    }

    }


module.exports = {registerCtrl, loginCtrl};