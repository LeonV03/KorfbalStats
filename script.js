let stats = {
    goals: 0,
    shots: 0,
    attacks: 0,
    turnovers: 0,
    shotsData: []
};

function increment(type) {
    stats[type]++;
    document.getElementById(type).innerText = stats[type];
}

function calculatePercentages() {
    let shotPercentage = stats.shots > 0 ? (stats.goals / stats.shots * 100).toFixed(1) : 0;
    let turnoverPercentage = stats.attacks > 0 ? (stats.turnovers / stats.attacks * 100).toFixed(1) : 0;
    document.getElementById('percentages').innerHTML =
        `<p>Schotpercentage: ${shotPercentage}%</p>
         <p>Balverliespercentage: ${turnoverPercentage}%</p>`;
}

function saveStats() {
    localStorage.setItem('korfbalStats', JSON.stringify(stats));
    alert('Statistieken opgeslagen.');
}

function loadStats() {
    let data = localStorage.getItem('korfbalStats');
    if (data) {
        stats = JSON.parse(data);
        document.getElementById('goals').innerText = stats.goals;
        document.getElementById('shots').innerText = stats.shots;
        document.getElementById('attacks').innerText = stats.attacks;
        document.getElementById('turnovers').innerText = stats.turnovers;
        renderShots();
        alert('Statistieken geladen.');
    }
}

function resetStats() {
    if (confirm('Weet je zeker dat je alles wilt resetten?')) {
        stats = {
            goals: 0,
            shots: 0,
            attacks: 0,
            turnovers: 0,
            shotsData: []
        };
        document.getElementById('goals').innerText = 0;
        document.getElementById('shots').innerText = 0;
        document.getElementById('attacks').innerText = 0;
        document.getElementById('turnovers').innerText = 0;
        document.getElementById('shotList').innerHTML = '';
        document.getElementById('court').innerHTML = '';
        document.getElementById('percentages').innerHTML = '';
    }
}

function addShot(event) {
    const rect = event.target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((event.clientY - rect.top) / rect.height * 100).toFixed(1);
    stats.shotsData.push({x, y});
    renderShots();
}

function renderShots() {
    const court = document.getElementById('court');
    const list = document.getElementById('shotList');
    court.innerHTML = '';
    list.innerHTML = '';
    stats.shotsData.forEach((shot, index) => {
        const marker = document.createElement('div');
        marker.className = 'marker';
        marker.style.left = `${shot.x}%`;
        marker.style.top = `${shot.y}%`;
        court.appendChild(marker);

        const li = document.createElement('li');
        li.textContent = `Schot ${index + 1}: X=${shot.x}%, Y=${shot.y}%`;
        list.appendChild(li);
    });
}

document.getElementById('toggleMode').addEventListener('click', () => {
    document.getElementById('basicStats').classList.toggle('hidden');
    document.getElementById('advancedStats').classList.toggle('hidden');
});
