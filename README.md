![Version](https://img.shields.io/badge/Version-0.8.0-blue.svg?cacheSeconds=2592000)
![stabile](https://img.shields.io/badge/stabile-green.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/Documentation-In_Progress-yellow.svg)](https://example.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Hema2-official/Kozsegi_Krajcar/blob/main/LICENSE)
# Községi Krajcár
Községi Krajcár Rendszer (open source)

Egyszerű Krajcár számláló applikáció, bárkinek akik számolni szeretné.

3 verzió létezik: Az END USER build felhasználóknak, az ADMIN Build adminoknak (meglepő) és a SERVER BUILD ami kezeli az adatokat

Docs soon

## Készítők
👤 **AdyEndre (AdyStudios)**
* Website: currently down :(
* Github: [@AdyStudios](https://github.com/AdyStudios)
* Support: [Patreon](https://patreon.com/adystudios)
* Discord: AdyEndre#7784
* (AdyEndre írta a backend-et)

👤 **Hema2-official**
* Github: [@Hema2-official](https://github.com/Hema2-official)
* Support: -(hema2 csinálj support oldalt most 🔫)
* Webiste: (hema2 csinálj oldalt most 🔫🔫)
* Discord: Hema2#3601
* (Hema2 írta a frontend-et)


![image](https://user-images.githubusercontent.com/74962285/148696448-63dc6158-7e41-4c51-b298-a0a553005a58.png)
![image](https://user-images.githubusercontent.com/74962285/148696709-e24e904f-5957-46ef-9db5-58119981857a.png)

# 🤝 Közreműködés
  Közreműködést támogatjuk, ha problémád, kérdésed, panaszod, bánatod, kínod, keservet, siralmad van nyugodtan írj, vagy jelents hibát (Issue-t) itt, githubon!
# Használat
  Az index.js kezeli az összes felhasználót, viszont csak függvényeket tartalmaz. A függvényeket mi egy Discord bot segítségével érjük el (mainDc.js), de lehetne hozzá egy külön   GUI-t csinálni.
  A frontend-ért pedig a networkpost.js és a többi html fájl felelős. Az android applikáció csak egy webvierwer. A hostingot bárhol meg lehet oldani, mivel az url-t nem fogja     senki se látni (csak gépen), mi [heroku](https://www.heroku.com)-t használtuk.
  Az oldal automatikusan újratölt, ha a fájl változik. Az index.js pedig minden művelet előtt frissíti a JSON-t.
  A felhasználók a users.json fájl-ban vannak tárolva.

HA TUDSZ DOCS OLDALT ÍRD MEG KÖSZ :)
