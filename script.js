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
