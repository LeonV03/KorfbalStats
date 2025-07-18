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
</script>
