const bandList = document.querySelector(`#bands`);

const bands = [`The Plot in You`, `The Devil Wears Prada`, `Pierce the Veil`, `Norma Jean`, `The Bled`, `Say Anything`, `The Midway State`, `We Came as Romans`, `Counterparts`, `Oh, Sleeper`, `A Skylit Drive`, `Anywhere But Here`, `An Old Dog`];

/* before watching video */
/*

const cleanName = (word) => {
  const [firstWord, ...cleaned] = word.split(` `);
  if (firstWord.match(/^(The|An|A)\b/i)) return cleaned.join(` `);
  return [firstWord, ...cleaned].join(` `);
};

const removeArticles = wordList => wordList.reduce((done, name) => [...done, { name, clean: cleanName(name) }], []);

const sortBands = () => {
  const cleanedBandList = removeArticles(bands);
  const sortedBands = cleanedBandList.sort((a, b) => b.clean < a.clean);
  const bandsHtml = sortedBands.reduce((html, { name }) => `${html} <li>${name}</li>`, ``);
  bandList.innerHTML = bandsHtml;
};

sortBands();
*/

/* Simplified way */

// const cleanName = word => word.replace(/^(The|An|A)\s/i, ``);

// const sortBands = () => {
//   const sortedBands = bands.sort((a, b) => cleanName(b) < cleanName(a));
//   bandList.innerHTML = sortedBands.reduce((html, band) => `${html} <li>${band}</li>`, ``);
// };

// sortBands();

/* video solution */
const strip = name => name.replace(/^(a |the |an )/i)
const sortedBands = bands.sort((a, b) => strip(a) > strip(b));

bandList.innerHTML = sortedBands.map(band => `<li>${band}</li>`).join(``);
