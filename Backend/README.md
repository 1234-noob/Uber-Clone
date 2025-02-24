# API Documentation

## Users Routes

### User Registration Endpoint

**Endpoint:** POST users/register

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

## User Profile Endpoint

### Endpoint

**GET** /users/profile

### Description

Retrieves the profile details of the authenticated user.

### Request

- **Headers:** Must include a valid JWT token (in cookies or Authorization header).

### Success Response

- **Status Code:** 200 OK
- **Body:**

```json
{
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
  "user": {
    "_id": "605c3c2b9e7b9b0015b4c789",
    "fullname": {
      "firstname": "Charlie",
      "lastname": "Brown"
    },
    "email": "charlie.brown@example.com"
    // ...other user details...
  }
}
```

### Error Response

- **Status Code:** 401 Unauthorized
- **Body:**

```json
{
  "message": "Unauthorized"
}
```

## User Logout Endpoint

### Endpoint

**GET** /users/logout

### Description

Logs out the authenticated user by clearing the authentication token cookie and blacklisting the token.

### Request

- **Headers:** Must include a valid JWT token (in cookies or Authorization header).

### Success Response

- **Status Code:** 200 OK
- **Body:**

```json
{
  "message": "Logged out successfully"
}
```

### Example Success Response

```json
{
  "message": "Logged out successfully"
}
```

### Error Response

- **Status Code:** 401 Unauthorized
- **Body:**

```json
{
  "message": "Unauthorized"
}
```

## Captains Routes

### Captains Registration Endpoint

**Endpoint:** POST captains/register

**Description:**  
Registers a new captain. Validates the captain's details including personal and vehicle information. On success, returns a JWT token and the created captain object.

**Request:**

- Content-Type: application/json
- Body:

```json
{
  "fullname": {
    "firstname": "string (min: 3 characters)",
    "lastname": "string (min: 3 characters)"
  },
  "email": "string (valid email)",
  "password": "string (min: 8 characters)",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "string"
  }
}
```

**Success Response:**

- Status Code: 201 Created
- Body:

```json
{
  "token": "string (JWT token)",
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
    // ...other captain details...
  }
}
```

**Example Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.abcd1234",
  "captain": {
    "_id": "605c3c2b9e7b9b0015b4c123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Error Response:**

- Status Code: 400 Bad Request
- Body:

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

**Example Error Response:**

```json
{
  "error": [
    {
      "msg": "For a capacity of 3 or more, vehicle type must be car",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}
```

### Captains Login Endpoint

**Endpoint:** POST /captains/login

**Description:**  
Logs in a captain using email and password. On success, returns a JWT token and the captain's details.

**Request:**

- Content-Type: application/json
- Body:

```json
{
  "email": "string (valid email)",
  "password": "string (min: 8 characters)"
}
```

**Success Response:**

- Status Code: 200 OK
- Body:

```json
{
  "token": "string (JWT token)",
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
    // ...other captain details...
  }
}
```

**Example Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.abcd1234",
  "captain": {
    "_id": "605c3c2b9e7b9b0015b4c123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Error Response:**

- Status Code: 401 Unauthorized
- Body:

```json
{
  "message": "Invalid email or password"
}
```

**Example Error Response:**

```json
{
  "message": "Invalid email or password"
}
```

### Captains Profile Endpoint

**Endpoint:** GET /captains/profile

**Description:**  
Retrieves the profile details of the authenticated captain.

**Request:**

- Headers: Must include a valid JWT token (in cookies or Authorization header).

**Success Response:**

- Status Code: 200 OK
- Body:

```json
{
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
    // ...other captain details...
  }
}
```

**Example Success Response:**

```json
{
  "captain": {
    "_id": "605c3c2b9e7b9b0015b4c123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Error Response:**

- Status Code: 401 Unauthorized
- Body:

```json
{
  "message": "Unauthorized"
}
```

**Example Error Response:**

```json
{
  "message": "Unauthorized"
}
```

### Captains Logout Endpoint

**Endpoint:** GET /captains/logout

**Description:**  
Logs out the authenticated captain by clearing the authentication token cookie and blacklisting the token.

**Request:**

- Headers: Must include a valid JWT token (in cookies or Authorization header).

**Success Response:**

- Status Code: 200 OK
- Body:

```json
{
  "message": "Logged out successfully"
}
```

**Example Success Response:**

```json
{
  "message": "Logged out successfully"
}
```

**Error Response:**

- Status Code: 401 Unauthorized
- Body:

```json
{
  "message": "Unauthorized"
}
```

**Example Error Response:**

```json
{
  "message": "Unauthorized"
}
```

## Maps Routes

### Get Address Coordinates Endpoint

**Endpoint:** GET /maps/coordinates

**Description:**  
Converts a text address into geographic coordinates (latitude and longitude).

**Request:**

- Query Parameters:
  - `address`: string (required) - The address to geocode

**Success Response:**

- Status Code: 200 OK
- Body:

```json
{
  "lat": "number",
  "lng": "number"
}
```

**Example Success Response:**

```json
{
  "lat": 40.7128,
  "lng": -74.006
}
```

**Error Response:**

- Status Code: 400 Bad Request
- Body:

```json
{
  "message": "Address is required"
}
```

### Get Distance and Time Endpoint

**Endpoint:** GET /maps/distance-time

**Description:**  
Calculates the distance and estimated travel time between two locations.

**Request:**

- Query Parameters:
  - `origin`: string (required) - Starting location address
  - `destination`: string (required) - Ending location address

**Success Response:**

- Status Code: 200 OK
- Body:

```json
{
  "distance": "number (in meters)",
  "duration": "number (in seconds)"
}
```

**Example Success Response:**

```json
{
  "distance": 8047,
  "duration": 1200
}
```

**Error Response:**

- Status Code: 400 Bad Request
- Body:

```json
{
  "message": "Origin and Destination are required"
}
```

### Get Address Autocomplete Endpoint

**Endpoint:** GET /maps/autocomplete

**Description:**  
Provides address suggestions based on partial input text.

**Request:**

- Query Parameters:
  - `input`: string (required) - Partial address text

**Success Response:**

- Status Code: 200 OK
- Body:

```json
{
  "predictions": [
    {
      "description": "string",
      "place_id": "string",
      "structured_formatting": {
        "main_text": "string",
        "secondary_text": "string"
      }
    }
  ]
}
```

**Example Success Response:**

```json
{
  "predictions": [
    {
      "description": "Times Square, Manhattan, NY, USA",
      "place_id": "ChIJmQJIxlVYwokRLgeuocVOGVU",
      "structured_formatting": {
        "main_text": "Times Square",
        "secondary_text": "Manhattan, NY, USA"
      }
    },
    {
      "description": "Times Square Station, NY, USA",
      "place_id": "ChIJhRwB-VJYwokR4rXXqogE9Ds",
      "structured_formatting": {
        "main_text": "Times Square Station",
        "secondary_text": "NY, USA"
      }
    }
  ]
}
```

**Error Response:**

- Status Code: 400 Bad Request
- Body:

```json
{
  "message": "Input is required"
}
```

## Ride Routes

### Get Fare Estimate

**Endpoint:** GET /ride/getfare

**Description:**  
Get estimated fare for different vehicle types between two locations.

**Request:**

- Headers: Bearer Token required
- Query Parameters:
  - `pickup`: string (required) - Pickup location address
  - `destination`: string (required) - Destination location address

**Success Response:**

- Status Code: 200 OK
- Body:

```json
{
  "fare": {
    "motorcycle": 45,
    "car": 80,
    "auto": 60
  }
}
```

**Error Response:**

- Status Code: 400 Bad Request

```json
{
  "error": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "query"
    }
  ]
}
```

- Status Code: 401 Unauthorized

```json
{
  "message": "Authentication required"
}
```

### Create Ride

**Endpoint:** POST /ride/create

**Description:**  
Create a new ride request with specified pickup and destination locations.

**Request:**

- Headers: Bearer Token required
- Content-Type: application/json
- Body:

```json
{
  "pickup": "string (min: 3 characters)",
  "destination": "string (min: 3 characters)",
  "vehicleType": "string (motorcycle|car|auto)"
}
```

**Success Response:**

- Status Code: 201 Created
- Body:

```json
{
  "ride": {
    "_id": "string",
    "user": "string",
    "pickup": "string",
    "destination": "string",
    "fare": "number",
    "status": "Pending",
    "otp": "number"
  }
}
```

**Example Success Response:**

```json
{
  "ride": {
    "_id": "61234567890abcdef1234567",
    "user": "61234567890abcdef1234568",
    "pickup": "123 Start Street",
    "destination": "456 End Avenue",
    "fare": 80,
    "status": "Pending",
    "otp": 1234
  }
}
```

**Error Responses:**

- Status Code: 400 Bad Request

```json
{
  "error": [
    {
      "msg": "Invalid vehicle type",
      "param": "vehicleType",
      "location": "body"
    }
  ]
}
```

- Status Code: 401 Unauthorized

```json
{
  "message": "Authentication required"
}
```

- Status Code: 500 Server Error

```json
{
  "message": "Error creating ride"
}
```
