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

function search(input, data) {
    for (let i = 0; i < data.length; i++) {
        const car = data[i];
        const carValues = Object.values(car);

        for (let j = 0; j < carValues.length; j++) {
            const value = carValues[j];

            if (typeof value === 'string' && value.toLowerCase().includes(input.toLowerCase())) {
                displayCarsCar(i, data);
                break;
            }
        }
    }
}

function displayIndexCar(idx, data) {
    // Get the container to append car cards
    let container = document.querySelector('#listOfCarsUl');
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

function displayCarsCar(idx, data) {
    // Get the container to append car cards
    let container = document.querySelector('#listOfCarsUl');
    // Create a new div for each car
    let carLink = document.createElement('a');
    carLink.href = '/views/car.html?idx=' + idx;
    carLink.target = '_blank';
    container.appendChild(carLink);

    let carContainer = document.createElement('li');
    carLink.appendChild(carContainer);

    let carImg = document.createElement('img');
    carImg.className = 'card-image';
    carImg.src = data[idx].Img;
    carImg.height = '200';

    let carInfoContainer = document.createElement('div');
    carInfoContainer.className = 'car-info-container';

    let cardCarFlexNamePrice = document.createElement('div');
    cardCarFlexNamePrice.className = "card-car-flex-name-price";

    let carName = document.createElement('p');
    carName.className = 'card-car-name';
    carName.innerHTML = data[idx].Make + ' ' + data[idx].Model;

    let carPrice = document.createElement('p');
    carPrice.className = 'card-car-price';
    carPrice.innerHTML = data[idx].Price / 100 + '€';

    let carInfo = document.createElement('p');
    carInfo.className = 'card-car-info';
    carInfo.innerHTML = data[idx].Kilometer + 'km | Lotação máx: ' + data[idx].SeatingCapacity + ' | Cor: ' + data[idx].Color + ' | ' + data[idx].Engine;

    cardCarFlexNamePrice.appendChild(carName);
    cardCarFlexNamePrice.appendChild(carPrice);


    let carLocation = document.createElement('p');
    carLocation.className = "card-car-location";
    carLocation.innerHTML = "Rua Dom Infante Henrique 343 Piso 2, 1198-028 Lisboa"

    carInfoContainer.appendChild(cardCarFlexNamePrice);
    carInfoContainer.appendChild(carInfo);
    carInfoContainer.appendChild(carLocation);

    carContainer.appendChild(carImg);
    carContainer.appendChild(carInfoContainer);
}

function populateWithRandomCards(amount, data, type) {
    let showIdx = [];

    // Parse the CSV data

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

        if(type == "index") {
            displayIndexCar(idx, data);
        } else if(type == "cars") {
            displayCarsCar(idx, data);
        }
    }
}

export function loadCars(amount, type) {
    loadCSV().then(data => {
        populateWithRandomCards(amount, data, type);
    });
}

export function loadFoundCars(input) {
    loadCSV().then(data => {
        search(input, data)
    });
}

export async function getCarIdx(idx) {
    return await loadCSV().then(data => {
        return getCar(idx, data);
    });
}
