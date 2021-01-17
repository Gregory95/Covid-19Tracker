"use strict";

//Novel Covid-19 APIs
const baseEndpoint = 'https://corona.lmao.ninja';
const getAllData = 'v2/all';
const getAllCountries = 'v2/countries?sort='; //sort query parameter -> desc or asc
const getSingleCountry = 'v2/countries'; ///v2/countries/:country add country name at the end
const getUnitedStatesOfAmerica = 'v2/states';
const getHOpkinsCSSE = 'v2/jhucsse';
const getHistory = 'v2/historical'; //v2/historical/:country get history of specific country



//counter helps me to keep one flag image on the screen at a time.
var counter = 0;

document.getElementById("flag").style.display = "none";
document.getElementById("content-left").style.display = "none";

document.getElementById("runApi").onclick = function setup() {

    document.getElementById("content-left").style.display = "block";
    getCountryData()
};
//a function that returns information of covid-19 for a specific country that a user chooses.
const getCountryData = () => {

    document.getElementById("flag").style.display = "none";

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

            /*Left content of the page*/
            document.getElementById("flag").style.display = "none";

            addCountryToHtml(result);
            if (days != "-1" && country != "All")
                getHistoricalDataByCountry(country);

            document.getElementById("flag").style.display = "block";


            /*Right content of the page*/
            if (counter < 1) {
                document.getElementById("flag").appendChild(img_url);
            }

            counter++;

            if (country === 'All')
                img_url.src = "../assets/images/world.jpg";
            else
                img_url.src = result.countryInfo.flag;

            img_url.setAttribute('id', 'img_flag');
            img_url.setAttribute('width', '250px');
            img_url.setAttribute('height', '200px');
            document.getElementById("img_flag").src = img_url.src;

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
            alert("Something went wrong.");
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
            alert("System could not find information about " + country + " for last " + days + " days");
        })

}


const addCountryToHtml = (country) => {

    document.getElementById("totalCases").innerHTML = country.cases.toLocaleString();
    document.getElementById("totalDeaths").innerHTML = country.deaths.toLocaleString();
    document.getElementById("activeCases").innerHTML = country.active.toLocaleString();
    document.getElementById("recovered").innerHTML = country.recovered.toLocaleString();
    document.getElementById("totalDeaths").innerHTML = country.deaths.toLocaleString();
    document.getElementById("deathsToday").innerHTML = "+" + country.todayDeaths.toLocaleString();
    document.getElementById("casesToday").innerHTML = "+" + country.todayCases.toLocaleString();
    document.getElementById("tests").innerHTML = country.tests.toLocaleString();
    document.getElementById("updateTime").innerHTML = convertLastUpdatedToNormalizedDate(country.updated)

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
