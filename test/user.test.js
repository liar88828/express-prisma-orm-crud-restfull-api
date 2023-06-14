import supertest from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";
import { createTestUser, loginUserTest, removeAfterTestUser, sendDataUserTest } from "./test-util.js";

describe('POST /api/users', function () {
  afterEach(async () => {
    await removeAfterTestUser()
  })

  it('should can register new user', async () => {
    const result = await supertest(web)
    .post('/api/users')
    .send(sendDataUserTest)

    expect(result.status).toBe(200)
    expect(result.body.data.username).toBe('test')
    expect(result.body.data.name).toBe('test')
    expect(result.body.data.password).toBe(undefined)
    expect(result.body.data.password).toBeUndefined()
  });

  it('should can register is invalid', async () => {
    const result = await supertest(web)
    .post('/api/users')
    .send({
      password: "",
      username: "",
      name: ''
    })
    // console.info(result.body)
    logger.info(result.body)
    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  });

  it('should reject if user ready register', async () => {
    let result = await supertest(web)
    .post('/api/users')
    .send(sendDataUserTest)

    expect(result.status).toBe(200)
    expect(result.body.data.username).toBe('test')
    expect(result.body.data.name).toBe('test')
    expect(result.body.data.password).toBe(undefined)
    expect(result.body.data.password).toBeUndefined()

    result = await supertest(web)
    .post('/api/users')
    .send(sendDataUserTest)
    logger.info(result.body)
    expect(result.status).toBe(404)
    expect(result.body.errors).toBeDefined()
  });

})

describe('Post /api/users/login', () => {
  beforeEach(async () => {
    await createTestUser()
  })

  afterEach(async () => {
    await removeAfterTestUser()
  })

  it('should can login)', async () => {
    const result = await supertest(web)
    .post('/api/users/login')
    .send(loginUserTest)

    // console.log(result.body)

    expect(result.status).toBe(200)
    expect(result.body.data.token).toBeDefined()
    expect(result.body.token).not.toBe("test")
  });

  it('should be reject if  login invalid)', async () => {
    const result = await supertest(web)
    .post('/api/users/login')
    .send({
      username: "",
      password: ""
    })

    // console.log(result.body)

    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  });

  it('should be reject if  login invalid)', async () => {
    const result = await supertest(web)
    .post('/api/users/login')
    .send({
      username: "test",
      password: "salah"
    })

    // console.log(result.body)

    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined()
  });
  it('should be reject if  login invalid)', async () => {
    const result = await supertest(web)
    .post('/api/users/login')
    .send({
      username: "salah",
      password: "salah"
    })

    // console.log(result.body)

    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined()
  });
})

describe('Get /api/users/current ', () => {
  beforeEach(async () => {
    await createTestUser()
  })

  afterEach(async () => {
    await removeAfterTestUser()
  })

  it('should can get current user', async () => {
    const result = await supertest(web)
    .get('/api/users/current')
    .set('Authorization', 'test')
    // logger.info(result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.username).toBe('test')
    expect(result.body.data.name).toBe('test')
  });

  it('should token is invalid', async () => {
    const result = await supertest(web)
    .get('/api/users/current')
    .set('Authorization', 'salah')
    // logger.info(result.body)
    expect(result.status).toBe(401)
    expect(result.body.errors).toBeDefined()
  });

})