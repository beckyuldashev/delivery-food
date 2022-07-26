const menu = () => {
  const addToCart = (cartItem) => {
    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    
    if(cartArray.some(item => cartItem.id === item.id)) {
      cartArray.map(item => {
        if(item.id === cartItem.id) {
          item.count++;
        }
        return item;
      });

    } else {
      cartArray.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cartArray));
  };

  const renderItems = (data) => {

    data.forEach(({image, name, description, price, id}) => {
      const cardsMenu = document.querySelector('.cards-menu');

      const card = document.createElement('div');
      card.classList.add('card');

      card.insertAdjacentHTML('beforeend', `
        <img src="${image}" alt="${name}" class="card-image" />
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">${name}</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">${description}</div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">${price} ₽</strong>
          </div>
        </div>
      `);


      card.addEventListener('click', () => {     
        addToCart({name, price, id, count: 1});
 
        // modalCart.classList.add('show-modal');
      });

      cardsMenu.append(card);
    });
  };

  const changeRestaurantDescr = () => {
    const sectionHeading = document.querySelector('.section-heading');
    const {name, stars, price, kitchen} = JSON.parse(localStorage.getItem('restaurant'));

    sectionHeading.innerHTML = '';
    sectionHeading.insertAdjacentHTML('beforeend', `
      <h2 class="section-title restaurant-title">${name}</h2>
      <div class="card-info">
        <div class="rating">
          ${stars}
        </div>
        <div class="price">От ${price} ₽</div>
        <div class="category">${kitchen}</div>
      </div>
    `);
  };

  if(localStorage.getItem('restaurant') && localStorage.getItem('user-auth')) {
    const {products} = JSON.parse(localStorage.getItem('restaurant'));

    changeRestaurantDescr();

    fetch(`https://test-delivery-1a468-default-rtdb.firebaseio.com/db/${products}`)
      .then(res => res.json())
      .then(data => {
        renderItems(data);
      })
      .catch(error => console.log(error));
  } else {
    window.location.href = './index.html';
  }
};

menu();