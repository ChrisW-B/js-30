/* Get elements */

const player = document.querySelector(`.player`);
const video = player.querySelector(`.viewer`);
const progress = player.querySelector(`.progress`);
const progressBar = player.querySelector(`.progress__filled`);
const toggle = player.querySelector(`.toggle`);
const skipButtons = player.querySelectorAll(`[data-skip]`);
const ranges = player.querySelectorAll(`.player__slider`);

/* Build out Funcs */

const togglePlay = () => (video.paused ? video.play() : video.pause());

const updateButton = () => toggle.textContent = video.paused ? `▶` : `❚❚`;

function skip() {
  video.currentTime += +this.dataset.skip;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

const handleProgress = () => {
  // update the flex basis value
  progressBar.style.flexBasis = `${100 * (video.currentTime / video.duration)}%`;
}

const scrub = e =>
  video.currentTime = parseFloat((+(e.offsetX) / +(progress.offsetWidth)) * +(video.duration));

/* event listeners */
toggle.addEventListener(`click`, togglePlay);

video.addEventListener(`click`, togglePlay);
video.addEventListener(`play`, updateButton);
video.addEventListener(`pause`, updateButton);
video.addEventListener(`timeupdate`, handleProgress);

skipButtons.forEach(skipButton => skipButton.addEventListener(`click`, skip));

ranges.forEach(range => range.addEventListener(`change`, handleRangeUpdate));
ranges.forEach(range => range.addEventListener(`mousemove`, handleRangeUpdate));

let mouseDown = false;

progress.addEventListener(`click`, scrub);
progress.addEventListener(`mousemove`, e => mouseDown && scrub(scrub));
progress.addEventListener(`mousedown`, () => mouseDown = true);
progress.addEventListener(`mouseup`, () => mouseDown = false);