const items = document.querySelectorAll(`.item input[type=checkbox]`);

let mostRecentCheckIndex = null;

function boxChecked({ shiftKey }) {
  const checkIndex = [...items].findIndex(item => item === this);
  if (mostRecentCheckIndex !== null && shiftKey && this.checked && mostRecentCheckIndex < checkIndex) {
    items.forEach((item, i) =>
      item.checked = i >= mostRecentCheckIndex && i <= checkIndex ? true : item.checked);
  } else if (mostRecentCheckIndex && shiftKey && this.checked) {
    items.forEach((item, i) =>
      item.checked = i <= mostRecentCheckIndex && i >= checkIndex ? true : item.checked);
  }
  mostRecentCheckIndex = checkIndex;
}

items.forEach(item => item.addEventListener(`click`, boxChecked));