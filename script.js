// === Toevoegen van teamnaamvelden ===
const teamThuisInput = document.getElementById("team 1");
const teamUitInput = document.getElementById("team 2");

let spelers = JSON.parse(localStorage.getItem("spelers")) || [];
let actiefVak = "A";
let aanvallen = { A: 0, B: 0 };
let doelpunten = { A: 0, B: 0 };
let doelpuntenTeller = 0;
let geselecteerdeSpeler = null;

document.addEventListener("DOMContentLoaded", () => {
  const teamThuisInput = document.getElementById("team 1");
  const teamUitInput = document.getElementById("team 2");
  const playerNameInput = document.getElementById("playerName");
  const addPlayerBtn = document.getElementById("addPlayerBtn");
  const playerList = document.getElementById("playerList");
  const vakAanval = document.getElementById("vakAanval");
  const vakVerdediging = document.getElementById("vakVerdediging");
  const vakWissels = document.getElementById("vakWissels");
  const startGameBtn = document.getElementById("startGameBtn");
  const modeEenvoudigBtn = document.getElementById("modeEenvoudig");
  const modeUitgebreidBtn = document.getElementById("modeUitgebreid");

  let spelers = [];

  function updateModeSelection(mode) {
    localStorage.setItem("statistiekmodus", mode);
    modeEenvoudigBtn.classList.remove("selected");
    modeUitgebreidBtn.classList.remove("selected");
    if (mode === "eenvoudig") {
      modeEenvoudigBtn.classList.add("selected");
    } else {
      modeUitgebreidBtn.classList.add("selected");
    }
  }

  modeEenvoudigBtn.onclick = () => updateModeSelection("eenvoudig");
  modeUitgebreidBtn.onclick = () => updateModeSelection("uitgebreid");

  addPlayerBtn.onclick = () => {
    const naam = playerNameInput.value.trim();
    if (!naam) return;
    const id = Date.now();
    spelers.push({ id, naam, vak: null });
    playerNameInput.value = "";
    toonSpelers();
    toonVakken();
    controleerStartknop();
  };

  function verwijderSpeler(id) {
    spelers = spelers.filter(speler => speler.id !== id);
    toonSpelers();
    toonVakken();
    controleerStartknop();
  }

  function toewijsVak(id, vak) {
    spelers = spelers.map(speler => {
      if (speler.id === id) return { ...speler, vak };
      return speler;
    });
    toonVakken();
    controleerStartknop();
  }

  function toonSpelers() {
    playerList.innerHTML = "";
    spelers.forEach(speler => {
      const li = document.createElement("li");
      li.textContent = speler.naam;

      const btnAanval = document.createElement("button");
      btnAanval.textContent = "Aanval";
      btnAanval.onclick = () => toewijsVak(speler.id, "aanval");

      const btnVerdediging = document.createElement("button");
      btnVerdediging.textContent = "Verdediging";
      btnVerdediging.onclick = () => toewijsVak(speler.id, "verdediging");

      const btnWissel = document.createElement("button");
      btnWissel.textContent = "Wissel";
      btnWissel.onclick = () => toewijsVak(speler.id, "wissel");

      const verwijderBtn = document.createElement("button");
      verwijderBtn.textContent = "✖";
      verwijderBtn.className = "verwijder-knop";
      verwijderBtn.onclick = () => verwijderSpeler(speler.id);

      li.appendChild(btnAanval);
      li.appendChild(btnVerdediging);
      li.appendChild(btnWissel);
      li.appendChild(verwijderBtn);
      playerList.appendChild(li);
    });
  }

  function toonVakken() {
    vakAanval.innerHTML = "";
    vakVerdediging.innerHTML = "";
    vakWissels.innerHTML = "";
    spelers.forEach(speler => {
      if (!speler.vak) return;
      const li = document.createElement("li");
      li.textContent = speler.naam;
      const verwijderBtn = document.createElement("button");
      verwijderBtn.textContent = "✖";
      verwijderBtn.className = "verwijder-knop";
      verwijderBtn.onclick = () => verwijderSpeler(speler.id);
      li.appendChild(verwijderBtn);
      if (speler.vak === "aanval") vakAanval.appendChild(li);
      else if (speler.vak === "verdediging") vakVerdediging.appendChild(li);
      else if (speler.vak === "wissel") vakWissels.appendChild(li);
    });
  }

  function controleerStartknop() {
    const aanvalCount = spelers.filter(s => s.vak === "aanval").length;
    const verdedigingCount = spelers.filter(s => s.vak === "verdediging").length;
    startGameBtn.disabled = !(aanvalCount === 4 && verdedigingCount === 4);
  }

  startGameBtn.onclick = () => {
    localStorage.setItem("spelers", JSON.stringify(spelers));
    localStorage.setItem("teamThuis", teamThuisInput.value.trim());
    localStorage.setItem("teamUit", teamUitInput.value.trim());
    const mode = localStorage.getItem("statistiekmodus") || "eenvoudig";
    const url = mode === "uitgebreid" ? "wedstrijd_uitgebreid.html" : "wedstrijd.html";
    window.location.href = url;
  };
});

// === SETUP SCHERM ===
function initSetup() {
  const playerNameInput = document.getElementById("playerName");
  const addPlayerBtn = document.getElementById("addPlayerBtn");
  const playerList = document.getElementById("playerList");
  const vakAanval = document.getElementById("vakAanval");
  const vakVerdediging = document.getElementById("vakVerdediging");
  const vakWissels = document.getElementById("vakWissels");
  const startGameBtn = document.getElementById("startGameBtn");

  spelers = [];

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
    if (!speler.vak) return;

    const li = document.createElement("li");
    li.textContent = speler.naam;
    li.style.backgroundColor = "gold"; // visuele markering
    li.style.padding = "5px";
    li.style.marginBottom = "5px";
    li.style.borderRadius = "5px";

    const verwijderBtn = document.createElement("button");
    verwijderBtn.textContent = "✖";
    verwijderBtn.className = "verwijder-knop";
    verwijderBtn.onclick = () => verwijderSpeler(speler.id);
    li.appendChild(verwijderBtn);

    if (speler.vak === "aanval") vakAanval.appendChild(li);
    else if (speler.vak === "verdediging") vakVerdediging.appendChild(li);
    else if (speler.vak === "wissel") vakWissels.appendChild(li);
  });
  }

  function controleerStartknop() {
    const aanvalCount = spelers.filter(s => s.vak === "aanval").length;
    const verdedigingCount = spelers.filter(s => s.vak === "verdediging").length;
    startGameBtn.disabled = !(aanvalCount === 4 && verdedigingCount === 4);
  }

  startGameBtn.onclick = () => {
    localStorage.setItem("spelers", JSON.stringify(spelers));
    localStorage.setItem("teamThuis", teamThuisInput.value.trim());
    localStorage.setItem("teamUit", teamUitInput.value.trim());
    window.location.href = "wedstrijd.html";
  };
}

// === WEDSTRIJD SCHERM ===
function initWedstrijd() {
  toonActiefVak();
  toonStand();
  document.getElementById("switchVakBtn").onclick = wisselVak;
  document.getElementById("goalBtn").onclick = () => registreerActie("doelpunt");
  document.getElementById("shotBtn").onclick = () => registreerActie("schot");
  document.getElementById("statsBtn").onclick = () => {
    window.location.href = "statistieken.html";
  };
}

function toonActiefVak() {
  const container = document.getElementById("spelersVak");
  container.innerHTML = "";
  const vak = actiefVak === "A" ? "aanval" : "verdediging";
  const spelersInVak = spelers.filter(s => s.vak === vak);
  spelersInVak.forEach(speler => {
    const btn = document.createElement("button");
    btn.textContent = speler.naam;
    btn.onclick = () => selecteerSpeler(speler.id, btn);
    if (speler.id === geselecteerdeSpeler) btn.classList.add("geselecteerd");
    container.appendChild(btn);
  });
  document.getElementById("actiefVakLabel").textContent = `Actief vak: ${actiefVak}`;
}

function selecteerSpeler(id, btn) {
  geselecteerdeSpeler = id;
  document.querySelectorAll("#spelersVak button").forEach(b => b.classList.remove("geselecteerd"));
  btn.classList.add("geselecteerd");
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
        speler.stats.doelpunt++;
        doelpunten[actiefVak]++;
        doelpuntenTeller++;
      } else {
        speler.stats.schot++;
      }
    }
    return speler;
  });
  localStorage.setItem("spelers", JSON.stringify(spelers));
  if (type === "doelpunt" && doelpuntenTeller % 2 === 0) {
    wisselFunctie();
  }
  geselecteerdeSpeler = null;
  toonActiefVak();
  toonStand();
}

let spelers = JSON.parse(localStorage.getItem("spelers")) || [];
let actiefVak = "A";
let doelpunten = { A: 0, B: 0 };
let doelpuntenTeller = 0;
let geselecteerdeSpeler = null;

document.addEventListener("DOMContentLoaded", () => {
  initWedstrijd();
});

function initWedstrijd() {
  toonActiefVak();
  toonStand();
  document.getElementById("switchVakBtn").onclick = wisselVak;
  document.getElementById("goalBtn").onclick = () => registreerActie("doelpunt");
  document.getElementById("shotBtn").onclick = () => registreerActie("schot");
  document.getElementById("statsBtn").onclick = () => {
    window.location.href = "statistieken.html";
  };
  document.getElementById("wisselBtn").onclick = toonWisselMenu;
}

function toonActiefVak() {
  const container = document.getElementById("spelersVak");
  container.innerHTML = "";
  const vak = actiefVak === "A" ? "aanval" : "verdediging";
  const spelersInVak = spelers.filter(s => s.vak === vak);
  spelersInVak.forEach(speler => {
    const btn = document.createElement("button");
    btn.textContent = speler.naam;
    btn.onclick = () => selecteerSpeler(speler.id, btn);
    if (speler.id === geselecteerdeSpeler) btn.classList.add("geselecteerd");
    container.appendChild(btn);
  });
  document.getElementById("actiefVakLabel").textContent = `Actief vak: ${actiefVak}`;
}

function selecteerSpeler(id, btn) {
  geselecteerdeSpeler = id;
  document.querySelectorAll("#spelersVak button").forEach(b => b.classList.remove("geselecteerd"));
  btn.classList.add("geselecteerd");
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
        speler.stats.doelpunt++;
        doelpunten[actiefVak]++;
        doelpuntenTeller++;
      } else {
        speler.stats.schot++;
      }
    }
    return speler;
  });
  localStorage.setItem("spelers", JSON.stringify(spelers));
  if (type === "doelpunt" && doelpuntenTeller % 2 === 0) {
    wisselFunctie();
  }
  geselecteerdeSpeler = null;
  toonActiefVak();
  toonStand();
}

function toonStand() {
  document.getElementById("scoreThuis").textContent = doelpunten.A;
  document.getElementById("scoreUit").textContent = doelpunten.B;
}

function wisselVak() {
  actiefVak = actiefVak === "A" ? "B" : "A";
  toonActiefVak();
}

function wisselFunctie() {
  spelers = spelers.map(speler => {
    if (speler.vak === "aanval") return { ...speler, vak: "verdediging" };
    if (speler.vak === "verdediging") return { ...speler, vak: "aanval" };
    return speler;
  });
  localStorage.setItem("spelers", JSON.stringify(spelers));
}

function toonWisselMenu() {
  const wisselContainer = document.getElementById("wisselMenu");
  wisselContainer.innerHTML = "";

  const wissels = spelers.filter(s => s.vak === "wissel");
  const veldspelers = spelers.filter(s => s.vak === "aanval" || s.vak === "verdediging");

  const wisselSelect = document.createElement("select");
  wisselSelect.id = "wisselSelect";
  wissels.forEach(speler => {
    const opt = document.createElement("option");
    opt.value = speler.id;
    opt.textContent = speler.naam;
    wisselSelect.appendChild(opt);
  });

  const veldSelect = document.createElement("select");
  veldSelect.id = "veldSelect";
  veldspelers.forEach(speler => {
    const opt = document.createElement("option");
    opt.value = speler.id;
    opt.textContent = speler.naam + " (" + speler.vak + ")";
    veldSelect.appendChild(opt);
  });

  const wisselKnop = document.createElement("button");
  wisselKnop.textContent = "Voer wissel uit";
  wisselKnop.onclick = () => {
    const inId = parseInt(wisselSelect.value);
    const uitId = parseInt(veldSelect.value);
    voerWisselUit(inId, uitId);
  };

  wisselContainer.appendChild(document.createTextNode("Wisselspeler: "));
  wisselContainer.appendChild(wisselSelect);
  wisselContainer.appendChild(document.createElement("br"));
  wisselContainer.appendChild(document.createTextNode("Veldspeler: "));
  wisselContainer.appendChild(veldSelect);
  wisselContainer.appendChild(document.createElement("br"));
  wisselContainer.appendChild(wisselKnop);
}

function voerWisselUit(inId, uitId) {
  const uitSpeler = spelers.find(s => s.id === uitId);
  const vak = uitSpeler.vak;
  spelers = spelers.map(speler => {
    if (speler.id === uitId) return { ...speler, vak: "wissel" };
    if (speler.id === inId) return { ...speler, vak };
    return speler;
  });
  localStorage.setItem("spelers", JSON.stringify(spelers));
  toonActiefVak();
  toonWisselMenu();
}

// === STATISTIEKEN SCHERM ===
function initStatistieken() {
  const tabel = document.getElementById("statsTableBody");
  spelers.forEach(speler => {
    const row = document.createElement("tr");
    const schoten = speler.stats?.schot || 0;
    const doelpunten = speler.stats?.doelpunt || 0;
    const perc = schoten > 0 ? ((doelpunten / schoten) * 100).toFixed(1) + "%" : "-";
    row.innerHTML = `
      <td>${speler.naam}</td>
      <td>${schoten}</td>
      <td>${doelpunten}</td>
      <td>${perc}</td>
    `;
    tabel.appendChild(row);
  });
  document.getElementById("aanvalTellerStats").textContent =
    `Aanvallen A: ${aanvallen.A} | B: ${aanvallen.B}`;
}
