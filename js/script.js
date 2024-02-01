
function selectType(type) {
  sessionStorage.setItem('type', type);
}

function selectGenre(genre) {
  sessionStorage.setItem('genre', genre);
}

function selectYear(year) {
  sessionStorage.setItem('year', year);
}

function search() {
  const type = sessionStorage.getItem('type');
  const genre = sessionStorage.getItem('genre');
  const year = sessionStorage.getItem('year');
  const apiKey = 'c643baab'; 

  const url = `http://www.omdbapi.com/?type=${type}&genre=${genre}&y=${year}&apikey=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { Title, Director, Plot, Actors } = data;
      document.getElementById('filme-nome').textContent = Title;
      document.getElementById('filme-diretor').textContent = `Diretor: ${Director}`;
      document.getElementById('filme-sinopse').textContent = Plot;

      const elenco = Actors.split(', ');
      const elencoHTML = elenco.map(actor => `
        <div class="profile-med color-white text-center">
          <img src="img/favicon.png" alt="${actor}" class="profile-img" />
          <p>${actor}</p>
        </div>
      `).join('');

      document.getElementById('elenco').innerHTML = elencoHTML;
      document.getElementById('results').style.display = 'block';
    })
    .catch(error => console.error('Erro:', error));
}

document.querySelectorAll(".respostas button").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
  });
});
