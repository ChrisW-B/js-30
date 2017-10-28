const SecondHand = document.querySelector(`.second-hand`);
const HourHand = document.querySelector(`.hour-hand`);
const MinuteHand = document.querySelector(`.min-hand`);

const setDate = () => {
  const now = new Date();
  const secondsDeg = 90 + ((now.getSeconds() / 60) * 360);
  const minuteDeg = 90 + ((now.getMinutes() / 60) * 360) + (secondsDeg / 60);
  const hourDeg = 90 + ((now.getHours() / 12) * 360) + (minuteDeg / 60);
  SecondHand.style.transform = `rotate(${secondsDeg}deg)`;
  MinuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  HourHand.style.transform = `rotate(${hourDeg}deg)`;
}

setInterval(setDate, 500);