# Backend Server

This is backend server in Go for YatraBandhu, this README gives you a idea about the server's RESTapi endpoints what they do and their requirements for calling them.

## API Endpoints
### Users
API endpoints and their requirements 
1. **Register-User**:
    - **HTTP Method :** `POST`
    - **Endpoint :** `/v1/register`
    - **Purpose :** registers user account to server
    - **Authentication :** No
    - **Request Body :**
        ```
        {
            "name":"testUser",
            "email":"test@example.com",
            "age":24,
            "phone_no":"123456720",
            "password":"testpassAJ"
        }
        ```
    - **Response Code :** `201`

2. **Login-User**:
    - **HTTP Method :** `POST`
    - **Endpoint :** `/v1/login`
    - **Purpose :** logs in a user and returns JWT
    - **Request Body :**
        ```
        {
            "email":"test@example.com",
            "password":"testpassAJ"
        }
        ```
    - **Response Code :** `200`


3. **Get-User**:
    - **HTTP Method :** `GET`
    - **Endpoint :** `/auth/user`
    - **Purpose :** retrieves a logged in user's details
    - **Authentication :** JWT
    - **Request Body :** NA
    - **Response Code :** `200`


4. **Update-User**:
    - **HTTP Method :** `PUT`
    - **Endpoint :**  `/auth/user`
    - **Purpose :** updates a logged in user's details
    - **Authentication :** JWT
    - **Request Body :**
        ```
        {
            "name":"test",
            "old_password":"testpassAJ",
            "new_password":"testpass",
            "phone_no":"12345678"
        }
        ```
    - **Response Code :** `204`

5. **Delete-User**:
    - **HTTP Method :** `DELETE`
    - **Endpoint :**  `/auth/user`
    - **Purpose :** deletes a logged in user account
    - **Authentication :** JWT
    - **Request Body :** NA
    - **Response Code :** `204`

