# API Documentation

## User Registration Endpoint

### Endpoint

**POST** /users/register

### Description

Registers a new user by validating the provided data. Requires a valid email, minimum 3 characters for first and last names, and a minimum of 8 characters for the password. On success, returns a JWT token and the newly created user.

### Request

- **Content-Type:** application/json
- **Body:**

```json
{
  "fullname": {
    "firstname": "string (min: 3 characters)",
    "lastname": "string (min: 3 characters)"
  },
  "email": "string (valid email)",
  "password": "string (min: 8 characters)"
}
```

### Success Response

- **Status Code:** 201 Created
- **Body:**

```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
    // ...other user details...
  }
}
```

### Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "605c3c2b9e7b9b0015b4c123",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice.smith@example.com"
    // ...other user details...
  }
}
```

### Error Response

- **Status Code:** 400 Bad Request
- **Body:**

```json
{
  "error": [
    {
      "msg": "Error message",
      "param": "field",
      "location": "body"
    }
    // ...additional errors if present...
  ]
}
```

### Example Error Response

```json
{
  "error": [
    {
      "msg": "Invalid email format",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Additional Notes

- Passwords are hashed before storage using bcrypt.
- A JWT token is generated with a 60-minute expiration.
- Email uniqueness is enforced by the database.
- Validation errors are provided in detail to assist with troubleshooting.

## User Login Endpoint

### Endpoint

**POST** /users/login

### Description

Logs in an existing user using email and password. On success, returns a JWT token and the user details.

### Request

- **Content-Type:** application/json
- **Body:**

```json
{
  "email": "string (valid email)",
  "password": "string (min: 8 characters)"
}
```

### Success Response

- **Status Code:** 200 OK
- **Body:**

```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
    // ...other user details...
  }
}
```

### Example Success Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "605c3c2b9e7b9b0015b4c456",
    "fullname": {
      "firstname": "Bob",
      "lastname": "Jones"
    },
    "email": "bob.jones@example.com"
    // ...other user details...
  }
}
```

### Error Response

- **Status Code:** 401 Unauthorized
- **Body:**

```json
{
  "message": "Invalid email or password"
}
```

### Example Error Response

```json
{
  "message": "Invalid email or password"
}
```

<!-- ...existing docs or notes... -->
