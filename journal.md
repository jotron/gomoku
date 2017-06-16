## 23.02.17 (Python)

Heute habe ich mich entschieden das Spielfeld als Liste zu programmieren.
Diese ist in vielen Fällen nämlich günstiger als eine Klasse mit Feldern als Objekten. Programmiert habe ich heute die "Feldausgabe" mittels for-schleifen und die Achsen-Beschriftungen mit Buchstaben.  

## 02.03.17 (Python)
Heute habe ich den ganzen Input-Mechanismus programmiert. Allerdings ist mir bewusst geworden, dass es umständlich ist bei einem so grossen Feld (15x15) die Koordinaten anzugeben.  
Deshalb steige ich auf Javascript um und programmiere das Spiel als Webseite. Ich habe noch keine Javascript-Erfahrung, beherrsche allerdings schon HTML und CSS. Bei Javascript erhoffe ich mir also eine lehrreiche Erfahrung.
Ein weiterer Vorteil von Javascript ist, dass mein Spiel dann Cross-Platform sein wird. Es wird dann wirklich aktiv "spielbar" sein.

## *04.03.17*
Damit die verbrachte Zeit mit Python nicht « umsonst » war, hole ich es zuhause nach, die Feldausgabe und den Input zu programmieren. Javascript « lerne » ich auf <a href="http://w3schools.com">w3schools.com</a>. Ich schaue einfach nach, wenn ich irgendetwas brauche. Ab und zu schaue ich auch ein paar Stackoverflow-Fragen an wenn ich nicht weiterkomme.
Zuerst habe ich das Feld als grosse HTML Tabelle gezeichnet. Dies erschien mir aber wenig elegant. Ich bin darum auf eine fast vollständig durch Javascript-DOM manipuierte Webseite umgestiegen. Die Felder und Reihen sind nur noch DIV’s. Auf ein grosses Problem bin ich getroffen als ich die Felder bei Klick’s färben wollte. Ich vermute, dass ich nämlich nicht auf « virtuelle » Elemente mittels id oder class zugreifen kann. Ich gebe nun einfach direkt die kreierten elemente der click funktion weiter, das funktioniert. Ich habe dieses Wochenende auch die Spielmodusabfrage mittels Javascript-prompt programiert. Des weiteren habe ich die Funktion angefangen die testet ob jemand gewonnen hat, es funktioniert immerhin schon horizontal ;).
Nächstes mal:

- Vertikale und Diagonal Sieg-Test-Funktion programmieren.
- CSS hover: Felder verdunkeln sich wenn die Maus darüber schweift.
- Perfektionieren und Terminieren des Player vs. Player Modus.

## 09.03.17
Zuerst habe ich erstaunlich lange gebraucht um zu implementieren, dass ein Feld nur einmal besetzt werden kann.  
Anschliessend habe ich die vertikale Sieg Test Funktion geschrieben.  Zuhause habe ich dann die diagonale Sieg-Test-Funktion programmiert, was zwar unkompliziert war aber trotzdem unerwartet lange gebraucht hat.
Die nächsten Male:

- Mit [Vex](http://github.hubspot.com/vex/docs/welcome/) eine schönere Siegerehrung und Modusauswahl.
- CSS hover: Felder verdunkeln sich wenn die Maus darüber schweift.
- Schönere Farben/Design

## *10.03.17*
Heute habe ich das Anfangsmenü mit Vex, schlussendlich simple programmiert. Ich habe lange Zeit versucht ein Menü mit mehreren ehbenbürtigen Buttons zu erstellen, habe aber aufgegeben.

## 16.03.17
Heute habe ich das ganze mit 'Vex' verworfen. Ich lasse lieber alles in Vanilla Javascript. Ich habe dementsprechend selber einen Startbildschirm und Endbildschirm programmiert. Soweit funktioniert das Programm einwandfrei.

Was man am Schluss noch machen muss:

- Check-funktion korrigieren (funktioniert mit manchen Feldern noch nicht)
- Schöneres design
- Mobilfreundlicheres layout

Nächstes Mal:

- Gegner programmieren
- auf liquidforce.guru.ksz.ch hochladen...

## 23.03.17
Früher diese Woche habe ich mein Projekt auf liquidforce.guru.ksz.ch und GitHub hochgeladen.
Dies ist das erste Mal, dass ich Git aktiv benutze. Git finde ich aber ebenfalls unkompliziert. Wenn ich einen speziellen Befehl brauch suche ich einfach im Web.
In der Lektion habe ich den Hover Effekt im CSS programmiert.
Zudem habe ich die diagonale Check-Funktion korrigiert.
Zuhause habe ich GitHub pages noch konfiguriert.

## *24.03.17*
Heute habe ich einen Zufallsgegner implementiert.

Ongoing Tasks:

- "Fail"-GIF wenn der Computer gewinnt.
- Guter Gegner-Algorithmus
- schöneres und mobilfreundlicheres Layout
    - insbesonders apple spezifisch (z.b App-Icon)
- Experimentieren mit Real-Time-Online-Modus

## *26.03.17*
Heute habe ich den ersten richtigen Gegner-Algorithmus programmiert. Er basiert auf [Minimax](https://de.wikipedia.org/wiki/Minimax-Algorithmus) und [alpha-beta-pruning](https://de.wikipedia.org/wiki/Alpha-Beta-Suche). Dabei hat mir geholfen, dass ich früher schon einmal minimax bei Tic-tac-toe implementiert habe. Momentan denkt der Gegner vier Züge voraus. Die Bewertungfunktion unterscheidet lediglich Sieg, Niederlage und Unentschieden. Er rechnet allerdings ziemlich lange. Aus irgendeinem Grund rechnet er bei "schwierigen" Zügen einiges länger (bis zu 15s).

## 30.03.17
Heute habe ich an der AI gearbeitet. Nebenbei habe ich die Readme Datei vervollständigt.

## 05.04.17
Heute habe ich den Algorithmus einigermassen brauchbar gemacht. Er verzweifelt jetzt in unmöglichen Situationen nicht mehr sondern spielt ins gefährlichste Feld.
Bei 2 Zügen voraus ohne Alpha-Beta-Pruning sind es bis zu 8000 Auswertungen.
Bei 2 Zügen mit Alpha-Beta-P. sind es noch 400.
Bei 4 Zügen mit ABP sind es min. 14000.
Interessant ist, das es scheint das der Code auf dem Server schneller läuft als auf dem Pc (unerklärlich). Vier Züge sind eigentlich optimal. Vier Züge gehen noch können aber eine Doppelfallse aushelbeln.
noch zu machende Verbesserungen am Algorithmus:
- Alpha-Beta-Pruning Zug-Sortierung.
- eher in die Mitte spielen als oben links.
- effizientere Auswertungsalgorithmus.

## 06.04.17
Heute in der Stunde habe ich das Verlierer-Gif eingebaut. Zudem habe ich angefangen den Gegner vorzugsweise in die Mitte spielen zu lassen.

## *08.04.17 (NODE.JS)*
Ich habe mich entschieden Node.js für die Berechnung und den Webserver zu verwenden. Node.js war für mich etwas ganz neues. Ich musste alles von Grund auf lernen.

Quellen:

- [Node.js Tutorial](https://blog.risingstack.com/node-hero-tutorial-getting-started-with-node-js/)
- [Express.js Offiziell](https://expressjs.com/de/starter/installing.html)
- Immer wieder Stackoverflow
- [Socket.io Offiziell](https://socket.io/get-started/chat/)

Schlussenlich habe ich es hingekriegt. Allerdings ist der Server schnell bei 100% CPU.

## *16.04.17*
Ich habe erstens validator.js implementiert. Ich hoffe mein System ist jetzt einigermassen sicher.
Ausserdem arbeite ich an einer besseren & effizienteren Check Funktion.

## *21.04.17*

Erstens habe ich die check-Funktion stark vereinfacht und optimiert. Nun werden nur noch die vom Zug betroffenen Felder überprüft.  Zweitens wurde der gesamte Algorithmus korrigiert.

## *27.04.17*

Ich habe einen alternativen Algorithmus ausprobiert. Dieser denkt überhaupt nicht voraus, ist aber trotzdem ziemlich schwer zu schlagen.
Kennengelernt habe ich den Algorithmus schon vor Jahren. Er ist in Emacs vorinstalliert.
- [Algorithmusquelle](https://github.com/typester/emacs/blob/master/lisp/play/gomoku.el)

## 04.05.17
Heute habe ich auf dem SchulPC NodeJs installiert. Anschliessend habe ich versucht den Qtupple-Algorithmus zu korrigieren.
Zuhause habe ich es schlussendlich auch geschafft. Zum Schluss habe ich einen merge zwischen Master und Qtupple-Approach gemacht mit 3 Optionen.

Zuhause habe ich auch noch den Qtupple-Algorithmus verändert. Ich habe mir gedacht, dass er zwischen 2-seitigen Dreiern und einseitigen unterscheiden sollte. Zweiseitige Dreiert sind sehr gefährlich bzw. Wertvoll und einseitige nicht.
Es hat sich allerdings als schwierig herausgestellt herauszufinden ob das Programm neu wirklich stärker ist.
Ich verschiebe diese Reflektion auf später.

## 11.05.17

Heute habe ich das Design komplett neu überarbeitet. Ich somit auch gleich weg gemacht für den Real-Time-Online Modus. Zum Design inspieriert hat mich teils das wenig bekannte IOS Spiel TEN.

Ein Problem was mich auserordentlich gestört hat ist, dass wenn z.b im 4. Quadrant mehr Text war als im 3, der Dritte aus irgendeinem Grund an Höhe verlor...

Ich denke dass es daran lag, dass der 3. Quadrant sich vertikal mit dem "vergrösserten" 4.Quadrant anpasste. Dieser Code Umgang das Problem.

```css
button {
  vertical-align:top;
}
```



## 18.05.17

Während der Woche habe ich die Dateistruktur leicht vereinfacht. Ausserdem habe ich die Einleitung zu meiner Projekt-Arbeit geschrieben. Zum Schluss habe ich ebenfalls das Journal überarbeitet.

Ausserdem habe ich die Benutzerfreundlichkeit erhöht.
Ich habe zum Beispiel deaktiviert das man den "Text" auswählen kann. ([Stackoverflow](https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting-using-css))

In der Lektion habe ich versucht den Code übersichtlicher zu machen. Ich habe die grosse *pclick()* Funktion durch 3 kleiner Funktionen für je einen Modus ersetzt.

Zu Tun ist die nächsten Male noch: Realtime-Online-Modus, besserer Minimax-Algorithmus, bessere "Abschluss-Animation" (Bei Sieg), höhere Mobilfreundlichkeit (z.b Zoom).

Nach der Lektion zuhause habe ich dann versucht den Minimax-Algorithmus zu optimieren. Ich habe mir überlegt, dass er, wenn Wert != 0 ist, nicht mehr tiefer suchen muss. Es braucht also eine variable Suchtiefe.
Ich steigere die Suchtiefe graduell. Dieses eventuell ünnotige anfängliche Suchen verlängert die Laufzeit nie um mehr als 0.45%.

Zudem habe ich ein Problem behoben bei dem der Sieg mehrfach verkündet wurde. Das Problem lag daran das Node-Events mehrfach angehängt wurden. ([Stackoverflow](https://stackoverflow.com/questions/17057455/socket-io-firing-multiple-events)).

## *26.05.17*

Heute habe ich erstens die *declarewinner* Funktion verlangsamt und dann den Minimax Algorithmus verbessert. Ich sortiere die Felder nach der Qtupple-Bewertung. Zum sortieren haben mir [Stackoverflow](https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n) und [W3Schools](https://www.w3schools.com/jsref/jsref_sort.asp) geholfen. Wenn der Minimax-Algorithmus zu keiner schlauen Lösung kommt, spielt er einfach den Qtupple-Algorithmus.

## 01.06.17
Heute habe ich am Online-Modus gearbeitet. Es wird bereits angezeigt wie viele Personen gleichzeitig online sind.
Wenn zuum Beispiel 2 Leute Online sind & warten, dann wird choice(Onlinemode) ausgeführt.
Zudem habe ich ein wenig Code eingespart bei der Modus-Vergabe.

## 08.06.17
Heute habe ich grösstenteils Code kommentiert. Während der Woche hatte ich noch den Onlinemodus spielbar gemacht. Dieser hat zwar noch einige Fehler (man kann Felder 2 mal spielen + Eine 3 Person bringt alles durcheinander) aber funktioniert grundsätzlich.

## *10.06.17*

Heute habe ich den Code fertig kommentiert. Ich habe das kleine Problem behoben, dass man auf Felder 2 mal spielen konnte. Zudem habe ich an der Readme datei gearbeitet.

## 10.06.17 - Fazit

Ich bin mit dem Ergebnis des Gegner-Algorithmus grundsätzlich zufrieden. Das Design des Spiels ist meiner meinung nach auch ansprechend. 
Was ich bereue, ist, dass man den Algorithmus immer noch unter gewissen Bedingungne schlagen kann. Hätte ich noch ein wenig Zeit würde ich versuchen dieses Konzept [*Go-Moku and Threat-Space Search*](https://web.archive.org/web/20140411074912/http://chalmersgomoku.googlecode.com/files/allis1994.pdf) zu implementieren. 
