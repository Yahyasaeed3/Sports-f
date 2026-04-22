function loadMapWithPins() {
  const map = L.map('map').setView([51.4545, -2.5879], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent(API_URL))
    .then(res => res.json())
    .then(data => {
      const features = data.features || [];

      const table = document.getElementById("map-results");
      if (table) table.innerHTML = "";

      features.forEach(f => {
        const a = f.attributes || {};
        const g = f.geometry;

        if (!g) return;

        const lat = g.y;
        const lng = g.x;

        const name =
          a.NAME || a.FACILITY || a.TITLE || "Unknown";

        const type =
          a.TYPE || a.DESCRIPTION || "Unknown";

        const address =
          a.ADDRESS || a.STREET || a.LOCALITY || "Bristol";

      
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(name);

      
        if (table) {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${name}</td>
            <td>${type}</td>
            <td>${address}</td>
          `;
          table.appendChild(row);
        }
      });
    })
    .catch(err => console.error("Map error:", err));
}


window.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("map")) {
    loadMapWithPins();
  }
});