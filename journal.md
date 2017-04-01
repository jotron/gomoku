## 23.2.17 - Python
Heute habe ich mich entschieden das Spielfeld als Liste zu programmieren.
Diese ist in vielen Fällen nämlich günstiger als eine Klasse mit Feldern als Objekten. Programmiert habe ich heute die Feldausgabe mittels for-schleifen und die Achsen beschriftungen mit Buchstaben.  

## 2.3.17 - Python
Heute habe ich den ganzen Input-Mechanismus programmiert. Allerdings ist mir bewusst geworden, dass es umständlich ist bei einem so grossen Feld (15x15) die Koordinaten anzugeben.  
Deshalb steige ich auf Javascript um und programmier das Spiel als Webseite.Ich habe noch keine Javascript-Erfahrung, beherrsche allerdings schon HTML und CSS. Bei Javascript erhoffe ich mir also eine lehrreiche Erfahrung.  

## 4.3.17 - Javascript
Damit die verbrachte Zeit mit Python nicht « umsonst » war, hole ich es zuhause nach die Feldausgabe und den Input zu programmieren. Javascript « lerne » ich auf <a href="http://w3schools.com">w3schools.com</a>. Abundzu schaue ich auch ein paar Stackoverflow-Fragen an wenn ich nicht weiterkomme. Zuerst habe ich das Feld als grosse HTML Tabelle gezeichnet. Dies erschien mir aber wenig elegant. Ich bin darum auf eine fast vollständig durch Javascript-DOM manipuierte Webseite umgestiegen. Die Felder und Reihen sind nur noch DIV’s. Auf ein grosses Problem bin ich getroffen als ich die Felder bei Klick’s färben wollte. Ich vermute, dass ich nämlich nicht auf « virtuelle » Elemente    mittels id oder class zugreifen kann. Ich gebe nun einfach direkt die kreierten elemente der click funktion weiter, das funktioniert ;).   Ich habe dieses Wochenende auch die Spielmodusabfrage mittels Javascript-prompt programiert. Des weiteren habe ich die Funktion angefangen die   testet ob jemand gewonnen hat, es funktioniert immerhin schon horizontal ;).
Nächstes mal:
    - vertikal und diagonal Sieg Test programmieren
    - css hover: felder verdunkeln sich wenn maus drüberschweift
    - Perfektionieren und Terminieren des Player vs. Player Modus

## 09.03.17
Zuerst habe ich erstaunlich lange gebraucht um zu implementieren, dass ein Feld nur einmal besetzt werden kann.  
Anschliessend habe ich die vertikale Sieg Test funktion geschrieben.  Zuhause habe ich dann die diagonale Sieg Test Funktion programmiert, was zwar unkompliziert war aber trotzdem unerwartet lange gebraucht hat.
Die nächsten Male:
    - Mit <http://github.hubspot.com/vex/docs/welcome/> eine schönere Siegerehrung und Modusauswahl
    - css hover: felder verdunkeln sich wenn maus drüberschweift
    - schönere Farben/Design

## 10.3.17
Heute habe ich das Anfangsmenü mit Vex, schlussendlich simple programmiert. Ich habe lange Zeit versucht ein Menü mit mehreren ehbenbürtigen Buttons zu erstellen, habe aber aufgegeben.

## 16.3.17
Heute habe ich das ganze mit 'vex' verworfen. Ich lasse lieber alles in Vanilla Javascript. Ich habe dementsprechend selber einen startbildschirm und endbildschirm programmiert. Soweit funktioniert das Programm einwandfrei. 

Was man am Schluss noch machen muss:

- check-funktion korrigieren (funktioniert mit manchen Feldern noch nicht)
- Schöneres design
- mobilfreundlicheres layout

Nächstes Mal:

- Gegner programmieren
- auf liquidforce.guru.ksz.ch hochladen...

## 23.3.17
Früher diese Woche habe ich mein Projekt auf liquidforce.guru.ksz.ch und GitHub hochgeladen.
Dies ist das erste Mal, dass ich Git aktiv benutze. 
In der Lektion habe ich den Hover Effekt im Css programmiert.
Zudem habe ich die diagonale Check-Funktion korrigiert.
Zuhause habe ich GitHub pages noch konfiguriert.

## 24.3.17
Heute habe ich einen Zufallsgegner implementiert.

Ongoing Tasks:

- "Fail"-GIF wenn Computer gewinnt
- Guter Gegner-Algorithmus
- schöneeres und mobilfreundlicheres Layout
    - insebesonders apple spezifisch (z.b App-Icon)
- Experimentieren mit Real-Time-Online-Modus

## 26.3.17
Heute habe ich den ersten richtigen Gegner-Algorithmus programmiert. Er basiert auf [Minimax](https://de.wikipedia.org/wiki/Minimax-Algorithmus) und [alpha-beta-pruning](https://de.wikipedia.org/wiki/Alpha-Beta-Suche). Dabei hat mir geholfen, dass ich früher schon einmal minimax bei Tic-tac-toe implementiert habe. Momentan denkt der Gegner vier Züge voraus. Die Bewertungfunktion unterscheidet lediglich Sieg, Niederlage und Unentschieden. Er rechnet allerdings ziemlich lange. Aus irgendeinem Grund rechnet er bei "schwierigen" Zügen einiges länger (bis zu 15s).

## 30.03.17
Heute habe ich an der AI gearbeitet. Nebenbei habe ich die Readme Datei vervollständigt.
