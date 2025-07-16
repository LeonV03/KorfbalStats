// Spelers per vak
let vakA = [
  { id: 1, naam: "Speler A1", shots: 0, goals: 0 },
  { id: 2, naam: "Speler A2", shots: 0, goals: 0 },
  { id: 3, naam: "Speler A3", shots: 0, goals: 0 },
  { id: 4, naam: "Speler A4", shots: 0, goals: 0 }
];

let vakB = [
  { id: 5, naam: "Speler B1", shots: 0, goals: 0 },
  { id: 6, naam: "Speler B2", shots: 0, goals: 0 },
  { id: 7, naam: "Speler B3", shots: 0, goals: 0 },
  { id: 8, naam: "Speler B4", shots: 0, goals: 0 }
];

let bank = [];

let actiefVak = "A"; // A of B
let geselecteerdeSpeler = null;

let aanvallenA = 0;
let aanvallenB = 0;

let doelpuntenSindsWissel = 0;

// Knoppen
const playersDiv = document.getElementById("players");
const vakInfo = document.getElementById("vakInfo");
const scoreInfo = document.getElementById("scoreInfo");
const switchVakBtn = document.getElementById("switchVak");
const goalBtn = document.getElementById("goalBtn");
const shotBtn = document.getElementById("shotBtn");
const subBtn = document.getElementById("subBtn");

function toonSpelers() {
  playersDiv.innerHTML = "";
  const spelers = actiefVak === "A" ? vakA : vakB;
  spelers.forEach(speler => {
    const btn = document.createElement("button");
    btn.textContent = speler.naam;
    btn.onclick = () => selecteerSpeler(speler.id);
    btn.className = geselecteerdeSpeler === speler.id ? "selected" : "";
    playersDiv.appendChild(btn);
  });
  vakInfo.textContent = `Actief vak: ${actiefVak}`;
  scoreInfo.textContent = `Aanvallen A: ${aanvallenA} | Aanvallen B: ${aanvallenB}`;
}

function selecteerSpeler(id) {
  geselecteerdeSpeler = id;
  toonSpelers();
}

function registreerSchot() {
  if (!geselecteerdeSpeler) {
    alert("Selecteer een speler.");
    return;
  }
  const spelers = actiefVak === "A" ? vakA : vakB;
  const speler = spelers.find(s => s.id === geselecteerdeSpeler);
  speler.shots += 1;
  alert(`${speler.naam}: Schot geregistreerd.`);
}

function registreerDoelpunt() {
  if (!geselecteerdeSpeler) {
    alert("Selecteer een speler.");
    return;
  }
  const spelers = actiefVak === "A" ? vakA : vakB;
  const speler = spelers.find(s => s.id === geselecteerdeSpeler);
  speler.shots += 1;
  speler.goals += 1;
  doelpuntenSindsWissel += 1;
  alert(`${speler.naam}: Doelpunt geregistreerd.`);
  if (doelpuntenSindsWissel >= 2) {
    wisselFuncties();
  }
}

function wisselFuncties() {
  alert("2 doelpunten gescoord. Functies wisselen.");
  actiefVak = actiefVak === "A" ? "B" : "A";
  doelpuntenSindsWissel = 0;
  geselecteerdeSpeler = null;
  toonSpelers();
}

function balNaarAnderVak() {
  if (actiefVak === "A") {
    aanvallenA += 1;
    actiefVak = "B";
  } else {
    aanvallenB += 1;
    actiefVak = "A";
  }
  geselecteerdeSpeler = null;
  toonSpelers();
}

function openWisselMenu() {
  alert("Hier kun je wissels implementeren.");
}

switchVakBtn.onclick = balNaarAnderVak;
goalBtn.onclick = registreerDoelpunt;
shotBtn.onclick = registreerSchot;
subBtn.onclick = openWisselMenu;

toonSpelers();
