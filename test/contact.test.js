import {
  createContactTest,
  createTestUser,
  getTestContact,
  removeAfterTestUser,
  removeAllTestContact
} from "./test-util.js";
import supertest from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";

describe('POST /api/contacts', () => {
  beforeEach(async () => {
    await createTestUser()
  })
  afterEach(async () => {
    await removeAllTestContact()
    await removeAfterTestUser()
  })

  it('should can create new contact', async () => {
    const result = await supertest(web)
    .post('/api/contacts')
    .set('Authorization', 'test')
    .send({
      firstName: 'test',
      lastName: 'test',
      email: "test@pzn.com",
      phone: '08123123123'
    })

    expect(result.status).toBe(200)
    expect(result.body.data.id).toBeDefined()
    expect(result.body.data.firstName).toBe('test')
    expect(result.body.data.lastName).toBe('test')
    expect(result.body.data.email).toBe('test@pzn.com')
    expect(result.body.data.phone).toBe('08123123123')
  })

  it('should reject if request is not valid', async () => {
      const result = await supertest(web)
      .post('/api/contacts')
      .set('Authorization', 'test')
      .send({
        firstName: '',
        lastName: 'test',
        email: "test",
        phone: '081212312312312123121233123123'
      })

      expect(result.status).toBe(400)
      expect(result.body.errors).toBeDefined()
    }
  )

})

describe('GET /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createTestUser()
    await createContactTest()
  })
  afterEach(async () => {
    await removeAllTestContact()
    await removeAfterTestUser()
  })

  it('should can get contact ', async function () {
    const { id, firstName, lastName, email, phone } = await getTestContact()
    const result = await supertest(web)
    .get(`/api/contacts/${ id }`)
    .set('Authorization', 'test')
    // logger.info(test,result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.id).toBe(id)
    expect(result.body.data.firstName).toBe(firstName)
    expect(result.body.data.lastName).toBe(lastName)
    expect(result.body.data.email).toBe(email)
    expect(result.body.data.phone).toBe(phone)

  });

  it('should cant get contact / error is not found ', async function () {
    const { id } = await getTestContact()
    const result = await supertest(web)
    .get(`/api/contacts/${ id + 1 }`)
    .set('Authorization', 'test')
    // logger.info(test,result.body)
    expect(result.status).toBe(404)
  });

})

describe('PUT /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createTestUser()
    await createContactTest()
  })
  afterEach(async () => {
    await removeAllTestContact()
    await removeAfterTestUser()
  })

  it('should can update existing contact ', async () => {
    const { id, } = await getTestContact()
    const result = await supertest(web)
    .put(`/api/contacts/${ id }`)
    .set('Authorization', 'test')
    .send({
      firstName: 'Eko',
      lastName: 'khannedy',
      email: "eko@pzn.com",
      phone: '08123123123'
    })

    logger.info(test, result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.id).toBe(id)
    expect(result.body.data.firstName).toBe('Eko')
    expect(result.body.data.lastName).toBe('khannedy')
    expect(result.body.data.email).toBe('eko@pzn.com')
    expect(result.body.data.phone).toBe('08123123123')

  });

  it('should cant get contact / error is not found ', async function () {
    const { id, } = await getTestContact()
    const result = await supertest(web)
    .get(`/api/contacts/${ id + 1 }`)
    .set('Authorization', 'test')
    .send({
      firstName: 'Eko',
      lastName: 'khannedy',
      email: "eko@pzn.com",
      phone: '08123123123'
    })
    // logger.info(test,result.body)
    expect(result.status).toBe(404)
  });

})

describe('DELETE /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await createTestUser()
    await createContactTest()
  })
  afterEach(async () => {
    await removeAllTestContact()
    await removeAfterTestUser()
  })

  it('should can delete contact ', async function () {
    let testContact = await getTestContact()
    const result = await supertest(web)
    .delete(`/api/contacts/${ testContact.id }`)
    .set('Authorization', 'test')

    expect(result.status).toBe(200)
    expect(result.body.data).toBe("OK")

    testContact = await getTestContact()
    expect(testContact).toBeNull()
  });

  it('should reject contact error / notfound ', async function () {
    let testContact = await getTestContact()
    const result = await supertest(web)
    .delete(`/api/contacts/${ testContact.id + 1 }`)
    .set('Authorization', 'test')

    expect(result.status).toBe(404)
  });

})