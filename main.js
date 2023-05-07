
  function addToCart() {
    // Get the product data
    const productId = 'product1'; // Replace with actual product ID
    const productName = 'Product Name'; // Replace with actual product name
    const price = 50; // Replace with actual product price
    const quantity = parseInt(document.getElementById('quantity').value);

    // Add the product to the cart
    const cartItem = {
      id: productId,
      name: productName,
      price: price,
      quantity: quantity
    };
    addToCartData(cartItem);

    // Update the cart display
    updateCartDisplay();
  }

  function addToCartData(item) {
    // Add the item to the cart data structure
    let cart = getCartData();
    if (cart[item.id]) {
      cart[item.id].quantity += item.quantity;
    } else {
      cart[item.id] = item;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function getCartData() {
    // Get the cart data from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    return cart;
  }

  function updateCartDisplay() {
    // Update the cart display with the current cart data
    const cart = getCartData();
    const cartItemCount = Object.keys(cart).length;
    document.getElementById('cart-count').textContent = cartItemCount;
  }


  function renderCartItems() {
    // Render the cart items in the table
    const cart = getCartData();
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    let total = 0;
    for (const itemId in cart) {
      const item = cart[itemId];
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <input type="number" min="1" value="${item.quantity}"
            onchange="updateCartItemQuantity('${itemId}', this.value)">
        </td>
        <td>$${itemTotal.toFixed(2)}</td>
      `;
      cartItemsElement.appendChild(row);
    }

    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
  }

  function updateCartItemQuantity(itemId, newQuantity) {
    // Update the quantity of a cart item
    const cart = getCartData();
    cart[itemId].quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
  }

  window.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
  });