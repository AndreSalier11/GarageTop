// import Papa from "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js";

// Fetch the CSV data
async function loadCSV () {
    return fetch('/data/custom_car_list.csv')
    .then(response => response.text())
    .then(data => {
        return Papa.parse(data, {header: true}).data;
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }      

function getCar(carIdx, data) {
    return data[carIdx];
}

function populateWithRandomCards(amount, data) {
    let showIdx = [];

    // Parse the CSV data

    console.log(data);

    // Get the container to append car cards
    let container = document.querySelector('#listOfCarsUl');

    if (amount > data.length-1) amount = data.length-1;

    let idx = 0;

    // Loop through each row in the CSV data
    for(let t = 0; t < amount; t++) {

        idx = getRandomInt(amount);
        if (showIdx.includes(idx)) {
            t--;
            continue;
        } else {
            showIdx.push(idx);
        }

        // Create a new div for each car
        let carLink = document.createElement('a');
        carLink.href = 'https://www.google.com';
        carLink.target = '_blank';
        container.appendChild(carLink);

        let carContainer = document.createElement('li');

        carLink.appendChild(carContainer);

        let carImg = document.createElement('img');
        carImg.className = 'card-image';
        carImg.src = data[idx].Img;
        carImg.height = '300';

        let carName = document.createElement('p');
        carName.className = 'card-car-name';
        carName.innerHTML = data[idx].Make + ' ' + data[idx].Model;

        let carInfoContainer = document.createElement('div');
        carInfoContainer.className = 'car-info-container';

        let carInfo = document.createElement('p');
        carInfo.className = 'card-car-info';
        carInfo.innerHTML = data[idx].Kilometer + 'km | Lotação máx: ' + data[idx].SeatingCapacity + ' | Cor: ' + data[idx].Color + ' | ' + data[idx].Engine;
        carInfoContainer.appendChild(carInfo);

        let carPrice = document.createElement('p');
        carPrice.className = 'card-car-price';
        carPrice.innerHTML = data[idx].Price / 100 + '€';

        carContainer.appendChild(carImg);
        carContainer.appendChild(carName);
        carContainer.appendChild(carInfoContainer);
        carContainer.appendChild(carPrice);
    }
}

function loadCars() {
    loadCSV().then(data => {
        console.log(data);

        populateWithRandomCards(10, data);
    });
}

loadCars();
