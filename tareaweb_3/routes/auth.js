const express = require ("express");
const {loginCtrl, registerCtrl} = require("../controllers/auth")
const router = express.Router();
const {validatorRegister, validatorLogin}= require('../validators/auth')

/**
 * http://localhost:3001/api
 * 
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              -auth
 *          summary: "Registrar nuevo usuario"
 *          description: "Esta ruta es para registrar un nuevo usuario"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses: 
 *                  '201':
 *                      description: Usuario registrado de manera correcta
 *                  '403':
 *                      description: Error por validacion de usuario                   
 */
router.post("/register",validatorRegister, registerCtrl);

router.post("/login",validatorLogin, loginCtrl );

module.exports = router;