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
    // logger.info(result.body)
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
    // logger.info(result.body)
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
    // logger.info(result.body)
    expect(result.status).toBe(404)
  });

  it('should reject if  address is not found', async function () {
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()
    const result = await supertest(web)
    .get(`/api/contacts/${ testContact.id }/addresses/${ testAddress.id + 1 }`)
    .set('Authorization', 'test')
    // logger.info(result.body)
    expect(result.status).toBe(404)
  });

})

describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
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

  it('should can update address', async function () {
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()
    const result = await supertest(web)
    .put(`/api/contacts/${ testContact.id }/addresses/${ testAddress.id }`)
    .set('Authorization', 'test')
    .send(createAddress)
    // logger.info(result.body)
    expect(result.status).toBe(200)
    expect(result.body.data.id).toBeDefined()
    expect(result.body.data.street).toBe(createAddress.street)
    expect(result.body.data.city).toBe(createAddress.city)
    expect(result.body.data.province).toBe(createAddress.province)
    expect(result.body.data.country).toBe(createAddress.country)
    expect(result.body.data.postal_code).toBe(createAddress.postal_code)
  });

  it('should reject when request is invalid', async function () {
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()
    let send = createAddress
    send.province = ''
    send.street = ''
    send.country = ''
    const result = await supertest(web)
    .put(`/api/contacts/${ testContact.id }/addresses/${ testAddress.id }`)
    .set('Authorization', 'test')
    .send(send)
    logger.info(result.body)
    expect(result.status).toBe(400)
  })

  it('should reject when address is not found ', async function () {
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()
    const result = await supertest(web)
    // createAddress
    // createAddress.province = 'asdasd'
    // createAddress.street = 'asd'
    // createAddress.country = 'asdasd'
    .put(`/api/contacts/${ testContact.id + 1 }/addresses/${ testAddress.id }`)
    .set('Authorization', 'test')
    .send(createAddress)
    // logger.info(result.body)
    expect(result.status).toBe(404)
  })

  it('should reject when contact is not found ', async function () {
    const testContact = await getTestContact()
    const testAddress = await getTestAddress()
    const result = await supertest(web)
    .put(`/api/contacts/${ testContact.id }/addresses/${ testAddress.id + 1 }`)
    .set('Authorization', 'test')
    .send(createAddress)
    // logger.info(result.body)
    expect(result.status).toBe(404)
  })
})

describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
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
  it('should can remove addresss', async () => {
    const testContact = await getTestContact()
    let testAddress = await getTestAddress()
    const result = await supertest(web)
    .delete(`/api/contacts/${ testContact.id }/addresses/${ testAddress.id }`)
    .set('Authorization', 'test')
    // logger.info(result.body)
    expect(result.status).toBe(200)
    expect(result.body.data).toBe("Ok")
    testAddress = await getTestAddress()
    expect(testAddress).toBeNull()
  });

  it('should reject address is not found', async () => {
    const testContact = await getTestContact()
    let testAddress = await getTestAddress()
    const result = await supertest(web)
    .delete(`/api/contacts/${ testContact.id }/addresses/${ testAddress.id + 1 }`)
    .set('Authorization', 'test')
    // logger.info(result.body)
    expect(result.status).toBe(404)
  });

  it('should reject contact is not found', async () => {
    const testContact = await getTestContact()
    let testAddress = await getTestAddress()
    const result = await supertest(web)
    .delete(`/api/contacts/${ testContact.id + 1 }/addresses/${ testAddress.id }`)
    .set('Authorization', 'test')
    // logger.info(result.body)
    expect(result.status).toBe(404)
  });
})

describe('GET /api/contacts/:contactId/addresses/', () => {
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
  it('should can list address', async () => {
    const testContact = await getTestContact()
    const result = await supertest(web)
    .get(`/api/contacts/${ testContact.id }/addresses/`)
    .set('Authorization', 'test')
    expect(result.status).toBe(200)
    expect(result.body.data.length).toBe(1)
  })

  it('should reject list address invalid ', async () => {
    const testContact = await getTestContact()
    const result = await supertest(web)
    .get(`/api/contacts/${ testContact.id + 1 }/addresses`)
    .set('Authorization', 'test')
    expect(result.status).toBe(404)
  })
})