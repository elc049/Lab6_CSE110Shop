// Script.js

window.addEventListener('DOMContentLoaded', () => {
  if (window.localStorage.getItem('cart') === null) {
    window.localStorage.setItem('cart', JSON.stringify([]));

    fetch('https://fakestoreapi.com/products')
    .then(response=>response.json())
    .then(data=> {
      for (const product of data) {
        window.localStorage.setItem(JSON.stringify(product.id), JSON.stringify(product));
      }
      render();
    });
  }
  else {
    render();
  }
});

function render() {
  let cart = JSON.parse(window.localStorage.getItem('cart'));
  document.getElementById('cart-count').innerHTML = cart.length;

  for (let i = 1; i < 21; i++) {
    const newProd = document.createElement("product-item");
    const fetchProd = JSON.parse(window.localStorage.getItem(JSON.stringify(i)));
    newProd.setAttribute('id', `prod${fetchProd.id}`);
    if (cart.includes(`prod${fetchProd.id}`)) {
      newProd.shadowRoot.innerHTML += `
      <li class="product">
      <img src="${fetchProd.image}" alt="${fetchProd.title}" width=200>
      <p class="title">${fetchProd.title}</p>
      <p class="price">$${fetchProd.price}</p>
      <button id="button${fetchProd.id}" onclick="changeCart(id, value)" value="prod${fetchProd.id}">Remove from Cart</button>
      </li>
      `;
    } else {
      newProd.shadowRoot.innerHTML += `
      <li class="product">
      <img src="${fetchProd.image}" alt="${fetchProd.title}" width=200>
      <p class="title">${fetchProd.title}</p>
      <p class="price">$${fetchProd.price}</p>
      <button id="button${fetchProd.id}" onclick="changeCart(id, value)" value="prod${fetchProd.id}">Add to Cart</button>
      </li>
      `;
    }

    const prodList = document.getElementById("product-list");
    prodList.appendChild(newProd);
  }
}

function changeCart(buttonId, prodId) {
  let cart = JSON.parse(window.localStorage.getItem('cart'));

  if (cart.includes(prodId)) {
    alert('Removed from Cart!');
    cart.splice(cart.indexOf(prodId), 1);
    window.localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById(prodId).shadowRoot.childNodes[3].childNodes[7].innerHTML="Add to Cart";
  }
  else {
    alert('Added to Cart!');
    cart.push(prodId);
    window.localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById(prodId).shadowRoot.childNodes[3].childNodes[7].innerHTML="Remove from Cart";
  }

  document.getElementById('cart-count').innerHTML = cart.length;
}