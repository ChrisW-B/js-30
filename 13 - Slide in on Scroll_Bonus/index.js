// using new intersection observer api

const sliderImages = document.querySelectorAll(`.slide-in`);

const makeVisible = (e) => {
  e.forEach((ele) => {
    if (ele.isIntersecting) ele.target.classList.add(`active`);
    else ele.target.classList.remove(`active`);
  });
};

const observer = new IntersectionObserver(makeVisible, { threshold: [0.65, 0] });

sliderImages.forEach(img => observer.observe(img));