window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement(`p`);
const words = document.querySelector(`.words`);
words.appendChild(p);

recognition.addEventListener(`result`, ({ results }) => {
  const text = Array.from(results)
    .map(([result]) => result)
    .map(({ transcript }) => transcript)
    .join(``);
  p.textContent = text;

  if (results[0].isFinal) {
    p = document.createElement(`p`);
    words.appendChild(p);
  }
});

recognition.start();