"use strict";

//Novel Covid-19 APIs
const baseEndpoint = 'https://disease.sh/v3/covid-19';
const getAllData = 'all';
const getAllCountries = 'countries?sort='; //sort query parameter -> desc or asc
const getSingleCountry = 'countries'; ///v2/countries/:country add country name at the end
const getUnitedStatesOfAmerica = 'states';
const getHOpkinsCSSE = 'jhucsse';
const getHistory = 'historical'; //v2/historical/:country get history of specific country
const getCountriesLatitudes = 'https://corona.lmao.ninja/v2/jhucsse';
const openCageKey = '44229c16f0a44ceeb93cf52c78233b82';


//counter helps me to keep one flag image on the screen at a time.
var counter = 0;

// document.getElementById("flag").style.display = "none";
document.getElementById("content-left").style.display = "none";

document.getElementById("runApi").onclick = function setup() {

    document.getElementById("content-left").style.display = "flex";
    getCountryData()
};

window.onload = () => {
    geoFindMe();
}

// Initialize and add the map
function initMap(lat, long) {
    // The location of Uluru
    const uluru = { lat: lat, lng: long };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
}

function geoFindMe() {
    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
        return;
    }
    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        initMap(latitude, longitude)
        reverseGeocodingWithGoogle(longitude, latitude)
    }
    function error() {
        console.log("Unable to retrieve your location");
    }
    navigator.geolocation.getCurrentPosition(success, error);
}

function reverseGeocodingWithGoogle(latitude, longitude) {
    const geoLocationUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageKey}`;
    fetch(geoLocationUrl)
        .then(res => res.json())
        .catch(status => {
            console.log('Request failed.  Returned status of', status)
        })
}

//a function that returns information of covid-19 for a specific country that a user chooses.
const getCountryData = () => {

    // document.getElementById("flag").style.display = "none";

    let url = "";
    var img_url = new Image();

    let country = document.getElementById("country2").value.trim();
    let days = document.getElementById("history").value.trim();

    var singleCountryUrl = `${baseEndpoint}/${getSingleCountry}/${country}`;
    const getAllDataUrl = `${baseEndpoint}/${getAllData}`;

    if (country === "All") {
        url = getAllDataUrl;
        document.getElementById("history").disabled = true;
    } else if (country === '-1') {
        clearTable();
        alert("\n" + "Please select a country!");
        document.getElementById("content-left").style.display = "none";
    } else {
        url = singleCountryUrl;
        document.getElementById("history").disabled = false;
    }

    fetch(url)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            clearTable();
            document.getElementById("content-left").style.display = "none";
        })
        .then((result) => {

            getCountriesLatAndLong(country);
            /*Left content of the page*/
            // document.getElementById("flag").style.display = "none";

            addCountryToHtml(result);
            if (days != "-1" && country != "All")
                getHistoricalDataByCountry(country);

            counter++;

        }).catch((err) => {
            console.error(err);
            clearTable();
            document.getElementById("content-left").style.display = "none";
            alert("Information about " + country + " are not available.");
        });
}

const getHistoricalDataByCountry = (country) => {

    let historyOption = document.getElementById("history").value;

    let days = 0;
    if (historyOption === "Yesterday")
        days = 1;
    else if (historyOption === "Last week")
        days = 7;
    else if (historyOption === "Last 15 days")
        days = 15;
    else if (historyOption === "Last month")
        days = 30;
    else
        days = 0;

    var historyObject = {
        cases: "",
        deaths: "",
        recovered: ""
    }

    var historicalDataByCountryAndDays = `${baseEndpoint}/${getHistory}/${country}?lastdays=${days}`;

    fetch(historicalDataByCountryAndDays)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            clearTable();
            alert("System could not find information about " + country + " for last " + days + " days");
        })
        .then((result) => {

            $('.loader').hide();

            historyObject = {
                cases: result.timeline.cases[Object.keys(result.timeline.cases)[0]],
                deaths: result.timeline.deaths[Object.keys(result.timeline.deaths)[0]],
                recovered: result.timeline.recovered[Object.keys(result.timeline.recovered)[0]]
            }

            addHistoricalDataToHtml(historyObject);

        })
        .catch((err) => {
            console.error(err);
            clearTable();
            alert("Something went wrong.");
        })
}

const getCountriesLatAndLong = (country) => {
    console.log(country);
    const countriesUrl = `${getCountriesLatitudes}`;
    var coortinatesArr = [];
    var coordinates =
    {
        latitude: '',
        longtitue: '',
        country: ''
    }

    console.log(countriesUrl);
    fetch(countriesUrl)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
        })
        .then((result) => {
            for (var i = 0; i < result.length; i++) {
                coordinates = {
                    latitude: result[i].coordinates.latitude,
                    longitude: result[i].coordinates.longitude,
                    country: result[i].country
                }
                coortinatesArr.push(coordinates);
            }

            for (var i = 0; i < coortinatesArr.length; i++) {
                if (country === "USA") {
                    initMap(47.751076, -120.740135);
                    break;
                }
                if (coortinatesArr[i].country === country && (coortinatesArr[i].latitude != "" && coortinatesArr[i].longitude != "")) {
                    initMap(parseFloat(coortinatesArr[i].latitude), parseFloat(coortinatesArr[i].longitude));
                    break;
                }
            }
        })
        .catch((err) => {
            console.error(err);
            clearTable();
            alert("Something went wrong.");
        })
};


const addCountryToHtml = (country) => {

    document.getElementById("totalCases").innerHTML = country.cases.toLocaleString();
    document.getElementById("totalDeaths").innerHTML = country.deaths.toLocaleString();
    document.getElementById("activeCases").innerHTML = country.active.toLocaleString();
    document.getElementById("recovered").innerHTML = country.recovered.toLocaleString();
    document.getElementById("totalDeaths").innerHTML = country.deaths.toLocaleString();
    document.getElementById("deathsToday").innerHTML = "+" + country.todayDeaths.toLocaleString();
    document.getElementById("casesToday").innerHTML = "+" + country.todayCases.toLocaleString();
    document.getElementById("tests").innerHTML = country.tests.toLocaleString();
    document.getElementById("updateTime").innerHTML = convertLastUpdatedToNormalizedDate(country.updated);

};

const addHistoricalDataToHtml = (history) => {

    document.getElementById("totalCases").innerHTML = "";
    document.getElementById("totalDeaths").innerHTML = "";
    document.getElementById("recovered").innerHTML = "";
    document.getElementById("deathsToday").innerHTML = 0;
    document.getElementById("casesToday").innerHTML = 0;

    document.getElementById("totalCases").innerHTML = history.cases.toLocaleString();
    document.getElementById("totalDeaths").innerHTML = history.deaths.toLocaleString();
    document.getElementById("recovered").innerHTML = history.recovered.toLocaleString();

};

const convertLastUpdatedToNormalizedDate = (lastUpdated) => {
    const d = new Date(lastUpdated);
    let formattedDate =
        d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    const hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    const minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    const formattedTime = `${hours}:${minutes}`;
    return `${formattedDate}  ${formattedTime}`;
};


const clearTable = () => {
    document.getElementById("totalCases").innerHTML = "";
    document.getElementById("totalDeaths").innerHTML = "";
    document.getElementById("activeCases").innerHTML = "";
    document.getElementById("recovered").innerHTML = "";
    document.getElementById("deathsToday").innerHTML = "";
    document.getElementById("casesToday").innerHTML = "";
    document.getElementById("tests").innerHTML = "";
    document.getElementById("updateTime").innerHTML = "";
}
