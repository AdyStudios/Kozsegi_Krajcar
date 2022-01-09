# Kozsegi_Krajcar
Községi Krajcár Rendszer (open source)

Egyszerű Krajcár számláló applikáció, bárkinek akik számolni szeretné.

3 verzió létezik: Az END USER build felhasználóknak, az ADMIN Build adminoknak (meglepő) és a SERVER BUILD ami kezeli az adatokat

Docs soon

# Usage
Az index.js kezeli az összes felhasználót, viszont csak függvényeket tartalmaz. A függvényeket mi egy Discord bot segítségével érjük el (mainDc.js), de lehetne hozzá egy külön GUI-t csinálni.
A frontend-ért pedig a networkpost.js és a többi html fájl felelős. Az android applikáció csak egy webvierwer. A hostingot bárhol meg lehet oldani, mivel az url-t nem fogja senki se látni (csak gépen).
Az oldal automatikusan újratölt, ha a fájl változik. Az index.js pedig minden művelet előtt frissíti a JSON-t.
A felhasználók a users.json fájl-ban vannak tárolva.
