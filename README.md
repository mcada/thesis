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

#### dodelat potrebne metody pro kontrolery
    get employee tasks in date between <a,b>
    pridani/update tasku musi vyvolat prepocitani bodu v review pro dane obdobi

#### zjistit jestli potrebuji routu '/' v backendu

#### refactorovat startovani expressu a pripojovani k databazi
    - aby se to dalo jednoduse parametrizovat napr. z openshift template

# frontend
zjistit jak spravne nainstalovat service ktery pouziva httpclienta a vola
express nodejs server 
    - jak mit vice takovych servisu a parametrizovat URL
    - best practices pro data supplier?

vygenerovat komponenty

navrhnout defaultni rozlozeni komponent

naprogramovat spravne ziskavani dat z data provideru u komponent

vymyslet jednoduchy vzhled komponent

zjistit jake promenne budu potrebovat globalne
    - vymyslet kde je nastavim
        - na home page? specialni settings komponenta?

naucit se jak funguje datepicker componenta z angular material, bude se hodit

conditional css class to currently selected employee
    
# memory-leaky:
kazda komponenta co pouziva .subscribe musi implementovat OnDestroy interface
a v OnDestroy lifecycle zavolat .unsubscribe, zatim to mam jen v employee edit komponente

# employee list
pridat mat-card ktera bude presmerovana na add-employee, to bude mit podobnou formu co edit, jen to bude posilat na jiny backend url aby se vytvoril employee :)


# current employee store
misto predavani employee id udelat store ke kteremu pak budou mit
vsechny komponenty pristup
left side bar pak bude mit okynko kde budou nejake informace o momentalne
zvolenem employee, task-list a review componenty k tomu budou mit pristup
a podle toho zobrazi/zabarvi co bude treba ^^

