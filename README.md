# FancyTodo-server

* **BASE URL**

  LOCAL - localhost:3000/
  HEROKU - https://fancytodo-server.herokuapp.com/

**Show All Todo**
----
  Returns json data about all todos.

* **URL**

  /todos/

* **Method:**

  `GET`
  
*  **Headers Params**
  
   **Required:**

  `accessToken=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[{ id : 1, title : "makanan", description : "makanan enak sekali", status : false, due_date : 2020-01-13 },{...}]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `err`

* **Sample Call:**

  ```javascript
    $.ajax({
        method: 'GET',
        url: baseUrl + '/todos',
        headers: {
          accessToken: localStorage.token
        }
    })

  ```

**Show Todo**
----
  Returns json data about a single todos.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`
  
*  **Headers Params**
  
   **Required:**

  `accessToken=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ id : 1, title : "makanan", description : "makanan enak sekali", status : false, due_date : 2020-01-13 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "error not found" }`

* **Sample Call:**

  ```javascript
    $.ajax({
        method: 'GET',
        url: baseUrl + '/todos/' + id,
        headers: {
            accessToken: localStorage.token
        }
    })

  ```


**Create Todo**
----
  Create json data about a single todos.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **Headers Params**
  
   **Required:**

  `accessToken=[token]`

* **Data Params**

   **Required:**

  `req.body`

* **Success Response:**

  * **Code:** 201 CREATED <br />
    **Content:** `{ id : 1, title : "makanan", description : "makanan enak sekali", status : false, due_date : 2020-01-13 }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Input cannot be empty " }`

* **Sample Call:**

  ```javascript
    $.ajax({
        method: 'POST',
        url: baseUrl + '/todos',
        headers: {
            accessToken: localStorage.token
        },
        data
    })

  ```


**Update Todo**
----
  Update json data about a single todos.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  `req.body`
  
*  **Headers Params**
  
   **Required:**

  `accessToken=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ id : 1, title : "makanan", description : "makanan enak sekali", status : false, due_date : 2020-01-13 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "error not found" }`

OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Input cannot be empty " }`

* **Sample Call:**

  ```javascript
    let try = {
      
      $.ajax({
          method: 'PUT',
          url: baseUrl + '/todos/' + id,
          headers: {
              accessToken: localStorage.token
          },
          data
      })
  ```


**Delete Todo**
----
  Delete json data about a single todos.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

  
*  **Headers Params**
  
   **Required:**

  `accessToken=[token]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ id : 1, title : "makanan", description : "makanan enak sekali", status : false, due_date : 2020-01-13 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "error not found" }`

* **Sample Call:**

```javascript
  $.ajax({
      method: 'DELETE',
      url: baseUrl + '/todos/' + id,
      headers: {
          accessToken: localStorage.token
      }
  })
  ```

  **Login User**
----
  Login registered user.

* **URL**

  /users/login

* **Method:**

  `POST`

* **Data Params**

   **Required:**
 
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ accesstoken : xyz }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "User not found" }`

* **Sample Call:**

```javascript
  $.ajax({
      method: 'POST',
      url: baseUrl + '/users/login',
      data: { email, password }
  })
  ```

  **Register User**
----
  Register new user.

* **URL**

  /users/register

* **Method:**

  `POST`
  
* **Data Params**

   **Required:**
 
   `email=[string]`
   `password=[string]`

* **Success Response:**

  * **Code:** 201 OK <br />
    **Content:** `{ message : Register Successful, Please Login }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Email Already Exists" }`

* **Sample Call:**

```javascript
  $.ajax({
      method: 'POST',
      url: baseUrl + '/users/register',
      data: { email, password }
  })
  ```

**Register / Login Google User**
----
  Register new user if it's not yet exist, Login user if it's already exist.

* **URL**

  /users/googleSign

* **Method:**

  `POST`

* **Data Params**

   **Required:**
 
   `id_token=[string]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ message : User Logged In }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

* **Sample Call:**

```javascript
  $.ajax({
      method: 'POST',
      url: baseUrl + '/users/googleSign',
      data: {
          id_token
      }
  })
  ```

**Show Holiday API**
----
  Show Holiday json data from calendarific API.

* **URL**

  /api/calendarificID/ + year

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `year=[integer]`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `"holidays": [
            {
                "name": "New Year's Day",
                "description": "New Year’s Day is the first day of the year, or January 1, in the Gregorian calendar.",
                "country": {
                    "id": "id",
                    "name": "Indonesia"
                },
                "date": {
                    "iso": "2020-01-01",
                    "datetime": {
                        "year": 2020,
                        "month": 1,
                        "day": 1
                    }
                },
                "type": [
                    "National holiday"
                ],
                "locations": "All",
                "states": "All"
            },
            `
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message : "Internal Server Error" }`

* **Sample Call:**

```javascript
  $.ajax({
      method: 'GET',
      url: baseUrl + '/api/calendarificID/' + year,
      beforeSend: function() {
          $(".lds-grid").show();
      },
      success: function(data) {
          $(".lds-grid").hide();
      }
  })
  ```
