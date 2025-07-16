// === Toevoegen van teamnaamvelden ===
const teamThuisInput = document.getElementById("teamThuis");
const teamUitInput = document.getElementById("teamUit");

let spelers = JSON.parse(localStorage.getItem("spelers")) || [];
let actiefVak = "A";
let aanvallen = { A: 0, B: 0 };
let doelpunten = { A: 0, B: 0 };
let doelpuntenTeller = 0;
let geselecteerdeSpeler = null;

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("wedstrijd.html")) {
    initWedstrijd();
  } else if (window.location.pathname.includes("statistieken.html")) {
    initStatistieken();
  } else {
    initSetup();
  }
});

function initSetup() {
  const teamThuisInput = document.getElementById("teamThuis");
  const teamUitInput = document.getElementById("teamUit");
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
    startGameBtn.disabled = !(aanvalCount === 4 && verdedigingCount === 4);
  }

  startGameBtn.onclick = () => {
    localStorage.setItem("spelers", JSON.stringify(spelers));
    localStorage.setItem("teamThuis", teamThuisInput.value.trim());
    localStorage.setItem("teamUit", teamUitInput.value.trim());
    window.location.href = "wedstrijd.html";
  };
}

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
