const cart = () => {
  // Open & Close modal cart
  const modalCart = document.querySelector('.modal-cart');
  const modalBody = document.querySelector('.modal-body');
  const buttonCart = document.getElementById('cart-button');
  const buttonSend = modalCart.querySelector('.button-primary');
  const clearCartBtn = modalCart.querySelector('.clear-cart');
  const cartsPrice = modalCart.querySelector('.modal-pricetag');


  const openCloseModal = (elem, action) => {
    elem.classList[action]('show-modal');
  };

  const renderItems = (data) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));

    modalBody.innerHTML = '';

    data.forEach(({name, price, count, id}) => {
      const cartElem = document.createElement('div');
      cartElem.classList.add('food-row');

      cartElem.insertAdjacentHTML('beforeend', `
        <span class="food-name">${name}</span>
        <strong class="food-price">${price} ₽</strong>
        <div class="food-counter">
          <button class="counter-button btn-dec" data-index="${id}">-</button>
          <span class="counter">${count}</span>
          <button class="counter-button btn-inc" data-index="${id}">+</button>
        </div>
      `);

      modalBody.append(cartElem);
    });

    cartsPrice.textContent = cartArray.reduce((acc, item) => {
      return acc += item.price * item.count;
    }, 0) + ' ₽';
  };

  const decrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));

    cartArray.map(item => {
      if(item.id === id) {
        item.count = item.count > 0 ? item.count - 1 : 0;
      }

      return item;
    });

    localStorage.setItem('cart', JSON.stringify(cartArray));
    renderItems(cartArray);
  };

  const incrementCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));
    
    cartArray.map(item => {
      if(item.id === id) {
        item.count++;
      }

      return item;
    });
    
    localStorage.setItem('cart', JSON.stringify(cartArray));
    renderItems(cartArray);
  };

  const resetCart = () => {
    modalBody.innerHTML = '';
    cartsPrice.textContent = '0 ₽';
    localStorage.removeItem('cart');
    openCloseModal(modalCart, 'remove');
  };

  modalBody.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(e.target.classList.contains('btn-inc')) {
     incrementCount(e.target.dataset.index);
    } else if (e.target.classList.contains('btn-dec')) {
      decrementCount(e.target.dataset.index);
    }
  });
  
  buttonSend.addEventListener('click', () => {
    const cartArray = localStorage.getItem('cart');
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: cartArray
    })
      .then(res => {
        if(res.ok) {
          resetCart();
        }
      })
      .catch(e => {
        console.error(e.message);
      });
  });


  clearCartBtn.addEventListener('click', resetCart);

  buttonCart.addEventListener('click', () => {
    if(localStorage.getItem('cart')) {
      renderItems(JSON.parse(localStorage.getItem('cart')));
    }

    openCloseModal(modalCart, 'add');
  });

  modalCart.addEventListener('click', (e) => {
    if(e.target.className === 'close') {
      openCloseModal(modalCart, 'remove');
    }
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      openCloseModal(modalCart, 'remove');
    }
  });
};

cart();