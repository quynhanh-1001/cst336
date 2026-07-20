let countrySelect =
    document.querySelector("#countrySelect");

let citySelect =
    document.querySelector("#citySelect");

let destinationImage =
    document.querySelector("#destinationImage");

let destinationName =
    document.querySelector("#destinationName");

let destinationPrice =
    document.querySelector("#destinationPrice");

let departureDates =
    document.querySelector("#departureDates");

let flightNumberInput =
    document.querySelector("#flightNumber");

let statusButton =
    document.querySelector("#statusButton");

let flightError =
    document.querySelector("#flightError");

let flightStatus =
    document.querySelector("#flightStatus");


let countries = [
    {
        name: "China",
        value: "cn"
    },
    {
        name: "France",
        value: "fr"
    },
    {
        name: "Mexico",
        value: "mx"
    },
    {
        name: "United States",
        value: "us"
    }
];


function shuffleCountries() {
    let shuffledCountries = [...countries];

    for (
        let index = shuffledCountries.length - 1;
        index > 0;
        index--
    ) {
        let randomIndex = Math.floor(
            Math.random() * (index + 1)
        );

        let temporaryCountry =
            shuffledCountries[index];

        shuffledCountries[index] =
            shuffledCountries[randomIndex];

        shuffledCountries[randomIndex] =
            temporaryCountry;
    }

    return shuffledCountries;
}


function displayCountries() {
    countrySelect.innerHTML =
        '<option value="">Select</option>';

    let shuffledCountries =
        shuffleCountries();

    shuffledCountries.forEach(
        function (country) {
            let option =
                document.createElement("option");

            option.value = country.value;
            option.textContent = country.name;

            countrySelect.appendChild(option);
        }
    );
}


function clearCities() {
    citySelect.innerHTML =
        '<option value="">Select</option>';
}


async function loadCities(countryCode) {
    clearCities();

    citySelect.disabled = true;

    let url =
        "https://csumb.space/api/otterairlines/" +
        "citiesAPI.php?country=" +
        countryCode;

    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                "Cities could not be loaded"
            );
        }

        let data = await response.json();

        console.log("Cities:", data);

        data.forEach(function (city) {
            let option =
                document.createElement("option");

            option.value = city.id;
            option.textContent = city.city;

            citySelect.appendChild(option);
        });

        citySelect.disabled = false;
    } catch (error) {
        console.log(error);

        citySelect.innerHTML =
            '<option value="">Cities unavailable</option>';

        citySelect.disabled = true;
    }
}


async function loadDestination(cityId) {
    let url =
        "https://csumb.space/api/otterairlines/" +
        "destinationsAPI.php?city=" +
        cityId;

    destinationName.textContent =
        "Loading destination...";

    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                "Destination could not be loaded"
            );
        }

        let data = await response.json();

        console.log("Destination:", data);

        destinationImage.src = data.image;
        destinationImage.style.display = "block";

        destinationName.textContent = data.city;
        destinationPrice.textContent = "$" + data.price;

        displayDepartureDates(data.departures);


    } catch (error) {
        console.log(error);

        destinationName.textContent =
            "Destination could not be loaded";

        destinationPrice.textContent = "";

        departureDates.innerHTML = "";

        destinationImage.style.display = "none";
    }
}


function displayDepartureDates(dates) {
    departureDates.innerHTML = "";

    dates.forEach(function (date) {
        let paragraph =
            document.createElement("p");

        paragraph.textContent = date;

        departureDates.appendChild(paragraph);
    });
}


function clearFlightMessages() {
    flightError.textContent = "";

    flightStatus.textContent = "";

    flightStatus.style.display = "none";
}


function validateFlightNumber(flightNumber) {
    clearFlightMessages();

    if (flightNumber.length !== 5) {
        flightError.textContent =
            "Flight number must have five characters";

        return false;
    }

    if (!/^OA[1-9][0-9]{2}$/.test(flightNumber)) {
        flightError.textContent =
            "Enter a flight number from OA101 to OA999";

        return false;
    }

    return true;
}


function displayFlightStatus(status) {
    let lowercaseStatus =
        status.toLowerCase();

    flightError.textContent = "";

    flightStatus.textContent = status;

    flightStatus.style.display = "block";

    if (lowercaseStatus === "scheduled") {
        flightStatus.style.backgroundColor =
            "green";
    } else if (lowercaseStatus === "delayed") {
        flightStatus.style.backgroundColor =
            "orange";
    } else if (lowercaseStatus === "departed") {
        flightStatus.style.backgroundColor =
            "blue";
    } else if (lowercaseStatus === "cancelled") {
        flightStatus.style.backgroundColor =
            "red";
    } else {
        flightStatus.style.backgroundColor =
            "red";
    }
}


async function checkFlightStatus(flightNumber) {
    let url =
        "https://csumb.space/api/otterairlines/" +
        "flightStatusAPI.php?flight=" +
        flightNumber;

    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                "Flight status could not be loaded"
            );
        }

        let data = await response.json();

        console.log("Flight status:", data);

        let status = data.status;

        if (
            !status ||
            status.toLowerCase() === "nonexistent"
        ) {
            flightError.textContent =
                "Flight number does not exist";

            flightStatus.style.display = "none";

            return;
        }

        displayFlightStatus(status);


    } catch (error) {
        console.log(error);

        flightError.textContent =
            "Flight status could not be loaded";

        flightStatus.style.display = "none";
    }
}


countrySelect.addEventListener(
    "change",
    function () {
        let selectedCountry =
            countrySelect.value;

        if (selectedCountry === "") {
            clearCities();

            citySelect.disabled = true;

            return;
        }

        loadCities(selectedCountry);
    }
);


citySelect.addEventListener(
    "change",
    function () {
        let selectedCity =
            citySelect.value;

        if (selectedCity !== "") {
            loadDestination(selectedCity);
        }
    }
);


statusButton.addEventListener(
    "click",
    function () {
        let flightNumber =
            flightNumberInput.value
                .trim()
                .toUpperCase();

        flightNumberInput.value =
            flightNumber;

        if (validateFlightNumber(flightNumber)) {
            checkFlightStatus(flightNumber);
        }
    }
);


flightNumberInput.addEventListener(
    "keydown",
    function (event) {
        if (event.key === "Enter") {
            statusButton.click();
        }
    }
);


displayCountries();

loadDestination("random");