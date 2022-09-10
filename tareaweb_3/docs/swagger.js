const swaggerJsdoc = require("swagger-jsdoc");

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion de API",
        version: "1.0.0",
    },
    servers:[
{
    url:"http://localhost:3001/api",
},
    ],
   components:{  
    securitySchemes:{
bearerAuth:{
    type:"http",
    scheme:"bearer"
}
    } ,
    schemas:{
        track:{
            type:"object",
            required:["name","album"],
            properties:{
                name:{
                    type:"string"
                },
                album:{
                    type:"string"
                },
                cover:{
                    type:"string"
                },
                artist:{
                    type:"object",
                    properties:{
                        name:{
                            type:"string"
                        },
                        nickname:{
                            type:"string"
                        },
                        nationality:{
                            type:"string"
                        }
                    }
                },
                duration:{
                    type:"object",
                    properties:{
                        start:{
                            type:"integer"
                        },
                        end:{
                            type:"integer"
                        }
                    }
                },
                mediaId:{
                    type:"string"
                }
            }
        }
    }
   }
}
const options = {
    swaggerDefinition,
    apis:[
        "./routes/*.js"
    ]
}

const openApiConfiguration = swaggerJsdoc(options);

module.exports= openApiConfiguration