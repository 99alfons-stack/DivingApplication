
Nummer		Beskrivning
## 7		När app besöks i webbläsaren ska din prototyp renderas med React

# Beskrivning av Krav 7
- react lösningen fungerar så att jag har en tom tom i min index.html som heter root
-samma fil laddar react startfilen i index.html
- I main.tsx mountas react i root med reactDom.
-den renderars huvudkomponenten App i main.tsx
-I App.tsx byggs själva prototypen upp med rutterna och mina sidkomponenter

## 8		React-trädet som renderas som ska bestå av minst 5st komponenter som du skrivit själv och som finns med i källkoden. (alla komponenter      behöver inte renderas samtidigt)

## Beskrivning av Krav 8
huvudträdet sätts upp i app.tsx där mina sidkomponenter hem, Karta, Loggbok, Forum och Profil syns i min navbar som alltid renderas

## 9		Dina React komponenter är skrivna med JSX syntaxen. 

# Beskrivning av Krav 9
Mina React-komponenter är skrivna i .tsx och använder JSX-syntax för att rendera både HTML-liknande element och egna komponenter, till exempel i App.tsx, Hem.tsx och BottomNav.tsx.

## 10	Minst två av dina komponenter ska hantera ett "event" i Javascript, exempelvis från användaren.

# Beskrivning av Krav 10
Jag uppfyller kravet genom att minst två komponenter hanterar användar-events i JavaScript, t.ex. onClick i Karta samt onSubmit och onChange i Loggbok och Forum.

## 11		Minst två av dina komponenter ska använda sig av state för att rendera tillståndsbaserad information. (i.e. "conditional rendering")

# Beskrivning av Krav 11
exempel i Karta (filtrering och visning av vald dykplats) och Forum/Loggbok (filtrerad lista, tomt läge och dialogens synlighet).

## 12		En av dina komponenter använder sig av en Lifecycle metod eller hook för att påverka en annan komponents tillstånd. Render räknas inte som en lifecycle metod.

# Beskrivning av Krav 12
 Jag använder hooks för att påverka en annan komponents tillstånd. Exempelvis i Dialog/Sheet där Trigger-komponenten anropar setOpen och därmed ändrar open-state i själva Dialog/Sheet-komponenten via context.

## 13	Via en av komponenterna ska användaren kunna spara information i LocalStorage.
# Beskrivning av Krav 13
Kravet är ännu inte uppfyllt eftersom appen i nuläget inte sparar någon information i LocalStorage.

## 14		Informationen i LocalStorage används vid renderingen av React-trädet.

# Beskrivning av Krav 14
Kravet är inte uppfyllt eftersom information från LocalStorage i nuläget inte läses in och används för att rendera komponenter i React-trädet.

## 15	I app används egen css, eller ett bibliotek för att ge dina komponenter stil och form

## Beskrivning av Krav 15
jag använder egen css i global layout annars anvädner jag Tailwind css.

## 16 I app används egen css för att ge dina komponenter rörelser
# Beskrivning av Krav 16
här använder jag inte egen css utan Tailwind css och får rörelse via klasserna 