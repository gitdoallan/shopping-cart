const saveCartItems = (cartItems) => {
  localStorage.setItem('shopping-cart', cartItems.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
