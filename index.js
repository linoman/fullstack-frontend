// console.log('Hello World!');
// fetch('http://localhost:3000/users')
//   .then(response => response.json())
//   .then(json => console.log(json));

// CREATE elements
const createUserButton = document.getElementById('create-button');
const createUserUsername = document.getElementById('create-username-text');
const createUserName = document.getElementById('create-name-text');
const createUserPassword = document.getElementById('create-password-text');
const createUserRepeatPassword = document.getElementById('create-repeat-password-text');

createUserButton.addEventListener('click', () => {
  console.log(`createUserButton`);
  console.log(createUserUsername.value);
  console.log(createUserName.value);
  console.log(createUserPassword.value);
  console.log(createUserRepeatPassword.value);
  if (createUserPassword.value != createUserRepeatPassword.value) {
    createUserPassword.style.backgroundColor = 'tomato';
    createUserRepeatPassword.style.backgroundColor = 'tomato';
  } else {
    const payload = {
      username: createUserUsername.value,
      password: createUserPassword.value,
      name: createUserName.value
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
          'Content-Type': 'application/json'
      }
    }
    fetch('http://localhost:3000/users', options)
      .then(response => console.log(response.status));
  }
});

// LOGIN elements
const loginUsername = document.getElementById('login-username-text');
const loginPassword = document.getElementById('login-password-text');
const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', () => {
  const payload = {
    username: loginUsername.value,
    password: loginPassword.value
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
        'Content-Type': 'application/json'
    }
  }
  fetch('http://localhost:3000/login', options)
    .then(response => response.json())
    .then(json => {
      document.cookie = `authorization:${json.token}`
    });
});

// UPDATE elements
const updateName = document.getElementById('update-name-text');
const updateButton = document.getElementById('update-button');
updateButton.addEventListener('click', () => {
  const token = document.cookie.split(':')[1];
  const payload = {
    name: updateName.value
  };
  const options = {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
  }
  fetch('http://localhost:3000/users', options)
    .then(response => console.log(response.status));
});

// DELETE elements
document.getElementById(`delete-button`).addEventListener(`click`, () => {
  const token = document.cookie.split(':')[1];
  const options = {
    method: 'DELETE',
    headers: {
        'Authorization': `Bearer ${token}`
    }
  }
  fetch(`http://localhost:3000/users`, options)
    .then(response => console.log(response.status))
});

