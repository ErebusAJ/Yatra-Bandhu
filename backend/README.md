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

6. **User-Password-Reset-Request**:
    - **HTTP Method :** `POST`
    - **Endpoint :**  `/v1/user/password-reset`
    - **Purpose :** verifies and sends a email with password reset link
    - **Authentication :** NA
    - **Request Body :** 
    ```
    {
        "email":"test@example.com
    }
    ```
    - **Response Code :** `200`

7. **User-Password-Reset-Confirm**:
    - **HTTP Method :** `POST`
    - **Endpoint :**  `/v1/user/password-reset/:token`
    - **Purpose :** updates users password with new one
    - **Authentication :** NA
    - **Request Body :** 
    ```
    {
        "new_password":"abc123"
    }
    ```
    - **Response Code :** `200`


### Travel Details
1. **Add-Travel-Details**:
    - **HTTP Method :** `POST`
    - **Endpoint :**  `/auth/travel-details`
    - **Purpose :** adds users options/details about trip
    - **Authentication :** JWT
    - **Request Body :** 
    ```
    {
        "place":"Switzerland",
        "start_date":"2025-02-15",
        "end_date":"2025-02-18",
        "trip_type":"Friends",
        "pets":false,
        "interests":["Hidden Gems", "Culutral", "Museums", "Theme Parks"]
    }
    ```
    - **Response Code :** `200`

2. **Get-Travel-Details**:
    - **HTTP Method :** `GET`
    - **Endpoint :**  `/auth/travel-details`
    - **Purpose :** retreives options/details about trip
    - **Authentication :** JWT
    - **Request Body :** NA
    - **Response Code :** `200`

### Travel Groups
1. **Create-Travel-Group**:
    - **HTTP Method :** `POST`
    - **Endpoint :**  `/travel-group`
    - **Purpose :** creates a travel group
    - **Authentication :** JWT
    - **Request Body :** 
    ```
    {
        "name":"Time Travellers",
        "description":"Enjoying life",
        "plan_id":"142ca6db-8f4e-4d31-a498-af792d56d8ea"
    }
    ```
    - **Response Code :** `200`

2. **Get-Users-Travel-Groups**
    - **HTTP Method :** `GET`
    - **Endpoint :**  `/travel-group/`
    - **Purpose :** retreives travel groups of user
    - **Authentication :** JWT
    - **Request Body :** NA
    - **Response Code :** `200` 


3. **Update-Travel-Group**:
    - **HTTP Method :** `PUT`
    - **Endpoint :**  `/travel-group/:groupID`
    - **Purpose :** updates a travel group
    - **Authentication :** JWT
    - **Request Body :** 
    ```
    {
        "name":"Time Travellers",
        "description":"Enjoying",
        "plan_id":"142ca6db-8f4e-4d31-a498-af792d56d8ea"
    }
    ```
    - **Response Code :** `204`

4. **Delete-Travel-Group**:
    - **HTTP Method :** `DELETE`
    - **Endpoint :**  `/travel-group/:groupID`
    - **Purpose :** deletes a travel group
    - **Authentication :** JWT
    - **Request Body :** NA
    - **Response Code :** `204`

5. **Add-Travel-Group-Member**:
    - **HTTP Method :** `POST`
    - **Endpoint :**  `/travel-group/:groupID/member/:userID`
    - **Purpose :** adds a user to travel group
    - **Authentication :** JWT
    - **Request Body :** 
    - **Response Code :** `200`

6. **Get-Travel-Group-Members-Details**
    - **HTTP Method :** `GET`
    - **Endpoint :**  `/travel-group/:groupID/member`
    - **Purpose :** retreives details of travel group members
    - **Authentication :** JWT
    - **Request Body :** NA
    - **Response Code :** `200`

7. **Delete-Travel-Group-Member**
    - **HTTP Method :** `DELETE`
    - **Endpoint :**  `/travel-group/:groupID/member/:userID`
    - **Purpose :** deletes a member from travel group
    - **Authentication :** JWT
    - **Request Body :** NA
    - **Response Code :** `204`


---
**Backend Developer:** @Aarya_Jamwal  

