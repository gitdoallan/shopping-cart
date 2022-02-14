const fetchItem = async (theSku) => {
  const fetchSku = await fetch(`https://api.mercadolibre.com/items/${theSku}`)
  .then((response) => response.json())
  .catch((error) => `Algo deu errado :( \n${error}`);
  return fetchSku;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
