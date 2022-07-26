const partners = () => {
  const cardsRestaurants = document.querySelector('.cards-restaurants');

  const renderItems = (data) => {
    data.forEach(item => {
      const {products, image, name, time_of_delivery, stars, price, kitchen} = item;

      const a = document.createElement('a');
      a.setAttribute('href', './restaurant.html');
      a.classList.add('card', 'card-restaurant');

      a.insertAdjacentHTML('beforeend', `
        <img src="${image}" alt="${name}" class="card-image" />
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">${name}</h3>
            <span class="card-tag tag">${time_of_delivery} мин</span>
          </div>
          <!-- /.card-heading -->
          <div class="card-info">
            <div class="rating">
              ${stars}
            </div>
            <div class="price">От ${price} ₽</div>
            <div class="category">${kitchen}</div>
          </div>
        </div>
      `);

      a.addEventListener('click', (e) => {
        e.preventDefault();
        
        localStorage.setItem('restaurant', JSON.stringify(item));

        if(localStorage.getItem('user-auth')) {
          window.location.href = './restaurant.html'; 
        } else {
          openCloseModal(modalAuth, 'add');
        }

      });

      cardsRestaurants.append(a);
    });
  };

  fetch(`https://test-delivery-1a468-default-rtdb.firebaseio.com/db/partners.json`)
    .then(res => res.json())
    .then(data => {
      renderItems(data);
    })
    .catch(error => console.log(error)); 
};

partners();