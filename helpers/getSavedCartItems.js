const getSavedCartItems = (cartItems) => {
  const getHTML = cartItems;
  getHTML.innerHTML = localStorage.getItem('shopping-cart');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
