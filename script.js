let spelers = JSON.parse(localStorage.getItem("spelers")) || [];
let actiefVak = "A"; // wisselt tussen A en B
let aanvallen = { A: 0, B: 0 };
let doelpuntenTeller = 0;

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("wedstrijd.html")) {
    initWedstrijd();
  } else {
    initSetup();
  }
});

function initSetup() {
  const playerNameInput = document.getElementById("playerName");
const addPlayerBtn = document.getElementById("addPlayerBtn");
const playerList = document.getElementById("playerList");
const vakAanval = document.getElementById("vakAanval");
const vakVerdediging = document.getElementById("vakVerdediging");
const vakWissels = document.getElementById("vakWissels");
const startGameBtn = document.getElementById("startGameBtn");

let spelers = [];

addPlayerBtn.onclick = () => {
  const naam = playerNameInput.value.trim();
  if (!naam) return;
  const id = Date.now();
  spelers.push({ id, naam, vak: null });
  playerNameInput.value = "";
  toonSpelers();
};

function toonSpelers() {
  playerList.innerHTML = "";
  spelers.forEach(speler => {
    const li = document.createElement("li");
    li.textContent = speler.naam;
    const btnAanval = document.createElement("button");
    btnAanval.textContent = "Aanvalsvak";
    btnAanval.onclick = () => toewijzen(speler.id, "aanval");
    const btnVerdediging = document.createElement("button");
    btnVerdediging.textContent = "Verdedigingsvak";
    btnVerdediging.onclick = () => toewijzen(speler.id, "verdediging");
    const btnWissel = document.createElement("button");
    btnWissel.textContent = "Wissels";
    btnWissel.onclick = () => toewijzen(speler.id, "wissel");
    li.appendChild(btnAanval);
    li.appendChild(btnVerdediging);
    li.appendChild(btnWissel);
    playerList.appendChild(li);
  });

  toonVakken();
  controleerStartknop();
}

function toewijzen(id, vak) {
  spelers = spelers.map(speler => {
    if (speler.id === id) return { ...speler, vak };
    return speler;
  });
  toonSpelers();
}

function toonVakken() {
  vakAanval.innerHTML = "";
  vakVerdediging.innerHTML = "";
  vakWissels.innerHTML = "";

  spelers.forEach(speler => {
    const li = document.createElement("li");
    li.textContent = speler.naam;
    if (speler.vak === "aanval") vakAanval.appendChild(li);
    else if (speler.vak === "verdediging") vakVerdediging.appendChild(li);
    else if (speler.vak === "wissel") vakWissels.appendChild(li);
  });
}

function controleerStartknop() {
  const aanvalCount = spelers.filter(s => s.vak === "aanval").length;
  const verdedigingCount = spelers.filter(s => s.vak === "verdediging").length;
  if (aanvalCount === 4 && verdedigingCount === 4) {
    startGameBtn.disabled = false;
  } else {
    startGameBtn.disabled = true;
  }
}

startGameBtn.onclick = () => {
  // Hier kun je doorgaan naar de wedstrijd-pagina
  alert("Start wedstrijd (te implementeren)!");
};
  startGameBtn.onclick = () => {
    localStorage.setItem("spelers", JSON.stringify(spelers));
    window.location.href = "wedstrijd.html";
  };
}

function initWedstrijd() {
  toonActiefVak();
  document.getElementById("switchVakBtn").onclick = wisselVak;
  document.getElementById("goalBtn").onclick = () => registreerActie("doelpunt");
  document.getElementById("shotBtn").onclick = () => registreerActie("schot");
}

function toonActiefVak() {
  const container = document.getElementById("spelersVak");
  container.innerHTML = "";
  const vak = actiefVak === "A" ? "aanval" : "verdediging";
  const spelersInVak = spelers.filter(s => s.vak === vak).slice(0, 4);

  spelersInVak.forEach(speler => {
    const btn = document.createElement("button");
    btn.textContent = speler.naam;
    btn.onclick = () => selecteerSpeler(speler.id);
    container.appendChild(btn);
  });

  document.getElementById("actiefVakLabel").textContent = `Actief vak: ${actiefVak}`;
  document.getElementById("aanvalTeller").textContent = `Aanvallen A: ${aanvallen.A} | B: ${aanvallen.B}`;
}

let geselecteerdeSpeler = null;

function selecteerSpeler(id) {
  geselecteerdeSpeler = id;
}

function registreerActie(type) {
  if (!geselecteerdeSpeler) {
    alert("Selecteer eerst een speler.");
    return;
  }

  spelers = spelers.map(speler => {
    if (speler.id === geselecteerdeSpeler) {
      if (!speler.stats) speler.stats = { schot: 0, doelpunt: 0 };
      if (type === "doelpunt") {
        speler.stats.doelpunt += 1;
        doelpuntenTeller++;
      } else {
        speler.stats.schot += 1;
      }
    }
    return speler;
  });

  if (type === "doelpunt" && doelpuntenTeller % 2 === 0) {
    wisselFunctie();
  }

  geselecteerdeSpeler = null;
  localStorage.setItem("spelers", JSON.stringify(spelers));
}

function wisselVak() {
  actiefVak = actiefVak === "A" ? "B" : "A";
  aanvallen[actiefVak]++;
  toonActiefVak();
}

function wisselFunctie() {
  spelers = spelers.map(speler => {
    if (speler.vak === "aanval") return { ...speler, vak: "verdediging" };
    if (speler.vak === "verdediging") return { ...speler, vak: "aanval" };
    return speler;
  });
  toonActiefVak();
}
