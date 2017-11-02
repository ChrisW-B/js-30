const videos = document.querySelectorAll(`[data-time]`);

/* before video */
/*
let totalTime = 0;

const convertToSeconds = (time) => {
  const [mins, secs] = time.split(`:`);
  return ((+mins) * 60) + (+secs);
};

const getHours = minutes => Math.floor(minutes / 60);
const getMins = seconds => Math.floor(seconds / 60);
const getSeconds = seconds => seconds % 60;

const convertToTimeStamp = (totalSeconds) => {
  const secs = getSeconds(totalSeconds);
  const mins = getMins(totalSeconds);
  const hrs = getHours(mins);
  return `${hrs}:${mins - (hrs * 60)}:${secs}`;
};

videos.forEach((video) => {
  const { dataset: { time } } = video;
  const seconds = convertToSeconds(time);
  totalTime += seconds;
});

console.log(convertToTimeStamp(totalTime));
*/


/* video solution */

const seconds = [...videos]
  .map(({ dataset }) => dataset.time)
  .map((time) => {
    const [mins, secs] = time.split(`:`).map(parseFloat);
    return ((mins) * 60) + (secs);
  })
  .reduce((total, vidSeconds) => total + vidSeconds, 0);

let secs = seconds;

const hrs = Math.floor(secs / 3600);
secs %= 3600;

const mins = Math.floor(secs / 60);
secs %= 60;

console.log(`${hrs}:${mins}:${secs}`);