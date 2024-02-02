// Escolhendo Filmes ou Séries

const btnFilmes = document.getElementById("escolha-tipo-filmes");
btnFilmes.addEventListener("click", () => {
  const opcao_escolhida_tipo = btnFilmes.value;

  btnFilmes.style.backgroundColor = "#f7f9fc";
  btnFilmes.style.color = "#4967FF";

  btnSeries.style.display = "none";

  console.log(opcao_escolhida_tipo);
});

const btnSeries = document.getElementById("escolha-tipo-series");
btnSeries.addEventListener("click", () => {
  const opcao_escolhida_tipo = btnSeries.value;

  btnSeries.style.backgroundColor = "#f7f9fc";
  btnSeries.style.color = "#4967FF";

  btnFilmes.style.display = "none";

  console.log(opcao_escolhida_tipo);
});

