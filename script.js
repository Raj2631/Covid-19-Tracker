const totalCases = document.getElementById('total-cases');
const totalDeaths = document.getElementById('total-deaths');
const totalRecoveries = document.getElementById('total-recoveries');
const totalActive = document.getElementById('total-active');

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
  totalRecoveries.innerText = formatData(data.recovered.value);
  totalActive.innerText = getTotalActive(data);
}

window.addEventListener('load', getData);
