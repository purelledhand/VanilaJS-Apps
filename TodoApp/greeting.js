const form = document.querySelector(".js-form"),
  input = document.querySelector(".js-form input"),
  greetings = document.querySelector(".js-greetings");

const USER_LS = "USER",
  SHOWING_CN = "showing";

function saveUser(text) {
  localStorage.setItem(USER_LS, text);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greetings.classList.add(SHOWING_CN);
  greetings.innerText = `Work, ${text}`;
}

function handleSubmit(event) {
  event.preventDefault();

  const currentValue = input.value;

  paintGreeting(currentValue);
  saveUser(currentValue);
}

function setName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    setName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();

}

init();