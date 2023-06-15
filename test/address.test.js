import {
  createAddress,
  createAdressDataTest,
  createContactTest,
  createTestUser,
  getTestAddress,
  getTestContact,
  removeAfterTestUser,
  removeAllTestAddress,
  removeAllTestContact
} from "./test-util.js";
import supertest from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";

describe('POST /api/contacts/:contactId/addresses', () => {
  beforeEach(async () => {
    await createTestUser()
    await createContactTest()
  })
  afterEach(async () => {
    await removeAllTestAddress()
    await removeAllTestContact()
    await removeAfterTestUser()
  })
  it('should can create new address', async function () {
    const testContact = await getTestContact()
    const result = await supertest(web)
    .post(`/api/contacts/${ testContact.id }/addresses`)
    .set('Authorization', 'test')
    .send(createAddress)
    expect(result.status).toBe(200)
    expect(result.body.data.id).toBeDefined()
    expect(result.body.data.street).toBe(createAddress.street)
    expect(result.body.data.city).toBe(createAddress.city)
    expect(result.body.data.province).toBe(createAddress.province)
    expect(result.body.data.country).toBe(createAddress.country)
    expect(result.body.data.postal_code).toBe(createAddress.postal_code)
  });

  it('should reject is invalid', async function () {
    const testContact = await getTestContact()
    createAddress.postal_code = ''
    const result = await supertest(web)
    .post(`/api/contacts/${ testContact.id }/addresses`)
    .set('Authorization', 'test')
    .send(createAddress)
    // logger.info(result.body)
    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  });

  it('should reject is invalid is not found ', async function () {
    createAddress
    createAddress.postal_code = ''
    createAddress.country = ''
    const testContact = await getTestContact()
    const result = await supertest(web)
    .post(`/api/contacts/${ testContact.id + 1 }/addresses`)
    .set('Authorization', 'test')
    .send(createAddress)
    logger.info(result.body)
    expect(result.status).toBe(400)
    expect(result.body.errors).toBeDefined()
  });

})
describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
  beforeEach(async () => {
    await createTestUser()
    await createContactTest()
    await createAdressDataTest()
  })
  afterEach(async () => {
    await removeAllTestAddress()
    await removeAllTestContact()
    await removeAfterTestUser()
  })

  it('should can et contact', async function () {
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()
    const result = await supertest(web)
    .get(`/api/contacts/${ testContact.id }/addresses/${ testAddress.id }`)
    .set('Authorization', 'test')
    logger.info(result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.id).toBeDefined()
    expect(result.body.data.street).toBe(createAddress.street)
    expect(result.body.data.city).toBe(createAddress.city)
    expect(result.body.data.province).toBe(createAddress.province)
    expect(result.body.data.country).toBe(createAddress.country)
    expect(result.body.data.postal_code).toBe(createAddress.postal_code)
  });

  it('should reject if contact is not found', async function () {
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()
    const result = await supertest(web)
    .get(`/api/contacts/${ testContact.id + 1 }/addresses/${ testAddress.id }`)
    .set('Authorization', 'test')
    logger.info(result.body)
    expect(result.status).toBe(404)
  });

  it('should reject if  address is not found', async function () {
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()
    const result = await supertest(web)
    .get(`/api/contacts/${ testContact.id }/addresses/${ testAddress.id + 1 }`)
    .set('Authorization', 'test')
    logger.info(result.body)
    expect(result.status).toBe(404)
  });

})
