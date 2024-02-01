const obter = () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");

  return query;
};
export default obter;
