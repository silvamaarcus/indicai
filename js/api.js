async function buscar() {
  const apiKey = "edd4216cc129bcc60ae4c4eb6370b44c";
  const baseUrl = "https://api.themoviedb.org/3";

  // Verifica se o usuário selecionou filmes ou séries de TV
  const tipoFilme = document
    .getElementById("opcao-filme")
    .classList.contains("active");
  const tipoSerie = document
    .getElementById("opcao-serie")
    .classList.contains("active");

  if (!tipoFilme && !tipoSerie) {
    // Se nenhum tipo for selecionado, exibe uma mensagem de erro e retorna
    alert("Por favor, selecione se prefere assistir a filmes ou séries de TV.");
    return;
  }

  let url;
  if (tipoFilme) {
    url = new URL(`${baseUrl}/discover/movie`);
  } else if (tipoSerie) {
    url = new URL(`${baseUrl}/discover/tv`);
  }

  const genre = document.querySelector(
    ".respostas.flex-wrap button.active"
  ).value;
  const year = document
    .querySelector('button[value="old"]')
    .classList.contains("active")
    ? "old"
    : "recent";

  let params = {
    api_key: apiKey,
    sort_by: "popularity.desc", // Ordenar por popularidade (filmes ou séries mais assistidos primeiro)
    with_genres: genre,
    with_original_language: "en", // Filmes ou séries com linguagem original em inglês
    language: "pt-BR", // Solicitar resultados em português
  };

  if (tipoFilme) {
    // Adicione parâmetros específicos para filmes
    params = { ...params, media_type: "movie" }; // Define o tipo de mídia como filme
  } else if (tipoSerie) {
    // Adicione parâmetros específicos para séries de TV
    params = { ...params, media_type: "tv" }; // Define o tipo de mídia como série de TV
  }

  if (year === "old") {
    params = { ...params, "primary_release_date.lte": "2010-01-01" };
  } else {
    params = { ...params, "primary_release_date.gte": "2010-01-01" };
  }

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao fazer solicitação à API");
    }
    const data = await response.json();
    const mediaRecomendada = tipoFilme ? data.results[0] : data.results.find(media => media.media_type === 'tv');
    const titulo = tipoFilme ? "Filme" : "Série de TV";
    alert(`${mediaRecomendada.title || mediaRecomendada.name}`);
  } catch (error) {
    console.error(error);
    alert(
      "Ocorreu um erro ao buscar a recomendação. Por favor, tente novamente mais tarde."
    );
  }

  limparRespostas();
}

function limparRespostas() {
  // Remove a classe "active" de todos os botões de opção
  document.querySelectorAll(".respostas button").forEach((btn) => {
    btn.classList.remove("active");
  });
}

document.querySelectorAll(".respostas button").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
  });
});
