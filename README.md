# SQL Library Manager
 
Project Title:
SQL Library Manager

Features:
This app uses SqLite as a database to store and modify the information of the different books that exists in the virtual library. 
This app also uses express routing where different routes will serve different purposes such as updating, creating and deleting books.

How to Install:
1. Run npm install at the root folder
2. Run npm start
3. Visit localhost:3000/

Configuring config.json
1. Create config folder at the root folder
2. create config.json inside config folder
3. Add your username and password of postgressql like so:
```
{
    "development": {
      "username": "{username}",
      "password": "{password}",
      "database": "Library-app",
      "host": "localhost",
      "dialect": "postgres"
    },
    "test": {
        "username": "{username}",
        "password": "{password}",
        "database": "Library-app",
        "host": "localhost",
        "dialect": "postgres"
      },
      "production": {
        "username": "{username}",
        "password": "{password}",
        "database": "Library-app",
        "host": "localhost",
        "dialect": "postgres"
      }
  }
  ```