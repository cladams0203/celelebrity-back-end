## Celebrity Dead or Alive Base URL: http://celebrity-dead.heroku.com
---
## Endpoint Summary Table
---
|Type     |Endpoint           |Description    |Auth|
|:-------:|:-----------------:|:-------------:|:--:|
|POST     |/api/users/register|Register User  |No  |
|POST     |/api/users/login   |Login User     |No  |
|GET      |/api/celebs        |Celebrity List |No  |
|PUT      |/api/users/:id     |Edit User      |Yes |
|DELETE   |/api/users/:id     |Remove User    |Yes |
|GET      |/api/scores        |Get All Scores |No  |
|GET      |/api/scores/:id    |Get User Scores|Yes |
|POST     |/api/scores/:id    |Post User Score|Yes |

### Token must be in the header under authorization for Auth endpoints
---
## Register
### Endpoint /api/users/register

```
    {
        "username": "example",         required
        "password": "example"          required
    }
```
#### Returns

```
    {
        "message": "successfully registered as 'user'",
        "id": 1,
        "username": "user",
        "token": "authentication token"
    }
```
---
## Login
### Endpoint /api/users/login

```
    {
        "username": "example",         required
        "password": "example"          required
    }
```
#### Returns

```
    {
        "message": "Login Successful",
        "id": 1,
        "username": "user",
        "token": "authentication token"
    }
```
---
## Edit User
### Endpoint /api/users/:id
```
    {
        "username": "example",         required
        "password": "example"          required
    }
```
#### Returns
```
    {
        "message": "Updated user successfully"
    }
```
---
## Delete User
### Endpoint /api/users/:id

#### Returns
```
    {
        "message": "Successfully removed user"
    }
```
---
## Celebs
### Endpoint /api/celebs

#### Returns
```
    [{
        "id": 1,
        "name": "Celeb Name",
        "url": "Celeb Photo URL",
        "dob": "Celeb Date of Birth",
        "dead" : true if dead , false if alive
    }]
```
---
## All Scores
### Endpoint /api/scores

#### Returns
```
    [{
        "id": 1,
        "score": 500,
        "user_id": 1
    }]
```
---
## Users Scores
### Endpoint /api/scores/:id

#### Returns
```
    [{
        "id": 1,
        "score": 500,
        "user_id": 1
    }]
```
---
## Add Score
### Endpoint /api/scores/:id
```
    {
        "score" : users score
    }
```
#### Returns
```
    score id number
```
---