# FancyTodo-server

**Show All Todo**
----
  Returns json data about all todos.

* **URL**

  /todos/

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `[{ id : 1, title : "makanan", description : "makanan enak sekali", status : false, due_date : 2020-01-13 },{...}]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `err`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
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

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ id : 1, title : "makanan", description : "makanan enak sekali", status : false, due_date : 2020-01-13 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "error not found" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```


**Create Todo**
----
  Create json data about a single todos.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**
 
  None

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
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
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
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
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

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ id : 1, title : "makanan", description : "makanan enak sekali", status : false, due_date : 2020-01-13 }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "error not found" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

