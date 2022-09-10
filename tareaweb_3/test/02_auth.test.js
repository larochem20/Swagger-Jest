const request = require("suoertest")
const app = require("../app")
const {tokenSign} = require("../utils/handleJwt");
const {usersModel} = require("../models")
const {storageModel} = require("../models")
let JWT_TOKEN= "";
const filePath = '${dir_name}/dump/tracks.mp3'
/**
 * Necesitamos obtener le JWT token de sesion antes que todos
 */
beforeAll(async () =>{
    const user = usersModel.findOne({ email:"test@test.com"});
    JWT_TOKEN= await tokenSign(user);
});
/**
 * [POST STORAGE] Test for upload
 */
describe("[STORAGE] Upload file", () => {
    test("should upload file", async () =>{
        const res = await request(app)
        .post("/api/storage")
        .set("Authorization", 'Bearer ${JWT_TOKEN}')
        .attach("myfile", filePath);
        const {body} = res;
        expect(res.statusCode).toEqual(201);
        expect(body).toHaveProperty("data");
        expect(body).toHaveProperty("data.url");
    });
});
/**
 * [GET STORAGE LIST] Test get List items
 */
describe("[STORAGE] Return all files", () =>{
    test("should create a return all"), async () =>{
        const res= await request(app)
        .get("/api/storage")
        .set("Authorization", 'Bearer ${JWT_TOKEN')
    const {body}= res;
    expect(res.statusCode).toEqual(200);
    const {data}= body;
    // idFile = data.docs[0]._id;
    expect(body).toHaveProperty("data");
    }
});

/**
 * [GET STORAGE ITEM] Test get detail item
 */
 describe("[STORAGE] Return one item", () =>{

    test("deberia retornar el id de un item", async () => {
        let id = ''
        const {_id} = await storageModel.findOne()
        id = _id.toString();
    })

    test("should create a return one"), async () =>{
        const res= await request(app)
        .get('/api/storage/${id}')
        .set("Authorization", 'Bearer ${JWT_TOKEN')
    const {body}= res;
    expect(res.statusCode).toEqual(200);
    const {data}= body;
    // idFile = data.docs[0]._id;
    expect(body).toHaveProperty("data");
    }
});
afterAll(() => {
    mongoose.connection.close()
})