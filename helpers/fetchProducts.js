const fetchProducts = async (query) => {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)
  .then((response) => response.json())
  .then((data) => data.results)
  .catch((error) => `Algo deu errado :( \n${error}`);
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
