const modalAuth = document.querySelector('.modal-auth');
const userName = document.querySelector('.user-name');
const buttonAuth = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const buttonCart = document.getElementById('cart-button');
const closeAuth = modalAuth.querySelector('.close-auth');
const logInForm = document.getElementById('logInForm');
const inputLogin = logInForm.querySelector('#login');
const inputPassword = logInForm.querySelector('#password');


const openCloseModal = (elem, action) => {
  elem.classList[action]('show-modal');
};

const login = (user) => {
  buttonAuth.classList.add('hide');
  buttonOut.classList.add('show-block');
  // buttonCart.classList.add('show-block');

  userName.textContent = user.login;
  userName.classList.add('show-block');
};

const loguout = () => {
  localStorage.removeItem('user-auth');
  buttonAuth.classList.remove('hide');
  buttonOut.classList.remove('show-block');
  buttonCart.classList.remove('show-block');
  userName.classList.remove('show-block');
  userName.textContent = '';
};


const checkForm = () => {
  const inputs = modalAuth.querySelectorAll('.modal-body .label-auth input');
  
  let res = true;

  inputs.forEach(item => {
    if(item.value === '') {
      item.classList.add('error');

      if(!item.nextElementSibling) {
        item.insertAdjacentHTML('afterend', `
          <label class="label-auth error-message">Пожалуйста, заполните поле '${item.previousElementSibling.textContent}'</label>
        `);
      }

      res = false;

    } else {
      if(item.nextElementSibling) {
        item.nextElementSibling.remove();
        item.classList.remove('error');
      }
    }
  });

  return res;
};

// Open & Close auth modal
buttonAuth.addEventListener('click', () => {
  openCloseModal(modalAuth, 'add');
});

closeAuth.addEventListener('click', () => {
  openCloseModal(modalAuth, 'remove');
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') {
    openCloseModal(modalAuth, 'remove');
  }
});


// Form
logInForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if(checkForm()) {
    const user = {
      login: inputLogin.value,
      password: inputPassword.value,
    };

    localStorage.setItem('user-auth', JSON.stringify(user));

    login(user);
    e.target.reset();
    openCloseModal(modalAuth, 'remove');
  } 
});


// Logout
buttonOut.addEventListener('click', () => {
  loguout();
  if(window.location.pathname === '/restaurant.html') {
    window.location.href = './index.html';
  }
});


// Check data on localstorage
if(localStorage.getItem('user-auth')) {
  const user = JSON.parse(localStorage.getItem('user-auth'));

  login(user);
}