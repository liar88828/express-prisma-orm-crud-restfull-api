import supertest from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";
import { createTestUser, getUserTest, loginUserTest, removeAfterTestUser, sendDataUserTest } from "./test-util.js";
import bcrypt from "bcrypt";

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

describe('PATCH /api/users/current', () => {
  beforeEach(async () => {
    await createTestUser()
  })

  afterEach(async () => await removeAfterTestUser())

  it('should can update user ', async function () {
    const result = await supertest(web)
    .patch('/api/users/current')
    .set('Authorization', 'test')
    .send({
      name: "Eko",
      password: "rahasia"
    })
    expect(result.status).toBe(200)
    expect(result.body.data.username).toBe('test')
    expect(result.body.data.name).toBe('Eko')

    const user = await getUserTest()
    expect(await bcrypt.compare('rahasia', user.password))
    // .toBeTruthy()
    .toBe(true)

  });

  it('should can update user name only ', async function () {

    const result = await supertest(web)
    .patch('/api/users/current')
    .set('Authorization', 'test')
    .send({
      name: "Eko",
    })
    // logger.info(result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.username).toBe('test')
    expect(result.body.data.name).toBe('Eko')
  });

  it('should can update user password only ', async function () {
    const result = await supertest(web)
    .patch('/api/users/current')
    .set('Authorization', 'test')
    .send({
      password: "rahasia",
    })
    // logger.info(result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.username).toBe('test')
    expect(result.body.data.name).toBe('test')

    const user = await getUserTest()
    expect(await bcrypt.compare('rahasia', user.password))
    // .toBeTruthy()
    .toBe(true)

  });

  it('should can reject if request is not valid ', async function () {
    const result = await supertest(web)
    .patch('/api/users/current')
    .set('Authorization', 'salah')
    .send({
      password: "rahasia",
    })
    // logger.info(result.body)
    expect(result.status).toBe(401)

  });

})

describe('DELETE /api/users/logout', () => {

  beforeEach(async () => {
    await createTestUser()
  })

  afterEach(async () => await removeAfterTestUser())

  it('should can logout', async function () {
    const result = await supertest(web)
    .delete('/api/users/logout')
    .set('Authorization', "test")

    logger.info(result.body)

    expect(result.status).toBe(200)
    expect(result.body.data).toBe("OK")

    const user = await getUserTest()
    expect(user.token).toBeNull()
  });

  it('should be reject token is invalid', async function () {
    const result = await supertest(web)
    .delete('/api/users/logout')
    .set('Authorization', "salah")

    logger.info(result.body)

    expect(result.status).toBe(401)
  });
})