// Script de Carrito para index.html

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  // Vincular botones de "Agregar al carrito"
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productName = button.dataset.nombre;
      const price = button.dataset.precio;
      const imageUrl = button.dataset.img;
      addToCart(productName, price, imageUrl);
      showCart(); // Mostrar el carrito inmediatamente
    });
  });

  // Evento del botón "Proceder al pago"
  const checkoutButton = document.getElementById('checkoutButton');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
      }

      let message = '🛍️ Estoy interesado en los siguientes productos:\n\n';
      cart.forEach(item => {
        message += `🔹 ${item.name} - ${item.price} x ${item.quantity}\n`;
      });

      const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')) * item.quantity, 0);
      message += `\n💵 Total: $${total.toFixed(2)}\n\nGracias!`;

      const phone = '593993727128';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    });
  }
});

function addToCart(productName, price, imageUrl) {
  const existingItem = cart.find(item => item.name === productName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: productName, price, quantity: 1, imageUrl });
  }

  updateCartModal();
  showToast(`${productName} agregado al carrito`);
}

function updateCartModal() {
  const cartItemsElement = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotal');
  const emptyMessage = document.getElementById('emptyCartMessage');

  cartItemsElement.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemTotal = parseFloat(item.price.replace('$', '')) * item.quantity;
    total += itemTotal;

    cartItemsElement.innerHTML += `
      <div class="d-flex align-items-center mb-3">
        <img src="${item.imageUrl}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;" class="me-3 rounded">
        <div class="flex-grow-1">
          <h6 class="mb-0">${item.name}</h6>
          <small>${item.price} x ${item.quantity}</small>
        </div>
        <span class="ms-auto">$${itemTotal.toFixed(2)}</span>
      </div>
    `;
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;
  emptyMessage.style.display = cart.length === 0 ? 'block' : 'none';
}

function showToast(message) {
  const toastEl = document.getElementById('toastMessage');
  toastEl.textContent = message;

  const toast = new bootstrap.Toast(document.getElementById('cartToast'));
  toast.show();
}

function showCart() {
  const offcanvasElement = document.getElementById('cartOffcanvas');
  const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
  offcanvas.show();
}
