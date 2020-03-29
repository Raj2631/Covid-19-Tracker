const totalCases = document.getElementById('total-cases');
const totalDeaths = document.getElementById('total-deaths');
const totalRecovered = document.getElementById('total-recovered');
const totalActive = document.getElementById('total-active');
const search = document.getElementById('search');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('result-data');

const API = 'https://covid19.mathdro.id/api';

//Requesting for data from the API.
async function getData() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    renderUI(data);
  } catch (e) {
    alert(e);
  }
}

function formatData(value) {
  const formatter = new Intl.NumberFormat();
  return formatter.format(value);
}

function getTotalActive(data) {
  const active =
    parseInt(data.confirmed.value) -
    (parseInt(data.recovered.value) + parseInt(data.deaths.value));
  return formatData(active);
}

//Updating UI.
function renderUI(data) {
  totalCases.innerText = formatData(data.confirmed.value);
  totalDeaths.innerText = formatData(data.deaths.value);
  totalRecovered.innerText = formatData(data.recovered.value);
  totalActive.innerText = getTotalActive(data);
}

function removeUI() {
  const markup = '';
  resultsContainer.innerHTML = markup;
}

function loader(flag) {
  let load;
  if (flag === true) {
    load = ` 
    <div class="loader">
      <svg>
        <use href="icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  } else {
    load = '';
  }
  resultsContainer.insertAdjacentHTML('afterbegin', load);
}

function renderCountryUI(data, query) {
  const markup = `
  <h2 class="country-name">${query}</h2>
  <div class="grid">
    <div class="g-box cases">
      <h6 class="g-heading">Total Cases</h6>
      <h3 id="total-cases">${data.confirmed.value}</h3>
    </div>
    <div class="g-box active">
      <h6 class="g-heading">Total Active</h6>
      <h3 id="total-active">${getTotalActive(data)}</h3>
    </div>

    <div class="g-box recovered">
      <h6 class="g-heading">Total recovered</h6>
      <h3 id="total-recovered" >${data.recovered.value}</h3>
    </div>
    <div class="g-box deaths">
      <h6 class="g-heading">Total Deaths</h6>
      <h3 id="total-deaths" >${data.deaths.value}</h3>
    </div>
  </div>
  `;
  resultsContainer.innerHTML = markup;
}

async function getResultByCountry() {
  const query = searchInput.value;
  searchInput.value = '';
  removeUI();

  loader(true);
  const res = await fetch(API + `/countries/${query}`);
  const dataCountry = await res.json();
  loader(false);

  renderCountryUI(dataCountry, query);
}

search.addEventListener('submit', e => {
  e.preventDefault();
  getResultByCountry();
});

window.addEventListener('load', getData);
