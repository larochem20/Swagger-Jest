const {matchData} = require('express-validator');
const {tracksModel} = require('../models')
const {handleHttpError} = require('../utils/handleError');
/** 
* @param {*} req
* @param {*} res
*/

const getItems = async (req, res) => {
    try{
        const user = req.user;
        const data = await tracksModel.findAllData({});
        res.send({data,user})
    }catch(e){
handleHttpError(res, 'Error get-items')
    }

};
/** 
 * obtener detalle
* @param {*} req
* @param {*} res
*/
const getItem = async (req, res) => {
    try{
req = matchData(req);
const {id}=req;
const data = await tracksModel.findOneData(id);
res.send({data})
    }catch(e){
        handleHttpError(res, 'Error get-items')
    }
};
/** 
 * insertar registro
* @param {*} req
* @param {*} res
*/
const createItem = async (req, res) => {
    try{
req= matchData(req)

    const body =matchData(req)
       const data= await tracksModel.create(body)
       res.send({data});
    }catch(e){
handleHttpError(res, 'Error create-items')
    }

};
/** 
 * actualizar
* @param {*} req
* @param {*} res
*/
const updateItem = async (req, res) => {
    try{
        req= matchData(req)
        
        
            const {id, ...body} = matchData(req)
               const data= await tracksModel.findOneAndUpdate(
                id, body);
               res.send({data});
            }catch(e){
        handleHttpError(res, 'Error update-items')
            }
};
/** 
 * eliminar registro
* @param {*} req
* @param {*} res
*/
const deleteItem =async (req, res) => {
    try{
        req = matchData(req);
        const {id}=req;
        const data = await tracksModel.delete({_id:id});
        res.send({data})
            }catch(e){
                handleHttpError(res, 'Error delete-items')
            }   
};

module.exports = {getItems,getItem,createItem,updateItem,deleteItem};