"use strict";

//Novel Covid-19 APIs
const baseEndpoint = 'https://disease.sh/v3/covid-19';
const getAllData = 'all';
const getAllCountries = 'countries?'; //sort query parameter -> desc or asc
const getSingleCountry = 'countries/'; ///v2/countries/:country add country name at the end



var worldButton = document.querySelector('#worldButton');
var eurButton = document.querySelector("#europeButton");
var asiaButton = document.querySelector("#asiaButton");
var americaButton = document.querySelector("#americaButton");
var africaButton = document.querySelector("#africaButton")
var otherButton = document.querySelector("#otherButton");



worldButton.addEventListener("click", callWorld);

eurButton.addEventListener("click", callEurope);

asiaButton.addEventListener("click", callAsia);

americaButton.addEventListener("click", callAmerica);

africaButton.addEventListener("click", callAfrica);

otherButton.addEventListener("click", callOther);


function callWorld() {
    document.getElementById("apiResponse").getElementsByTagName("tbody").innerHTML = getGlobalData();
}

function callEurope() {
    document.getElementById("apiResponse").getElementsByTagName("tbody").innerHTML = getEuropeanCountries();
}

function callAsia() {
    document.getElementById("apiResponse").getElementsByTagName("tbody").innerHTML = getAsianCountries();
}

function callAfrica() {
    document.getElementById("apiResponse").getElementsByTagName("tbody").innerHTML = getAfricanCountries();
}

function callAmerica() {
    document.getElementById("apiResponse").getElementsByTagName("tbody").innerHTML = getAmericaCountries();
}

function callOther() {
    document.getElementById("apiResponse").getElementsByTagName("tbody").innerHTML = getOtherCountries();
}


window.onload = () => {
    document.getElementById("worldButton").click();
}

// world metter
const getGlobalData = () => {
    const url = `${baseEndpoint}/${getAllCountries}desc`;

    $('#continent tr').remove();

    $('.loader').show();

    var allCountriesCollection = [];

    fetch(url)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            alert("System error");
        })
        .then((result) => {
            $('.loader').hide();
            for (var i = 0; i < result.length; i++) {
                allCountriesCollection.push(result[i]);
            }
            generateTableRows(allCountriesCollection.length);

            const contries = getCountriesPerContinentDetails(
                allCountriesCollection,
                allCountriesCollection.length
            );

            addCountriesOfEachContinentToHtml(contries);
        })
        .catch((err) => {
            console.error(err);
            alert("Could not get data.");
        });
};

//Retrieve all the European Countries
const getEuropeanCountries = () => {

    const url = `${baseEndpoint}/${getAllCountries}desc`;

    $('#continent tr').remove();

    $('.loader').show();

    var europeCountriesCollection = [];

    fetch(url)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            alert("Something went wrong.");
        })
        .then((result) => {
            $('.loader').hide();
            for (var i = 0; i < result.length; i++) {
                if ((result[i].continent === "Europe" || result[i].country === "Cyprus") && result[i].country != "Russia") {
                    europeCountriesCollection.push(result[i]);
                }
            }

            generateTableRows(europeCountriesCollection.length);

            const contriesOfContinent = getCountriesPerContinentDetails(
                europeCountriesCollection,
                europeCountriesCollection.length
            );
            console.log(contriesOfContinent);

            addCountriesOfEachContinentToHtml(contriesOfContinent);

        })
        .catch((err) => {
            console.error(err);
            alert("System error.");
        })
}

//Retrieve all the Asian Countries
const getAsianCountries = () => {

    const url = `${baseEndpoint}/${getAllCountries}desc`;

    $('#continent tr').remove();

    $('.loader').show();

    var asianCountriesCollection = [];

    fetch(url)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            alert("Something went wrong.");
        })
        .then((result) => {
            $('.loader').hide();
            for (var i = 0; i < result.length; i++) {
                if ((result[i].continent === "Asia" || result[i].country === "Russia") && result[i].country != "Cyprus") {
                    asianCountriesCollection.push(result[i]);
                }
            }

            generateTableRows(asianCountriesCollection.length);

            const contriesOfContinent = getCountriesPerContinentDetails(
                asianCountriesCollection,
                asianCountriesCollection.length
            );

            addCountriesOfEachContinentToHtml(contriesOfContinent);

        })
        .catch((err) => {
            console.error(err);
            alert("System error.");
        })
}


//Retrieve all the America Countries
const getAmericaCountries = () => {
    const url = `${baseEndpoint}/${getAllCountries}desc`;

    $('#continent tr').remove();

    $('.loader').show();

    var americanCountriesCollection = [];

    fetch(url)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            alert("Something went wrong.");
        })
        .then((result) => {
            $('.loader').hide();
            for (var i = 0; i < result.length; i++) {
                if (result[i].continent === "North America" || result[i].continent === "South America") {
                    americanCountriesCollection.push(result[i]);
                }
            }

            generateTableRows(americanCountriesCollection.length);

            const contriesOfContinent = getCountriesPerContinentDetails(
                americanCountriesCollection,
                americanCountriesCollection.length
            );

            addCountriesOfEachContinentToHtml(contriesOfContinent);

        })
        .catch((err) => {
            console.error(err);
            alert("System error.");
        })
}

//Retrieve all the Aftican Countries
const getAfricanCountries = () => {
    const url = `${baseEndpoint}/${getAllCountries}desc`;

    $('#continent tr').remove();

    $('.loader').show();

    var afticanCountriesCollection = [];

    fetch(url)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            alert("Something went wrong.");
        })
        .then((result) => {
            $('.loader').hide();
            for (var i = 0; i < result.length; i++) {
                if (result[i].continent === "Africa") {
                    afticanCountriesCollection.push(result[i]);
                }
            }

            generateTableRows(afticanCountriesCollection.length);

            const contriesOfContinent = getCountriesPerContinentDetails(
                afticanCountriesCollection,
                afticanCountriesCollection.length
            );

            addCountriesOfEachContinentToHtml(contriesOfContinent);

        })
        .catch((err) => {
            console.error(err);
            alert("System error.");
        })
}


//Retrieve all the Other Countries
const getOtherCountries = () => {
    const url = `${baseEndpoint}/${getAllCountries}desc`;

    $('#continent tr').remove();

    $('.loader').show();

    var otherCountriesCollection = [];

    fetch(url)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            alert("Something went wrong.");
        })
        .then((result) => {
            $('.loader').hide();
            for (var i = 0; i < result.length; i++) {
                if (result[i].continent != "Europe" && result[i].continent != "Africa" && result[i].continent != "South America" && result[i].continent != "North America" && result[i].continent != "Asia") {
                    otherCountriesCollection.push(result[i]);
                }
            }

            generateTableRows(otherCountriesCollection.length);

            const contriesOfContinent = getCountriesPerContinentDetails(
                otherCountriesCollection,
                otherCountriesCollection.length
            );

            addCountriesOfEachContinentToHtml(contriesOfContinent);

        })
        .catch((err) => {
            console.error(err);
            alert("System error.");
        })
}

const getCountriesPerContinentDetails = (countriesPerContinentCollecation, length) => {
    // length is used as the ceil
    return countriesPerContinentCollecation
        .sort((a, b) => b.cases - a.cases)
        .splice(0, length)
        .map((item) => {
            return {
                name: item.country,
                flag: item.countryInfo.flag,
                cases: item.cases.toLocaleString(),
                deaths: item.deaths.toLocaleString(),
                critical: item.critical.toLocaleString(),
                active: item.active.toLocaleString(),
                todayCases: item.todayCases === 0 ? item.todayCases.toLocaleString() : "+" + item.todayCases.toLocaleString(),
                todayDeaths: item.todayDeaths === 0 ? item.todayDeaths.toLocaleString() : "+" + item.todayDeaths.toLocaleString(),
                recovered: item.recovered.toLocaleString(),
                population: item.population.toLocaleString(),
            };
        });
};

const addCountriesOfEachContinentToHtml = (countriesOfEachContinent) => {
    let j = 0;

    for (const country of countriesOfEachContinent) {
        var oImg = document.createElement("img");
        oImg.setAttribute('src', country.flag);
        oImg.setAttribute('alt', 'flag');
        oImg.width = '50';
        oImg.height = '30';

        document.getElementById("row" + j).getElementsByTagName('td')[0].innerHTML =
            country.name;
        document.getElementById("row" + j).getElementsByTagName('td')[1].append(oImg);
        document.getElementById("row" + j).getElementsByTagName('td')[2].innerHTML =
            country.cases;
        document.getElementById("row" + j).getElementsByTagName('td')[3].innerHTML =
            country.deaths;
        document.getElementById("row" + j).getElementsByTagName('td')[4].innerHTML =
            country.critical;
        document.getElementById("row" + j).getElementsByTagName('td')[5].innerHTML =
            country.active;
        document.getElementById("row" + j).getElementsByTagName('td')[6].innerHTML =
            country.todayCases;
        if (country.todayCases != 0)
            document.getElementById("row" + j).getElementsByTagName('td')[6].style.color = 'darkorange';
        document.getElementById("row" + j).getElementsByTagName('td')[7].innerHTML =
            country.todayDeaths;
        if (country.todayDeaths != 0)
            document.getElementById("row" + j).getElementsByTagName('td')[7].style.color = 'red';
        document.getElementById("row" + j).getElementsByTagName('td')[8].innerHTML =
            country.recovered;
        document.getElementById("row" + j).getElementsByTagName('td')[8].style.color = '#006400'
        document.getElementById("row" + j).getElementsByTagName('td')[9].innerHTML =
            country.population;
        j++;
    }
};


const generateTableRows = (size) => {
    let newCell;

    for (let i = 0; i < size; i++) {
        var tableRef = document.getElementById('dataTable').getElementsByTagName('tbody')[0];


        // Insert a row in the table at row index 0
        let newRow = tableRef.insertRow(tableRef.rows.length);
        newRow.setAttribute("id", "row" + i);

        for (let j = 0; j < 10; j++) {
            // Insert a cell in the row at index 0
            newCell = newRow.insertCell(j);
        }
    }
}

