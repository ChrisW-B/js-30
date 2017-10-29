const endpoint = `https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json`;
const searchInput = document.querySelector(`.search`);
const suggestions = document.querySelector(`.suggestions`);
const cities = [];

const getData = async () => {
  const res = await fetch(endpoint);
  const data = await res.json();
  cities.push(...data);
};

// alternate way with thens
// fetch(endpoint)
//   .then(res => res.json())
//   .then(data => cities.push(...data))
//   .then(() => console.log({ cities }));

const numWithCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `,`);
const findMatches = (wordToMatch, places, regex) =>
  places.filter(place =>
    place.city.match(regex) || place.state.match(regex));

function displayMatches() {
  const regex = new RegExp(`(${this.value})`, `gi`);
  const matches = findMatches(this.value, cities, regex);
  const html = matches.map(place =>
    `<li>
      <span class='name'>${place.city.replace(regex, `<span class="hl">$1</span>`)}, ${place.state.replace(regex, `<span class="hl">$1</span>`)}</span>
      <span class='population'>${numWithCommas(place.population)}</span>
    </li>`).join(``);
  suggestions.innerHTML = html;
}

searchInput.addEventListener(`change`, displayMatches);
searchInput.addEventListener(`keyup`, displayMatches);

getData();
