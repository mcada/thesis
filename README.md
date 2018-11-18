# THESIS IN PROGRESS
Backend expects database called "coolDatabase" with preset collection
called "settings" with one document inside:

{
    "updated" : ISODate("2018-09-20T00:00:00.000Z"),
    "token" : "(nick:password).base64()"
}

updated - last time tasks were uploaded from jira
token - jira credentials, the result of string "nick:password" encoded into base64 format
    - for "nick:password" it would be "bmljazpwYXNzd29yZA=="
    - if you are brave enough, you can use https://www.base64encode.org/






### TODO:

#### backend
Add parameter for database connection URL so it can be inserted via template when starting the application

#### frontend
Change task-list to use presenter component, update design to allow changing
bonus points without opening task details