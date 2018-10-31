THESIS IN PROGRESS


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
    
# memory-leaky:
kazda komponenta co pouziva .subscribe musi implementovat OnDestroy interface
a v OnDestroy lifecycle zavolat .unsubscribe, zatim to mam jen v employee edit komponente

# employee list
pridat mat-card ktera bude presmerovana na add-employee, to bude mit podobnou formu co edit, jen to bude posilat na jiny backend url aby se vytvoril employee :)
