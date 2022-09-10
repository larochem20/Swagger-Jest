
const express = require ("express");
const { getItems,getItem,updateItem,deleteItem,createItem } = require("../controllers/storage");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const createItem = require("../controllers/storage")
const {validatorGetItem}=require("../validators/storage")

/**
 * Get all storages
 * @openapi
 * /storage:
 *      get:
 *          tags:
 *              - storage:
 *          summary: "Listar archivos"
 *          description: Obten todas las liistas de los archivos
 *          security:
 *              - bearerAuth:[]
 *          responses:
 *              -200': 
 *                  description: Retorna la lista de los archivos
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/storage'
 *              '422':
 *                  description: Error de validacion
 */
router.get("/",getItems);
/**
 * Get storage
 * @openapi
 * /storage/{id}:
 *      get:
 *          tags:
 *              - storage
 *          summary: "Detalle storage"
 *          description: Obten detalle de un storage
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *          - name: id
 *            in: path
 *            description: ID de storage a retornar
 *            required: true
 *            schema:
 *              type: string
 *          responses:
 *              '200':
 *                  description: Retorna el objeto de storage
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/componentes/schemas/storage'
 *              '422':
 *                  description: Error de validacion
 */
router.get("/:id",validatorGetItem,getItem);

router.delete("/:id",validatorGetItem,deleteItems);
/**
 * Upload file
 * @openapi
 * /storage
 *      post:
 *          tags:
 *              - storage
 *          summary: "Upload file"
 *          description: Subir archivo
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200':
 *                  description: Retorna el objeto insertado en la coleccion
 *              '422':
 *                  description: Error validacion
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              myfile:
 *                                  type: string
 *                                  format: binary
 *      responses:
 *          '201':
 *              description: Retorna el objeto insertado en la coleccion con estado '201'
 *          '403':
 *              description: Error de validacion
 */
router.post("/",uploadMiddleware.single("myfile"),createItem);
module.exports= router;