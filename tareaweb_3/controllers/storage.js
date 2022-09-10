const fs=require("fs")
const {matchData}=require("express-validator");
const {tracksModel: storageModel} = require('../models');
const {handleHttpError}=require ("../utils/handleError");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = 'S{__dirname}/../storage';
/** 
* @param {*} req
* @param {*} res
*/

const getItems = async (req, res) => {
    try{
        const data = await storageModel.find({});
        res.send({data})
    }catch(e){
handleHttpError(res, "ERROR list-ITEMS")
    }

};
/** 
 * obtener detalle
* @param {*} req
* @param {*} res
*/
const getItem = async (req, res) => {
    try{
        const {id}= matchData(req)
        const data = await storageModel.findById(id);
        res.send({data})
    }catch(e){
handleHttpError(res, "ERROR detail-ITEMS")
    }
};
/** 
 * insertar registro
* @param {*} req
* @param {*} res
*/
const createItem = async (req, res) => {
    try{
        const {file} =req
        const fileData = {
            filename: file.filename,
            url: '${PUBLIC_URL}/${file.filename}',
        };
    }catch(e){
handleHttpError(res,"ERROR")
    }

    }
   const data= await storageModel.create(body)
   res.send({file})
};

/** 
 * eliminar registro
* @param {*} req
* @param {*} res
*/
const deleteItem = async (req, res) => {
    try{
        const {id}= matchData(req)
        const dataFile = await storageModel.findById(id);
        await storageModel.delete({_id:id})
        const {filename}= data;
        const filePath = '${MEDIA_PATH}/${filename}'
        //fs.unlinkSync(filePath);
        const data = {
filePath,
deleted:1
        }
        res.send({data})
    }catch(e){
handleHttpError(res, "ERROR detail-ITEMS")
    }   
};

module.exports = {getItems,getItem,createItem,deleteItem};