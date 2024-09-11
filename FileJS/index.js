let cart = [];

  function addToCart(id, name, price) {
      const item = cart.find(product => product.id === id);
      if (item) {
          item.quantity += 1;
      } else {
          cart.push({ id, name, price, quantity: 1 });
      }
      renderCart();
  }

  function updateQuantity(id, delta) {
      const item = cart.find(product => product.id === id);
      if (item) {
          item.quantity += delta;
          if (item.quantity <= 0) {
              removeFromCart(id);
          }
      }
      renderCart();
  }

  function removeFromCart(id) {
      cart = cart.filter(product => product.id !== id);
      renderCart();
  }

  function getTotal() {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function renderCart() {
      const cartItemsDiv = document.getElementById('cart-items');
      cartItemsDiv.innerHTML = '';
      cart.forEach(item => {
          cartItemsDiv.innerHTML += `
              <div class="cart-item">
                  <h3>${item.name}</h3>
                  <p>Price: $${item.price}</p>
                  <p>Quantity: ${item.quantity}</p>
                  <p>Total: $${item.price * item.quantity}</p>
                  <div class="cart-item-buttons">
                      <button onclick="updateQuantity(${item.id}, 1)">+</button>
                      <button onclick="updateQuantity(${item.id}, -1)">-</button>
                      <button onclick="removeFromCart(${item.id})">Remove</button>
                  </div>
              </div>
          `;
      });

      document.getElementById('cart-total').innerText = getTotal();
      document.getElementById('checkout-total').innerText = getTotal();
  }

  function checkout() {
      const cashReceived = parseFloat(document.getElementById('cash-received').value);
      const total = getTotal();
      const receiptDiv = document.getElementById('receipt');

      if (cashReceived < total) {
          receiptDiv.innerHTML = `
              <h2>Receipt</h2>
              <p>Cash Received: $${cashReceived}</p>
              <p>Remaining Balance: $${cashReceived - total }</p>
              <p>Please pay additional amount.</p>
          `;
      } else {
          receiptDiv.innerHTML = `
              <p>Cash Received: $${cashReceived}</p>
              <p>Cash Returned: $${cashReceived - total}</p>
              <p>Thank you!</p>
          `;
          cart = [];
          renderCart();
      }
  }