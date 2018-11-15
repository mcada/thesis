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





todo list:

#### validace metod kontroleru
    - update neresi jestli neco udelal nebo nebo ne
    - zajistit aby sly provadet jen safe operace
        - ACID

#### zjistit jestli potrebuji routu '/' v backendu

#### refactorovat startovani expressu a pripojovani k databazi
    - aby se to dalo jednoduse parametrizovat napr. z openshift template

# frontend

conditional css class to currently selected employee

sorting of reviews is only by points - when two ppl have the same points, its random so it changes randomly on clicks


