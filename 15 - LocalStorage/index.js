const addItems = document.querySelector(`.add-items`);
const itemsList = document.querySelector(`.plates`);
const items = localStorage.items ? JSON.parse(localStorage.items) : [];
const buttons = document.querySelectorAll(`.check-btn`);

const listHtml = (plates = []) =>
  plates.map(({ done, text }, i) => `
    <li>
      <input type="checkbox" data-index="${i}" id="item${i}" ${done ? `checked` : ``} />
      <label for="item${i}">${text}</label>
    </li>
  `).join(``);

const populateList = () => {
  itemsList.innerHTML = listHtml(items);
};

const toggleDone = ({ target }) => {
  if (!target.matches(`input`) || target.matches(`label`)) return;
  items[target.dataset.index].done = !items[target.dataset.index].done;
  localStorage.setItem(`items`, JSON.stringify(items));
}

const toggleAll = ({ target }) => {
  const { type } = target.dataset;
  items.forEach(item => item.done = (+type ? true : false));

  itemsList.innerHTML = listHtml(items);
  localStorage.setItem(`items`, JSON.stringify(items));
};

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector(`[name=item]`)).value;
  items.push({ text, done: false });
  itemsList.innerHTML = listHtml(items);
  localStorage.setItem(`items`, JSON.stringify(items));
  this.reset();
}

addItems.addEventListener(`submit`, addItem);
itemsList.addEventListener(`click`, toggleDone);
buttons.forEach(button => button.addEventListener(`click`, toggleAll));

populateList();