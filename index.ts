// Wasn't signed in during task and had to copy accross from old file after fork!!

import './style.css';
import { Country } from './models/Country'
import { Countries } from './models/Countries.enum';
import { IResult } from './models/IResult'
import { Sports } from './models/Sports.enum';
import { Medals } from './models/Medals.enum';

const countrySelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('country-slt')
);
const medalSelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('medal-slt')
);
const sportSelect: HTMLSelectElement = <HTMLSelectElement>(
  document.getElementById('sport-slt')
);


//TODO: add an eventlistener to the button to trigger addMedal
const addButton: HTMLElement = document.getElementById('add-btn');
addButton.addEventListener('click', addMedal, false);

let countries: Array<Country> = [];

init();

// This function sets up some display elements
function init() {
  let count = 0;
  for (let c in Countries) {
    if (isNaN(Number(c))) {
      countries.push(new Country(c));
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = count.toString();
      count++;
      countrySelect.add(newOption);
    }
  }
  //TODO: populate the Sport select
  for (let c in Sports) {
    if (isNaN(Number(c))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = c;
      newOption.value = count.toString();
      count++;
      sportSelect.add(newOption);
    }
  }
  //TODO: populate the Medal select
  let inCount = 0;
  for (let m in Medals) {
    if (isNaN(Number(m))) {
      let newOption: HTMLOptionElement = document.createElement('option');
      newOption.innerHTML = m;
      newOption.value = inCount.toString();
      inCount++;
      medalSelect.add(newOption);
    }
  }
}
displayTable();


// This function adds a medal to the countries tally
function addMedal() {
  countries[countrySelect.selectedIndex].results.push({
    sport: Sports[sportSelect.options[sportSelect.selectedIndex].text],
    medal: Medals[medalSelect.options[medalSelect.selectedIndex].text]
  });


  displayTable();
}

// This function refreshes the medal tally table
function displayTable() {
  const resultsBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.getElementById('results-body')
  );

  let newBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.createElement('tbody')
  );
  newBody.id = 'results-body';

  // TODO: create the rows required for the new table body element
  for (let i = 0; i < countries.length; i++) {
    let row = document.createElement('tr');

    let country = document.createElement('td');

    let Countriess = document.createTextNode(countries[i].name);
    country.appendChild(Countriess);
    row.appendChild(country);

    let gold = document.createElement('td');

    let g1 = document.createTextNode(
      String(countries[i].totalMedalType(Medals['Gold']))
    );
    gold.appendChild(g1);
    row.appendChild(gold);

    let silver = document.createElement('td');

    let s1 = document.createTextNode(
      String(countries[i].totalMedalType(Medals['Silver']))
    );
    silver.appendChild(s1);
    row.appendChild(silver);

    let bronze = document.createElement('td');

    let b1 = document.createTextNode(
      String(countries[i].totalMedalType(Medals['Bronze']))
    );
    bronze.appendChild(b1);
    row.appendChild(bronze);

    let total = document.createElement('td');

    let totaltext = document.createTextNode(String(countries[i].totalMedals()));

      total.appendChild(totaltext);

      row.appendChild(total);

    newBody.appendChild(row);
  }
  // replaces the old tbody with the new one created above
  resultsBody.parentNode.replaceChild(newBody, resultsBody);
}
