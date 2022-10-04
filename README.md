# Anleitung

## Für Benutzer:

Auf der gewünschten Seite binden Sie den link in den Header ein:

<link
  href="https://cdn.jsdelivr.net/gh/pfotendoctor/pfotendoctor-clinic-finder-widget@main/docs/indexV3.css"
  rel="stylesheet"
/>

Nun an die gewünschte Stelle auf der Seite das widget einfügen:

<div
  className="clinic_finder_widget"
  data-latitude="52.520008"
  data-longitude="13.404954"
  data-clinicname=“Ihre “Tierklinik
  data-provided-at=“external”
></div>

data-latitude/ data-longitude: 
Es ist wichtig, dass sie die genauen Koordinaten ihrer Klinik angeben! (data-latitude, data-latitude)
Diese lassen sich via google maps leicht herausfinden (https://support.google.com/maps/answer/18539?hl=de&co=GENIE.Platform%desktop).

data-clinicname: Name ihrer Tierklinik, welche als Tooltip auf Ihren Marker erscheint.

className, data-provided-at: Bitte so beibehalten.

Script unterhalb des widgets einfügen:

<Script src="https://cdn.jsdelivr.net/gh/pfotendoctor/pfotendoctor-clinic-finder-widget@main/docs/indexV3.js"></Script>

## Für Pfotendoctor:

Wie Benutzer: 
1. Link einbinden
2. Widget einbinden
3. Script einbinden

data-provided-at=“Pfotendoctor”. 
data-clinicname=“Pfotendoctor”

Ansonsten alles beibehalten. 

Github: https://github.com/pfotendoctor/pfotendoctor-clinic-finder-widget

Bei Änderungen am Widget:

Optional:  yarn prettier --write .
Wichtig: npm run build:widget

Es wird eine minified JS/CSS file im Ordner “docs” erstellt bzw. überschrieben.  
Committen & pushen

Falls Änderungen schnellstmöglich live gehen sollen im Browser einfach einer der folgenden Dinge ausführen: 

https://purge.jsdelivr.net/gh/pfotendoctor/pfotendoctor-clinic-finder-widget@main/docs/index.js
https://purge.jsdelivr.net/gh/pfotendoctor/pfotendoctor-clinic-finder-widget@main/docs/index.css
Bei Bildern: https://purge.jsdelivr.net/gh/pfotendoctor/pfotendoctor-clinic-finder-widget@main/docs/image.svg

