// ==========================================
// STARTER GRY - ZMIENNE GLOBALNE (NIE RUSZAĆ)
// ==========================================
const MAKS_ENERGIA = 10;
let pokoj = 1;
let energia = 10;
let karta = false;
let bezpiecznik = false;
let zasilanie = false;
let koniec = false;
let wygrana = false;

function start() {
  pokoj = 1;
  energia = MAKS_ENERGIA;
  karta = false;
  bezpiecznik = false;
  zasilanie = false;
  koniec = false;
  wygrana = false;
  console.clear();
  console.log("=== GRA ROZPOCZĘTA ODKAŻA ===");
  pomoc();
  rozejrzyj();
}

function zakonczTure() {
  energia--;
  if (wygrana && koniec) {
    console.log("=== GRATULACJE! WYGRYWASZ GRĘ! ===");
    return;
  }
  if (energia <= 0) {
    koniec = true;
    console.log("=== KONIEC ENERGII. PRZEGRYWASZ! Wpisz start(), aby spróbować ponownie. ===");
  } else {
    console.log("Pozostała energia awaryjna: " + energia);
  }
}

// ==========================================
// SEKCJA A - MAPA, NAZWY I INFORMACJE (Osoba A)
// ==========================================
function pomoc() {
  console.log("Dostępne komendy:");
  console.log("  pomoc()        - Wyświetla tę listę zasad");
  console.log("  status()       - Pokazuje Twój aktualny stan i ekwipunek");
  console.log("  mapa()         - Wyświetla prostą mapę korytarza");
  console.log("  rozejrzyj()    - Sprawdza, co znajduje się w obecnym pokoju");
  console.log("  idz('prawo')   - Przejście do kolejnego pokoju (Koszt: 1 energii)");
  console.log("  idz('lewo')    - Powrót do poprzedniego pokoju (Koszt: 1 energii)");
  console.log("  akcja('nazwa') - Wykonanie akcji w pokoju (Koszt: 1 energii)");
  console.log("Reguła: Każdy udany ruch i akcja kosztują 1 jednostkę energii!");
}

function nazwaPokoju(numer) {
  switch (numer) {
    case 1: return "Recepcja";
    case 2: return "Magazyn";
    case 3: return "Serwerownia";
    case 4: return "Wyjscie";
    default: return "Nieznane pomieszczenie";
  }
}

function mapa() {
  console.log("--- MAPA KORYTARZA ---");
  for (let numer = 1; numer <= 4; numer++) {
    if (numer === pokoj) {
      console.log(numer + ". " + nazwaPokoju(numer) + " <-- JESTEŚ TUTAJ");
    } else {
      console.log(numer + ". " + nazwaPokoju(numer));
    }
  }
}

function status() {
  console.log("--- STATUS GRACZA ---");
  console.log("Pozycja: " + nazwaPokoju(pokoj) + " (Pokój " + pokoj + ")");
  console.log("Energia: " + energia + " / " + MAKS_ENERGIA);
  console.log("Karta dostępu: " + (karta ? "TAK" : "NIE"));
  console.log("Bezpiecznik w kieszeni: " + (bezpiecznik ? "TAK" : "NIE"));
  console.log("Zasilanie sieciowe: " + (zasilanie ? "DZIAŁA" : "BRAK"));
  console.log("Stan gry: " + (koniec ? (wygrana ? "WYGRANA" : "PORAŻKA") : "W TOKU"));
  console.log("----------------------");
}

function rozejrzyj() {
  console.log("Rozglądasz się po pomieszczeniu: " + nazwaPokoju(pokoj));
  switch (pokoj) {
    case 1:
      console.log(karta ? "Puste biurko." : "Na biurku leży karta dostępu. Wpisz: akcja('karta')");
      break;
    case 2:
      console.log((!bezpiecznik && !zasilanie) ? "Na półce leży zapasowy bezpiecznik. Wpisz: akcja('bezpiecznik')" : "Puste półki.");
      break;
    case 3:
      console.log(zasilanie ? "Diody migają na zielono. Zasilanie przywrócone!" : "Ciemno. Główny bezpiecznik jest spalony. Wpisz: akcja('napraw')");
      break;
    case 4:
      console.log("Elektroniczne drzwi wyjściowe. Wymagają karty i zasilania. Wpisz: akcja('wyjdz')");
      break;
  }
}

// ==========================================
// SEKCJA B & C - RUCH I AKCJE (Osoba B i C)
// ==========================================
function idz(kierunek) {
  if (koniec) {
    console.log("Gra się skończyła. Wpisz start(), aby zagrać ponownie.");
    return;
  }

  let nastepnyPokoj = pokoj;
  if (kierunek === "prawo") {
    nastepnyPokoj = nastepnyPokoj + 1;
  } else if (kierunek === "lewo") {
    nastepnyPokoj = nastepnyPokoj - 1;
  } else {
    console.log("Nieznany kierunek! Wpisz idz('prawo') lub idz('lewo').");
    return;
  }

  if (nastepnyPokoj < 1 || nastepnyPokoj > 4) {
    console.log("Uderzasz w ścianę! Nie możesz iść dalej.");
    return;
  }

  pokoj = nastepnyPokoj;
  rozejrzyj();
  zakonczTure();
}

function akcja(co) {
  if (koniec) {
    console.log("Gra się skończyła. Wpisz start(), aby resetować.");
    return;
  }

  switch (co) {
    case "karta":
      if (pokoj !== 1 || karta) {
        console.log("Tutaj nie ma karty do zabrania.");
        return;
      }
      karta = true;
      console.log("Zabierasz kartę z biurka.");
      break;

    case "bezpiecznik":
      if (pokoj !== 2 || bezpiecznik || zasilanie) {
        console.log("Tutaj nie ma bezpiecznika do zabrania.");
        return;
      }
      bezpiecznik = true;
      console.log("Zabierasz bezpiecznik z półki.");
      break;

    case "napraw":
      if (pokoj !== 3 || !bezpiecznik || zasilanie) {
        console.log("Nie możesz naprawić. Musisz być w serwerowni i mieć bezpiecznik.");
        return;
      }
      bezpiecznik = false;
      zasilanie = true;
      console.log("Montujesz bezpiecznik. Zasilanie serwerowni działa!");
      break;

    case "wyjdz":
      if (pokoj !== 4 || !karta || !zasilanie) {
        console.log("Drzwi są zablokowane. Potrzebujesz karty i działającego zasilania.");
        return;
      }
      wygrana = true;
      koniec = true;
      console.log("Używasz karty. Drzwi się otwierają! WYGRANA!");
      break;

    default:
      console.log("Nieznana akcja! Dozwolone: 'karta', 'bezpiecznik', 'napraw', 'wyjdz'.");
      return;
  }

  zakonczTure();
}


start();