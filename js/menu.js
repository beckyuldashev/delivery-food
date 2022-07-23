const restaurant = 'food-band';

const renderItems = (data) => {
  data.forEach(item => {
    console.log(item);
  });
};

fetch(`https://test-delivery-1a468-default-rtdb.firebaseio.com/db/${restaurant}.json`)
  .then(res => res.json())
  .then(data => {
    renderItems(data);
  })
  .catch(error => console.log(error));