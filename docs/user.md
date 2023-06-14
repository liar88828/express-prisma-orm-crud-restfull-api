# User Api Spec

## Register User Api

Endpoint : POST api/users

```json
{
  "username":"pzn",
  "password":"rahasia",
  "name":"Programer zaman now",
}```


Response Body Success :

```json
{
"data":{
  "username":"pzn",
  "name":"Programer zaman"
},
}
```

Response Body Error :

```json
{
"error":"Username already registered"
}
```

## Login User Api

Endpoint : POST api/users/login

Request Body :

```json
{
  "username":"pzn",
  "password":"rahasia",
}
```

Request Body Success :

```json
{
  "data":{
    "token":"unique-token",
}
}
```

Request Body Error :

```json
{
"error":"Username or Password wrong"
}
```

## Update User Api

Endpoint : PATCH api/users/current

Headers :

- Authorization :token

Request Body :

```json
{
  "name":"programer zaman now Lagi",//optional 
  "password":"new password",//optional
}
```

Request Body Success :

```json
{
  "data":{
    "username":"pzn",
    "name":"Programmer Zaman Now Lagi"
  }
}
```

Request Body Error :

```json
{
"error":"Name Length max 100"
}
```

## Get User Api

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data":{
    "username":"pzn",
    "name":"Programer Zaman Now"
  }
}

Response Body Error :

```json
{
"errors":"Reauthorization"
}

```

## Logout User Api

Headers :

- Authorization : token

Endpoint : DELETE /api/users/logout

Response Body Success :

```json
{
  "data":"OK"
}

Response Body Error :

```json
{
"errors":"Unauthorized"
}
