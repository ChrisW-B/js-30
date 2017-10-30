/* eslint-disable */
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
/* eslint-enable */

const sliderImages = document.querySelectorAll(`.slide-in`);

const checkSlide = () => {
  sliderImages.forEach((img) => {
    const slideInAt = (window.scrollY + window.innerHeight) - (img.height / 2);
    const isHalfShown = slideInAt > img.offsetTop;
    if (isHalfShown) img.classList.add(`active`);
  });
};

window.addEventListener(`scroll`, debounce(checkSlide));