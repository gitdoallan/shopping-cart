const items = document.getElementsByClassName('items')[0];
const cartItems = document.getElementsByClassName('cart__items')[0];
const totalPriceClass = document.getElementsByClassName('total-price')[0];
let totalPrice = 0;
const emptyBtn = document.getElementsByClassName('empty-cart')[0];

items.innerHTML = '<span class="loading">carregando</span>';

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .id = sku;
  items.appendChild(section);
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems, totalPrice);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = sku;
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  cartItems.appendChild(li);
  return li;
}

window.onclick = async (event) => {
  if (event.target.className === 'item__add') {
    const result = await fetchItem(event.target.id);
    console.log(result);
    createCartItemElement({ sku: event.target.id, name: result.title, salePrice: result.price });
    totalPrice += result.price;
    saveCartItems(cartItems);
    totalPriceClass.innerText = `${totalPrice}`;
  }
  if (event.target.className === 'cart__item') {
    const getPrice = await fetchItem(event.target.id);
    event.target.remove();
    totalPrice -= getPrice.price;
    totalPriceClass.innerText = `${totalPrice}`;
    saveCartItems(cartItems);
  }
};

emptyBtn.addEventListener('click', () => {
  cartItems.innerHTML = '';
  });

const resultFromApi = async () => {
  const result = await fetchProducts('computador');
  items.innerHTML = '';
  console.log(result);
  result.forEach((element) => createProductItemElement(
    { sku: element.id, name: element.title, image: element.thumbnail },
    ));
  return result;
};

window.onload = async () => {
  await resultFromApi();
  await getSavedCartItems(cartItems);
};
