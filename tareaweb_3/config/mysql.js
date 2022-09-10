const {Sequelize} = require("sequelize");
const NODE_ENV = process.env.NODE_EN
const DB_URI = (NODE_ENV === 'test')? process.env.DB_URI_TEST :  process.env.DB_URI;

const database = (NODE_ENV === 'test') ? process.env.MYSQL_DATABASE_TEST: process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect:"mysql"
    }
)

const dbConnectMysql = async () => {
try{
await sequelize.authenticate();
console.log('MYSQL CONEXION CORRECTA')
}catch(e){
    console('Mysql error', e)
}
};

module.exports = {sequelize, dbConnectMysql}