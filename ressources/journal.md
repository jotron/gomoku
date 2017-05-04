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

## 5.4.17
Heute habe ich den Algorithmus einigermassen brauchbar gemacht. Er verzweifelt jetzt in unmöglichen Situationen nicht mehr sondern spielt ins gefährlichste Feld.
Bei 2 Zügen voraus ohne Alpha-Beta-Pruning sind es bis 8000 Auswertungen.
Bei 2 Zügen mit Alpha-Beta-P. sind es noch 400.
Bei 4 Zügen mit ABP sind es min. 14000.
Interessant ist, das es scheint das der Code auf dem Server schneller läuft als auf dem Pc (unerklärlich). Vier Züge sind eigentlich optimal. Vier Züge gehen noch können aber eine Doppelfallse aushelbeln.
noch zu machende Verbesserungen am Algorithmus:
- Alpha-Beta-Pruning Zug-Sortierung.
- eher in die Mitte spielen als oben links.
- effizientere Auswertungsalgorithmus.

## 06.04.17
Heute in der Stunde habe ich Verlierer-Gif eingebaut. Zudem habe ich angefangen den Gegner vorzugsweise in die Mitte spielen zu lassen.

## 08.04.17 - NODE JS
Node.js war für mich etwas ganz neues. Ich musste alles von Grund auf lernen.

Quellen:

- [Node.js](https://blog.risingstack.com/node-hero-tutorial-getting-started-with-node-js/)
- [Express.js](https://expressjs.com/de/starter/installing.html)
- Immer wieder Stackoverflow
- [Socket.io](https://socket.io/get-started/chat/)

Schlussenlich habe ich es hingekriegt. Allerdings ist der Server schnell bei 100% CPU.

## -16.04.17
Ich habe erstens validator.js implementiert. Ich hoffe mein System ist jetzt einigermassen sicher.
Ausserdem arbeite ich an einer besseren & effizienteren check Funktion.

## -21.04.17

Erstens habe ich die check-Funktion stark vereinfacht und optimiert. Nun werden nur noch die vom Zug betroffenen Felder gecheckt.  Zweitens wurde der gesamte Algorithmus korrigiert.

## -27.04.17

Ich habe einen alternativen Algorithmus ausprobiert. Dieser denkt überhaupt nicht voraus, ist aber trotzdem ziemlich schwer zu schlagen.
Kennengelernt habe ich den Algorithmus schon vor Jahren. Er ist in Emacs vorinstalliert.
- [Algorithmusquelle](https://github.com/typester/emacs/blob/master/lisp/play/gomoku.el)
- Algemeine [Quelle](https://web.archive.org/web/20140411074912/http://chalmersgomoku.googlecode.com/files/allis1994.pdf) die mir zum Verständniss des Spiels geholfen hat

## 4.05.17
Heute habe ich auf dem SchulPC NodeJs installiert. Anschliessend habe ich versucht den qtupple-algorithmus zu korrigieren.