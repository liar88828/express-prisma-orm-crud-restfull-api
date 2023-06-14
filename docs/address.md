# Address Api Spec

## Create Address Api

Endpoint : POST api/contact/:contactId/address

Header :

- Authorization : token

Response Body :

```json
{
  "street": "jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postalCode": "Kode apa"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postalCode": "Kode apa"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Update Address Api

Endpoint : PUT api/contacts/contactId/:id/addresses/:addressId

Header :

- Authorization : token

Request Body :

```json
{
  "street": "jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postalCode": "Kode apa"
}
```

Request Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postalCode": "Kode apa"
  }
}
```

Request Body Error :

```json
{
  "errors": "Country is required"
}
```

## Get Address Api

Endpoint : GET api/contacts/:contactId/Addresses/:addressId

Headers :

- Authorization :token

Request Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postalCode": "Kode apa"
  }
}
```

Request Body Error :

```json
{
  "error": "Contact is not found"
}
```

## List Address Api

Endpoint : GET /api/contacts/:contactId/address

Headers :

- Authorization : token

Response Body Success :

````json
{
  "data": [
    {
      "id": 1,
      "street": "jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postalCode": "Kode apa"
    },
    {
      "id": 2,
      "street": "jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postalCode": "Kode apa"
    }
  ]
}
````

Request Body Error :

```json
{
  "errors": "contact is not found"
}
````

## Remove Address Api

Headers :

- Authorization : token

Endpoint : DELETE /api/contacts/:contactId/address/:contactId

Response Body Success :

```json
{
  "data": "OK"
}
 ```

Response Body Success :

```json
{
  "errors": "Address is not found"
}

````
