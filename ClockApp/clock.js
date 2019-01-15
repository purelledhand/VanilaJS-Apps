const clockContainer = document.querySelector(".js-clock"),
  clockTitle = document.querySelector(".js-title");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clockTitle.innerText = `${
    hours>12?`PM ${
      hours-12 < 10?`0${hours-12}`:hours-12}`:`AM ${
      hours-12 < 10?`0${hours-12}`:hours-12}`}:${
    minutes<10?`0${minutes}`:minutes}:${
    seconds<10?`0${seconds}`:seconds}
  `;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();