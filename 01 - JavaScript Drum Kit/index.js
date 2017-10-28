const playSound = ({ keyCode }) => {
  const audio = document.querySelector(`audio[data-key="${keyCode}"`);
  const key = document.querySelector(`.key[data-key="${keyCode}"`);
  if (!audio) return; // stop from running other keys
  audio.currentTime = 0; // reset if running while already running
  audio.play();
  key.classList.add(`playing`);
};

function buttonClicked() {
  playSound({ keyCode: this.attributes[`data-key`].value });
}

function removeTransition(e) {
  if (e.propertyName !== `transform`) return; // ignore all but transform
  this.classList.remove(`playing`);
}

const keys = document.querySelectorAll(`.key`);

keys.forEach(key => key.addEventListener(`transitionend`, removeTransition));
keys.forEach(key => key.addEventListener(`click`, buttonClicked));
window.addEventListener(`keydown`, playSound);