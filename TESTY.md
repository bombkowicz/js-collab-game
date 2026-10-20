# Protokół testów – Zespół JS Collab Game

| Próba | Wynik oczekiwany | Wynik otrzymany | Kto sprawdzał |
| :--- | :--- | :--- | :--- |
| Wpisanie `mapa()` na starcie | 4 pokoje, tylko 1 zaznaczony znacznik | Zgodny (Pokazuje Recepcję z markerem) | [Twoje Imię] |
| Ruch `idz("lewo")` z pokoju 1 | Komunikat o ścianie, dane i energia bez zmian | Zgodny (Pokój 1, energia nadal 10) | [Imię Kolegi] |
| Wpisanie `idz("gora")` | Komunikat o nieznanym kierunku, brak zmian | Zgodny (Wskazówka o prawo/lewo) | [Twoje Imię] |
| Ruch `idz("prawo")` z pokoju 1 | Przesunięcie o jeden pokój, koszt 1 energii | Zgodny (Pokój 2, energia 9) | [Imię Kolegi] |
| Dwukrotne wpisanie `akcja("karta")` | Za 1. razem zabiera, za 2. razem błąd i brak kosztu | Zgodny (Karta: TAK, energia 9) | [Twoje Imię] |
| Próba `akcja("napraw")` bez bezpiecznika | Komunikat o braku przedmiotu, brak kosztu energii | Zgodny (Zasilanie: BRAK, energia bez zmian) | [Imię Kolegi] |
| Próba `akcja("wyjdz")` bez wymagań | Komunikat o blokadzie drzwi, brak kosztu | Zgodny (Drzwi zamknięte) | [Twoje Imię] |
| Pełne przejście gry (Scenariusz sukcesu) | Wygrana komunikatem, zablokowanie dalszych akcji | Zgodny (Komunikat o wygranej) | [Imię Kolegi] |
| Wykonanie 10 poprawnych ruchów bez wygranej | Porażka po 10. ruchu, brak możliwości zmian | Zgodny (Komunikat o końcu energii) | [Twoje Imię] |
