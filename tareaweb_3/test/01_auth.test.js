const request = require("suoertest")
const mongoose= require("mongoose")
const app = require("../app")
const {usersModel} = require("../models")

const testAuthLogin = {
    email: "test@test.com",
    password: "12345678"
};
const testAuthRegister = {
    name: "User test",
    age: 20,
    email: "test2@test2.com",
    password: "12345678"
};
/**
 * se va a ejecutar antes de las pruebas
 */
beforeAll(async() => {
  await usersModel.deleteMany();
})
afterAll(() => {
    mongoose.connection.close()
})

describe("[AUTH] esta es la prueba de /api/auth", () => {
    
    test("esto deberia retornar 401", async () => {
        const newTestAuthLogin = {... testAuthLogin, password:"22222"}
        const response = await request(app)
        .post('/api/auth/login')
        .send(testAuthLogin);
        
        expect(response.statusCode).toEqual(401)
    });

    test("esto deberia retornar 200 login exitoso", async () => {
        const response = await request(app)
        .post('/api/auth/login')
        .send(testAuthRegister);
        
        expect(response.statusCode).toEqual(200)
    });
  
    test("esto deberia retornar 201", async () => {
        const response = await request(app)
        .post('/api/auth/register')
        .send(testAuthRegister);
        
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("data.token");
        expect(response.body).toHaveProperty("data.user");
    });

} );