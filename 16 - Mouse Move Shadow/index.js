const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 500;

function shadow(e) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = e;
  if (this !== e.target) {
    const { offsetLeft: targetL, offsetTop: targetT } = e.target;
    x += targetL;
    y += targetT;
  }

  const xWalk = Math.round(((x / width) * walk) - (walk / 2));
  const yWalk = Math.round(((y / height) * walk) - (walk / 2));

  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(0, 0, 255, 0.7),
    ${xWalk}px ${yWalk}px 50px rgba(0, 0, 255, 0.7),
    ${-1 * xWalk}px ${-1 * yWalk}px 0 rgba(255, 0, 0, 0.7),
    ${-1 * xWalk}px ${-1 * yWalk}px 50px rgba(255, 0, 0, 0.7),
    ${xWalk}px ${-1 * yWalk}px 0 rgba(0, 255, 0, 0.7),
    ${xWalk}px ${-1 * yWalk}px 50px rgba(0, 255, 0, 0.7),
    ${-1 * xWalk}px ${yWalk}px 0 rgba(0, 255, 255, 0.7),
    ${-1 * xWalk}px ${yWalk}px 50px rgba(0, 255, 255, 0.7)
  `;
}

hero.addEventListener(`mousemove`, shadow);