# Contact Api Spec

## Create Contact Api

Endpoint : POST api/contacts

Header :

- Authorization : token

Response Body :

```json
{
  "firstName": "Eko",
  "lastName": "kennedy",
  "email": "eko@gmail.com",
  "phone": "08123123123"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Eko",
    "lastName": "kennedy",
    "email": "eko@gmail.com",
    "phone": "08123123123"
  }
}
```

Response Body Error :

```json
{
  "error": "Email is not valid format"
}
```

## Update Contact Api

Endpoint : PUT api/Contacts/contact/:id

Request Body :

```json
{
  "firstName": "Eko",
  "lastName": "kennedy",
  "email": "eko@gmail.com",
  "phone": "08123123123"
}
```

Request Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Eko",
    "lastName": "kennedy",
    "email": "eko@gmail.com",
    "phone": "08123123123"
  }
}
```

Request Body Error :

```json
{
  "error": "Email is not valid format"
}
```

## Get Contact Api

Endpoint : PATCH api/contact/:id

Headers :

- Authorization :token

Request Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Eko",
    "lastName": "kennedy",
    "email": "eko@gmail.com",
    "phone": "08123123123"
  }
}
```

Request Body Error :

```json
{
  "error": "Contact is not found"
}
```

## Search Contact Api

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query params:

- name : Search by firstname or lastName, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number by page, default 1
- size : size by page, default 1

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "firstName": "Eko",
      "lastName": "kennedy",
      "email": "eko@gmail.com",
      "phone": "08123123123"
    },
    {
      "id": 2,
      "firstName": "Eko",
      "lastName": "kennedy",
      "email": "eko@gmail.com",
      "phone": "08123123123"
    }
  ],
  "paging": {
    "page": 1,
    "totalPage": 3,
    "maxPage": 30
  }
}
```

Response Body Error
: 
```json
{
"errors": "Reauthorization"
}

```

## Remove  Contact Api

Headers :

- Authorization : token

Endpoint : DELETE /api/contact/:id

Response Body Success :

```json
{
  "data":"OK"
}

Response Body Error :

```json
{
"errors":"Contact is not found"
}
