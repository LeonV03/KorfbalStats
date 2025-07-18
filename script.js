<script>
  // Gegevensopslag
  let team1 = "";
  let team2 = "";
  let statistiekModus = "";
  let spelers = [];
  let aanvalsvak = [];
  let verdedigingsvak = [];
  let wissels = [];

  // Elementen ophalen
  const team1Input = document.querySelector("#team1");
  const team2Input = document.querySelector("#team2");
  const eenvoudigBtn = document.querySelector("#eenvoudig");
  const uitgebreidBtn = document.querySelector("#uitgebreid");
  const spelerInput = document.querySelector("#spelernaam");
  const toevoegenBtn = document.querySelector("#toevoegenSpeler");
  const wedstrijdBtn = document.querySelector("#startWedstrijd");

  const aanvalList = document.querySelector("#aanvalsvak");
  const verdedigList = document.querySelector("#verdedigingsvak");
  const wisselList = document.querySelector("#wissels");

  // Teamnamen opslaan
  team1Input.addEventListener("input", (e) => {
    team1 = e.target.value;
  });

  team2Input.addEventListener("input", (e) => {
    team2 = e.target.value;
  });

  // Statistiekmodus kiezen
  eenvoudigBtn.addEventListener("click", () => {
    statistiekModus = "eenvoudig";
    eenvoudigBtn.style.fontWeight = "bold";
    uitgebreidBtn.style.fontWeight = "normal";
  });

  uitgebreidBtn.addEventListener("click", () => {
    statistiekModus = "uitgebreid";
    uitgebreidBtn.style.fontWeight = "bold";
    eenvoudigBtn.style.fontWeight = "normal";
  });

  // Speler toevoegen
  toevoegenBtn.addEventListener("click", () => {
    const naam = spelerInput.value.trim();
    if (naam) {
      const speler = { naam, vak: null };
      spelers.push(speler);
      spelerInput.value = "";
      updateSpelerLijst();
    }
  });

  // Spelerlijst bijwerken
  function updateSpelerLijst() {
    const container = document.querySelector("#spelerLijst");
    container.innerHTML = "";
    spelers.forEach((speler, index) => {
      const div = document.createElement("div");
      div.textContent = speler.naam;

      const select = document.createElement("select");
      select.innerHTML = `
        <option value="">--Vak kiezen--</option>
        <option value="aanval">1e aanvalsvak</option>
        <option value="verdediging">1e verdedigingsvak</option>
        <option value="wissel">Wissel</option>
      `;
      select.value = speler.vak || "";
      select.addEventListener("change", (e) => {
        speler.vak = e.target.value;
        updateVakken();
      });

      div.appendChild(select);
      container.appendChild(div);
    });
  }

  // Vakken bijwerken
  function updateVakken() {
    aanvalsvak = spelers.filter(s => s.vak === "aanval");
    verdedigingsvak = spelers.filter(s => s.vak === "verdediging");
    wissels = spelers.filter(s => s.vak === "wissel");

    aanvalList.innerHTML = aanvalsvak.map(s => `<li>${s.naam}</li>`).join("");
    verdedigList.innerHTML = verdedigingsvak.map(s => `<li>${s.naam}</li>`).join("");
    wisselList.innerHTML = wissels.map(s => `<li>${s.naam}</li>`).join("");
  }

  // Wedstrijd starten
  wedstrijdBtn.addEventListener("click", () => {
    if (
      aanvalsvak.length >= 1 && aanvalsvak.length <= 4 &&
      verdedigingsvak.length >= 1 && verdedigingsvak.length <= 4
    ) {
      // Opslaan in localStorage
      localStorage.setItem("team1", team1);
      localStorage.setItem("team2", team2);
      localStorage.setItem("statistiekModus", statistiekModus);
      localStorage.setItem("spelers", JSON.stringify(spelers));

      // Navigatie
      if (statistiekModus === "eenvoudig") {
        window.location.href = "wedstrijd_eenvoudig.html";
      } else {
        window.location.href = "wedstrijd_uitgebreid.html";
      }
    } else {
      alert("Zorg dat er 1-4 spelers in zowel aanval als verdediging staan.");
    }
  });
// Spelersdata met statistieken
let spelersData = JSON.parse(localStorage.getItem("spelersData")) || {
  aanval: { vak1: [] },
  verdediging: { vak1: [] },
  wissels: []
};

// Voorbeeld: speler toevoegen (kan vervangen worden door dynamische invoer)
spelersData.aanval.vak1.push({ naam: "Speler A", doelpunten: 2, pogingen: 5 });
spelersData.verdediging.vak1.push({ naam: "Speler B", doelpunten: 1, pogingen: 3 });
spelersData.wissels.push({ naam: "Speler C", doelpunten: 0, pogingen: 0 });

// Opslaan in localStorage
function saveData() {
  localStorage.setItem("spelersData", JSON.stringify(spelersData));
}

// Wissel uitvoeren
function wisselSpeler(veldType, vak, veldIndex, wisselIndex) {
  const veldSpeler = spelersData[veldType][vak][veldIndex];
  const wisselSpeler = spelersData.wissels[wisselIndex];

  // Wissel de spelers
  spelersData[veldType][vak][veldIndex] = wisselSpeler;
  spelersData.wissels[wisselIndex] = veldSpeler;

  saveData();
  alert(`Wissel uitgevoerd: ${wisselSpeler.naam} voor ${veldSpeler.naam}`);
  location.reload(); // herlaad om wijzigingen te tonen
}

// Statistieken tonen in HTML
function toonStatistieken() {
  const aanvalTabel = document.querySelector("#aanval-vak1");
  const verdedigingTabel = document.querySelector("#verdediging-vak1");

  spelersData.aanval.vak1.forEach(speler => {
    aanvalTabel.innerHTML += `
      <tr>
        <td>${speler.naam}</td>
        <td>${speler.doelpunten}</td>
        <td>${speler.pogingen}</td>
        <td>${(speler.pogingen > 0 ? (speler.doelpunten / speler.pogingen * 100).toFixed(1) : 0)}%</td>
      </tr>`;
  });

  spelersData.verdediging.vak1.forEach(speler => {
    verdedigingTabel.innerHTML += `
      <tr>
        <td>${speler.naam}</td>
        <td>${speler.doelpunten}</td>
        <td>${speler.pogingen}</td>
        <td>${(speler.pogingen > 0 ? (speler.doelpunten / speler.pogingen * 100).toFixed(1) : 0)}%</td>
      </tr>`;
  });
}

document.addEventListener("DOMContentLoaded", toonStatistieken);
</script>
