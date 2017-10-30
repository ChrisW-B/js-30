const pressed = [];
const secretCode = 'chrisb';

const keypress = (e) => {
  pressed.push(e.key);
  if (pressed.length > secretCode.length) pressed.shift();
  if (pressed.join(``).includes(secretCode)) cornify_add();
}

window.addEventListener(`keyup`, keypress)