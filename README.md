# Software support for financial evaluation

The application helps managers to evaluate tasks of their employees,
save feedback reviews for selected periods and compare the results
between employees for easier financial bonus distribution. The tasks
of employees are loaded from JIRA or can be added manually.

The application uses MEAN stack - MongoDB, Express.js, Angular and Node.js.

# Backend

Backend works as API endpoint for frontend and persists data in cooperation with MongoDB.

### Database setup
Backend expects database collection called "settings" with one document inside:

```
{
    "updated" : ISODate("2018-09-20T00:00:00.000Z"),
    "token" : "(nick:password).base64()"
}
```

updated

  * last time tasks were uploaded from jira

token
  * jira credentials, the result of string "nick:password" encoded into base64 format

  * for string "nick:password" it would be "bmljazpwYXNzd29yZA=="

  * to encode your nick and password you can use linux command `base64`


### Backend expects 3 variables:

DATABASE

  * url of mongoDB, default is `mongodb://localhost:27017/coolDatabase`

PORT

  * port to deploy express server, default is `4000`

PROJECT

  * jira project to load tasks from

### Run backend for development purposes
Install the node project and run it with desired variables.

Example: `PROJECT=FUSEQE DATABASE=mongodb://localhost:27017/coolDatabase PORT=4000 npm run dev`

# Frontend

Frontend is angular 6 application, which is connected to backend express server.

### Frontend variables

backendUrl
  * URL where backend runs, default is `http://localhost:4000/`

  * set backendUrl here: `./frontend/src/environments/environment.ts`

### Run frontend for development purposes
Install the angular project and run it with `ng serve -o`








# Future features
  * Allow tasks to be loaded and parsed from google document

  * Add dynamic filter to task list view