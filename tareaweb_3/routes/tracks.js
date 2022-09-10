const express = require ("express");
const router = express.Router();
const authMiddleware= require("../middleware/session")
const checkRol= require("../middleware/rol")
const {validatorCreateitem,validatorGetItem} = require ("../validators/tracks")
const {getItems,getItem, createItem,updateItem,deleteItem} = require ("../controllers/tracks");
const checkRol = require("../middleware/rol");
/**
 * lista items
 */
router.get("/",authMiddleware,getItems);
/**
 * obtener items
 */
 router.get("/:id",authMiddleware,validatorGetItem,getItems);
 /**
  * crear un registro
  */

router.post("/", authMiddleware, checkRol(["user","admin"]),
validatorCreateitem,createItem);
/**
 * actualizar registro
 */
 router.put("/:id", authMiddleware,validatorGetItem,validatorCreateitem,updateItem);

 router.put("/:id", authMiddleware,validatorGetItem,deleteItem);

module.exports = router;