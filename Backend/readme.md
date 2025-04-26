
# Backend

This folder contains the backend code for the project. It is built using **Node.js** and **Express.js** to handle server-side logic, database interactions, and API endpoints.

## Folder Structure

- **`app.js`**: Main application file that initializes the Express app.
- **`controllers/`**: Contains controller files for handling request logic.
- **`db/`**: Contains database connection and configuration files.
- **`models/`**: Contains database models for the application.
- **`routes/`**: Contains route definitions for the API endpoints.
- **`services/`**: Contains service files for business logic and reusable functions.
- **`server.js`**: Entry point for starting the server.

## About JavaScript

JavaScript is a versatile, high-level programming language primarily used for web development. It is widely used for both client-side and server-side programming. Some key features of JavaScript include:

- **Event-driven**: JavaScript is designed to handle asynchronous events efficiently.
- **Dynamic Typing**: Variables in JavaScript are not bound to a specific type.
- **Prototype-based Inheritance**: JavaScript uses prototypes instead of classical inheritance.
- **Cross-platform**: JavaScript can run on various platforms, including browsers and servers (via Node.js).

This project leverages JavaScript's capabilities to build a robust backend system using Node.js.

## How to Run the Backend

1. Install dependencies:
   ```sh
   npm install
   ```

2. Start the server:
   ```sh
   npm start
   ```

3. The server will run on the port specified in the `.env` file or default to `http://localhost:3000`.

## API Endpoints

- **`POST /users/register`**: Endpoint to register a new user. The logic for this is implemented in:
  - Controller: [controllers/user.controllers.js](controllers/user.controllers.js)
  - Service: [services/user.services.js](services/user.services.js)
  - Route: [routes/user.route.js](routes/user.route.js)

Feel free to explore the codebase and contribute!
```

MdAjharAlam1: make readme.md file in Backend folder and make me documentation of of all endpoints and also add response and some ore detail wise

Workspace: Collecting workspace informationHere is a detailed `README.md` file for the Backend folder, including documentation for all endpoints, their responses, and additional details:

```markdown
# Backend

This folder contains the backend code for the Uber Clone project. It is built using **Node.js**, **Express.js**, and **MongoDB**. The backend handles user and captain registration, authentication, and other related functionalities.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
  - [User Endpoints](#user-endpoints)
  - [Captain Endpoints](#captain-endpoints)

---

## Setup Instructions

1. Install dependencies:
   ```sh
   npm install
   ```

2. Create a `.env` file in the `Backend` folder with the following variables:
   ```env
   PORT=8000
   MONGODB_URL=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

3. Start the server:
   ```sh
   npm start
   ```

4. The server will run on `http://localhost:8000`.

---

## Folder Structure

- **`app.js`**: Main application file that initializes middleware and routes.
- **`server.js`**: Entry point for starting the server.
- **`controllers/`**: Contains logic for handling requests.
- **`models/`**: Contains database schemas and models.
- **`routes/`**: Defines API endpoints.
- **`services/`**: Contains reusable business logic.
- **`middlewares/`**: Middleware for authentication and validation.
- **`db/`**: Database connection logic.

---

## API Documentation

### User Endpoints

#### 1. **Register User**
- **Endpoint**: `POST /api/v1/users/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "token": "<jwt-token>",
      "user": {
        "_id": "userId",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```
  - **Error**: `400 Bad Request` (Validation errors)

#### 2. **Login User**
- **Endpoint**: `POST /api/v1/users/login`
- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "token": "<jwt-token>",
      "user": {
        "_id": "userId",
        "fullName": {
          "firstName": "John",
          "lastName": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```
  - **Error**: `400 Bad Request` (Invalid credentials)

#### 3. **Get User Profile**
- **Endpoint**: `GET /api/v1/users/profile`
- **Description**: Retrieves the profile of the authenticated user.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <jwt-token>"
  }
  ```
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "_id": "userId",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
    }
    ```
  - **Error**: `403 Forbidden` (Unauthorized)

#### 4. **Logout User**
- **Endpoint**: `GET /api/v1/users/logout`
- **Description**: Logs out the authenticated user.
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "message": "Logout Successfully"
    }
    ```

---

### Captain Endpoints

#### 1. **Register Captain**
- **Endpoint**: `POST /api/v1/captains/register`
- **Description**: Registers a new captain.
- **Request Body**:
  ```json
  {
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "password": "password123",
    "vehicle": {
      "plate": "ABC123",
      "color": "Red",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "token": "<jwt-token>",
      "captain": {
        "_id": "captainId",
        "fullName": {
          "firstName": "Jane",
          "lastName": "Smith"
        },
        "email": "jane.smith@example.com",
        "vehicle": {
          "plate": "ABC123",
          "color": "Red",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```
  - **Error**: `400 Bad Request` (Validation errors)

#### 2. **Login Captain**
- **Endpoint**: `POST /api/v1/captains/login`
- **Description**: Logs in an existing captain.
- **Request Body**:
  ```json
  {
    "email": "jane.smith@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "token": "<jwt-token>",
      "captain": {
        "_id": "captainId",
        "fullName": {
          "firstName": "Jane",
          "lastName": "Smith"
        },
        "email": "jane.smith@example.com"
      }
    }
    ```
  - **Error**: `400 Bad Request` (Invalid credentials)

#### 3. **Get Captain Profile**
- **Endpoint**: `GET /api/v1/captains/profile`
- **Description**: Retrieves the profile of the authenticated captain.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <jwt-token>"
  }
  ```
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "_id": "captainId",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "plate": "ABC123",
        "color": "Red",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
    ```
  - **Error**: `403 Forbidden` (Unauthorized)

#### 4. **Logout Captain**
- **Endpoint**: `GET /api/v1/captains/logout`
- **Description**: Logs out the authenticated captain.
- **Response**:
  - **Success**: `200 OK`
    ```json
    {
      "message": "Logout Successfully"
    }
    ```

---

## Notes

- All endpoints requiring authentication use JWT tokens.
- Validation errors are returned with detailed messages for each field.
- The `BlacklistToken` model ensures that logged-out tokens cannot be reused.


MdAjharAlam1: in above make readme.md file in a single file

GitHub Copilot: Here is the `README.md` file for the Backend folder, including detailed documentation for the code provided:

```markdown
# Backend

This folder contains the backend code for the Uber Clone project. It is built using **Node.js**, **Express.js**, and **MongoDB**. The backend handles user and captain registration, authentication, and other related functionalities.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
  - [User Endpoints](#user-endpoints)
  - [Captain Endpoints](#captain-endpoints)
- [Models](#models)
  - [User Model](#user-model)
  - [Captain Model](#captain-model)
  - [Blacklist Token Model](#blacklist-token-model)

---

## Setup Instructions

1. Install dependencies:
   ```sh
   npm install
   ```

2. Create a `.env` file in the `Backend` folder with the following variables:
   ```env
   PORT=8000
   MONGODB_URL=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

3. Start the server:
   ```sh
   npm start
   ```

4. The server will run on `http://localhost:8000`.

---

## Folder Structure

- **`app.js`**: Main application file that initializes middleware and routes.
- **`server.js`**: Entry point for starting the server.
- **`controllers/`**: Contains logic for handling requests.
- **`models/`**: Contains database schemas and models.
- **`routes/`**: Defines API endpoints.
- **`services/`**: Contains reusable business logic.
- **`middlewares/`**: Middleware for authentication and validation.
- **`db/`**: Database connection logic.

---

## API Documentation

### User Endpoints

#### 1. **Register User**
- **Endpoint**: `POST /api/v1/users/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **Success**: `200 OK`
    ```json