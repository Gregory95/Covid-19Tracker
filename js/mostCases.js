"use strict";

const baseEndpoint = "https://disease.sh/v3/covid-19";
const allCountriesEndpoint = "countries?sort="; //sort query parameter -> desc or asc
const continentsEndpoint = "continents";
const allDataEndpoint = "all";

google.load("visualization", "1", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawPieCharts);

window.onload = () => {
    getGlobalData();
    dataPerContinent();
    dataPerTopCountries();
};

const getGlobalData = () => {
    const url = `${baseEndpoint}/${allDataEndpoint}`;

    fetch(url)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            alert("System error");
        })
        .then((result) => {
            if (document.getElementById("worldCases")) {
                document.getElementById(
                    'worldCases'
                ).innerHTML = result.cases.toLocaleString();
                document.getElementById(
                    'lastUpdated'
                ).innerHTML = convertLastUpdatedToNormalizedDate(
                    result.updated
                );
                document.getElementById('affectedCountries').innerHTML = result.affectedCountries;
            }
            drawPieCharts(result.recovered, result.cases, result.active, result.deaths);
        });
};



const dataPerTopCountries = () => {
    const url = `${baseEndpoint}/${allCountriesEndpoint}desc`;
    fetch(url)
        .then((response) => response.json())
        .then((results) => {
            const countriesWithMostCases = getCountriesWithMostCases(
                results,
                5
            ); // top 5
            addCountriesWithMostCasesToHtml(countriesWithMostCases);
        });
};

const updateCasesPerContinentView = (results) => {
    const continentMapper = {
        America: "americaCases",
        Africa: "africaCases",
        Europe: "europeCases",
        Asia: "asiaCases",
    };

    const isAmerica = (result) =>
        ["North America", "South America"].includes(result.continent);

    // north and south america should be 1 number, sum up their cases
    const americaCases = results
        .filter((result) => isAmerica(result))
        .map((result) => result.cases)
        .reduce((a, b) => a + b);

    // remove south/north america
    let filteredResults = results.filter((r) => !isAmerica(r));

    // and add a new "entry" to the results, so we can use the mapping technique consistently
    // without hacky if checks and so on
    filteredResults.push({
        cases: americaCases,
        continent: "America",
    });

    // update the dom
    // oceania is missing, this must be wrong though
    for (const result of filteredResults) {
        const divId = continentMapper[result.continent];

        if (document.getElementById(divId)) {
            // make the assignments only if the item exists in dom
            document.getElementById(
                divId
            ).innerHTML = result.cases.toLocaleString();
        }
    }
};

const dataPerContinent = () => {
    const url = `${baseEndpoint}/${continentsEndpoint}`;

    fetch(url)
        .then((response) => response.json())
        .then((results) => {
            updateCasesPerContinentView(results);
        })
        .catch((err) => {
            console.error(err);
            // todo add alert could not fetch data
            alert(response.statusCode + "Error: System could not retrieve data.");
        });
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

const getCountriesWithMostCases = (casesPerCountyCollection, limit) => {
    // limit is used as the ceil
    return casesPerCountyCollection
        .sort((a, b) => b.cases - a.cases)
        .splice(0, limit)
        .map((item, index) => {
            return {
                name: item.country,
                number: item.cases.toLocaleString(),
                deaths: item.deaths.toLocaleString(),
                recovered: item.recovered.toLocaleString(),
                activeCases: item.active.toLocaleString(),
                flag: item.countryInfo.flag,
                totalCasesId: `totalCases${index + 1}`,
                nameId: `Country${index + 1}`,
                flagId: `flag${index + 1}`,
            };
        });
};

const addCountriesWithMostCasesToHtml = (countriesWithMostCases) => {
    for (const country of countriesWithMostCases) {
        if (document.getElementById(country.nameId)) {
            // make the assignments only if the item exists in dom
            document.getElementById(country.nameId).innerHTML = country.name;
            document.getElementById(country.totalCasesId).innerHTML =
                country.number;
            document.getElementById(country.flagId).src = country.flag;
        }
    }
};

// BEGIN PIE CHART
function drawPieCharts(recovered, cases, active, deaths) {
    // pie chart data
    var pieData = google.visualization.arrayToDataTable([
        ['Types', 'Current Data'],
        ['Recovered', recovered],
        ['Cases', cases],
        ['Active', active],
        ['Deaths', deaths]
    ]);
    // pie chart options
    var pieOptions = {
        backgroundColor: 'transparent',
        pieHole: 0.4,
        colors: ["olivedrab",
            "Khaki",
            "orange",
            "tomato",
            "cornflowerblue",
            "purple",
            "turquoise",
            "forestgreen",
            "navy",
            "gray"],
        pieSliceText: 'value',
        tooltip: {
            text: 'percentage'
        },
        fontName: 'Open Sans',
        chartArea: {
            width: '100%',
            height: '94%'
        },
        legend: {
            textStyle: {
                fontSize: 13
            }
        }
    };
    // draw pie chart
    var pieChart = new google.visualization.PieChart(document.getElementById('pie-chart'));
    pieChart.draw(pieData, pieOptions);
}