# Five-in-a-row with Javascript
Mein Informatikprojekt ist ein Fünf-gewinnt Spiel zu programmieren inklusive Gegner.
Zuerst war vorgesehen alles in Python zu programmieren und in der Konsole laufen zu lassen.
Inspierirt dazu hatte mich das "Gomoku" (Japanischer Name des Spiels), welches in Emacs verfügbar ist.

Es ist mir allerdings schnell klar geworden, dass das Spiel in der Konsole ziemlich umständlich zu bedienen ist. Das Spiel mit Pfeiltasten zu bedienen wie in der Emacs-Version wäre eine Lösung gewesen aber ich fand es zu schwierig zu implementieren. 
Darum habe ich schnell auf eine Web basierte Variante gewechselt. Die Vorteile sind eine schönere Benutzeroberfläche und die Möglichkeit das Spiel öffentlich verfügbar zu machen. Als Programmiersprache verwende ich dann hauptsächlich Javascript.

Zuerst war mein Ziel beim Projekt vor allem einen schlauen Gegner zu programmieren.
Nachdem aber meine Klassenkameraden immer mehr angefangen haben das Spiel ebenfalls zu spielen habe ich auch die Benutzerfreundlichkeit (insbesonders auf dem iPhone) als eine meiner Prioritäten gesetzt.

Am Ende meines Projekts habe ich auch noch einen Online-Modus implementiert. In diesen Modus habe ich nicht viel Zeit investiert, da er für mich keine Priorität hatte. Er dient einfach dem Spass, um mit anderen Leuten einfacher spielen zu können.

Die Ziele sind also wie folgt:

- Man kann ganz einfach zu zweit (Mensch gegen Mensch) eine Partie spielen.
- Man kann gegen den Computer spielen.
- Der Computer-Gegner ist schwer zu schlagen.
- Das Spiel ist angenehm zu bedienen und mobilfreundlich.


Das Journal zum Projekt kann man [hier](journal.md) lesen.
Updates zum Projekt und die aktuellste Version findet man immer auf dem [Github-Repository](https://github.com/jotron/gomoku)

## Setup

Das Projekt läuft mit Node.js (*npm start*). Benötigte npm-Pakete sind *socket.io*, *validator* und *express*.
