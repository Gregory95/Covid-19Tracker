//Novel Covid-19 APIs
const baseEndpoint = 'https://corona.lmao.ninja';
const getAllData = 'v2/all';
const getAllCountries = 'v2/countries?sort='; //sort query parameter -> desc or asc
const getSingleCountry = 'v2/countries/'; ///v2/countries/:country add country name at the end



//helpers
let europe_counter = 0;
let asia_counter = 0;
let america_counter = 0;
let africa_counter = 0;
let other_counter = 0;


var eurButton = document.querySelector("#btn1");
var asiaButton = document.querySelector("#btn2");
var americaButton = document.querySelector("#btn3");
var africaButton = document.querySelector("#btn4")
var otherButton = document.querySelector("#btn5");



eurButton.addEventListener("click", callEurope);

asiaButton.addEventListener("click", callAsia);

americaButton.addEventListener("click", callAmerica);

africaButton.addEventListener("click", callAfrica);

otherButton.addEventListener("click", callOther);



function callEurope() {
    document.getElementById("Europe").getElementsByTagName("tbody").innerHTML = getEuropeanCountries();
}

function callAsia() {
    document.getElementById("Asia").getElementsByTagName("tbody").innerHTML = getAsianCountries();
}

function callAfrica() {
    document.getElementById("Africa").getElementsByTagName("tbody").innerHTML = getAfricanCountries();
}

function callAmerica() {
    document.getElementById("America").getElementsByTagName("tbody").innerHTML = getAmericaCountries();
}

function callOther() {
    document.getElementById("Other").getElementsByTagName("tbody").innerHTML = getOtherCountries();
}





//Retrieve all the European Countries
const getEuropeanCountries = () => {

    const url = `${baseEndpoint}/${getAllCountries}desc`;

    $('#europe tr').remove();
    $('#asia tr').remove();
    $('#america tr').remove();
    $('#africa tr').remove();
    $('#other tr').remove();

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

            generateTableRows(europeCountriesCollection.length, "Europe");

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

    $('#europe tr').remove();
    $('#asia tr').remove();
    $('#america tr').remove();
    $('#africa tr').remove();
    $('#other tr').remove();

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

            generateTableRows(asianCountriesCollection.length, "Asia");

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

    $('#europe tr').remove();
    $('#asia tr').remove();
    $('#america tr').remove();
    $('#africa tr').remove();
    $('#other tr').remove();

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

            generateTableRows(americanCountriesCollection.length, "America");

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

    $('#europe tr').remove();
    $('#asia tr').remove();
    $('#america tr').remove();
    $('#africa tr').remove();
    $('#other tr').remove();

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

            generateTableRows(afticanCountriesCollection.length, "Africa");

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

    $('#europe tr').remove();
    $('#asia tr').remove();
    $('#america tr').remove();
    $('#africa tr').remove();
    $('#other tr').remove();

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

            generateTableRows(otherCountriesCollection.length, "Other");

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
        .map((item, index) => {
            return {
                name: item.country,
                cases: item.cases.toLocaleString(),
                deaths: item.deaths.toLocaleString(),
                critical: item.critical.toLocaleString(),
                active: item.active.toLocaleString(),
                todayCases: item.todayCases.toLocaleString(),
                todayDeaths: item.todayDeaths.toLocaleString(),
                recovered: item.recovered.toLocaleString(),
                population: item.population.toLocaleString(),
                nameId: `Country${index + 1}`,
                totalCasesId: `totalCases${index + 1}`,
                totalDeathsId: `totalDeaths${index + 1}`,
                totalCriticalId: `totalCritical${index + 1}`,
                totalActiveId: `totalActive${index + 1}`,
                totalTodayCasesId: `totalTodayCases${index + 1}`,
                totalTodayDeathsId: `totalTodayDeaths${index + 1}`,
                totalRecoveredId: `totalRecovered${index + 1}`,
                PopulationId: `Population${index + 1}`,
            };
        });
};

const addCountriesOfEachContinentToHtml = (countriesOfEachContinent) => {
    let j = 0;
    for (const country of countriesOfEachContinent) {
        // make the assignments only if the item exists in dom
        document.getElementById("row" + j).getElementsByTagName('td')[0].innerHTML = country.name;
        document.getElementById("row" + j).getElementsByTagName('td')[1].innerHTML =
            country.cases;
        document.getElementById("row" + j).getElementsByTagName('td')[2].innerHTML =
            country.deaths;
        document.getElementById("row" + j).getElementsByTagName('td')[3].innerHTML =
            country.critical;
        document.getElementById("row" + j).getElementsByTagName('td')[4].innerHTML =
            country.active;
        document.getElementById("row" + j).getElementsByTagName('td')[5].innerHTML =
            country.todayCases;
        document.getElementById("row" + j).getElementsByTagName('td')[6].innerHTML =
            country.todayDeaths;
        document.getElementById("row" + j).getElementsByTagName('td')[7].innerHTML =
            country.recovered;
        document.getElementById("row" + j).getElementsByTagName('td')[8].innerHTML = country.population;
        j++;
    }
};


generateTableRows = (size, name) => {
    let newCell;

    for (let i = 0; i < size; i++) {
        if (name === "Europe")
            var tableRef = document.getElementById('myTable1').getElementsByTagName('tbody')[0];
        else if (name === "Asia")
            var tableRef = document.getElementById('myTable2').getElementsByTagName('tbody')[0];
        else if (name === "America")
            var tableRef = document.getElementById('myTable3').getElementsByTagName('tbody')[0];
        else if (name === "Africa")
            var tableRef = document.getElementById('myTable4').getElementsByTagName('tbody')[0];
        else if (name === "Other")
            var tableRef = document.getElementById('myTable5').getElementsByTagName('tbody')[0];
        else break;

        // Insert a row in the table at row index 0
        let newRow = tableRef.insertRow(tableRef.rows.length);
        newRow.setAttribute("id", "row" + i);

        for (let j = 0; j < 9; j++) {
            // Insert a cell in the row at index 0
            newCell = newRow.insertCell(j);
        }
    }
}

