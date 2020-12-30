
const base_endpoint = 'https://corona.lmao.ninja/';
var getAllCountries = 'v2/countries?sort='; //sort query parameter -> desc or asc
var getContinents = 'v2/continents';
var getAllData = 'v2/all';

let max = 0;
let j = 0;
let i = 0;
let totalCases;
let countryName;
let flag;
var homeCasesObj = {
    name: "",
    number: 0,
    flag: ""
};
var newObj = {};
let maxCasesArray = [];
var globalCases = 0;

getContinentsData();
getGlobalData();
createRequest();


function getGlobalData() {
    let request = new XMLHttpRequest();

    request.open("GET", base_endpoint + getAllData);
    request.send();
    request.onload = () => {
        let result = JSON.parse(request.response);
        if (request.status === 200) {
            document.getElementById("worldCases").innerHTML = result.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            var d = new Date(result.updated);
            var formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
            var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
            var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
            var formattedTime = hours + ":" + minutes;

            formattedDate = formattedDate + " " + formattedTime;

            document.getElementById("lastUpdated").innerHTML = formattedDate;
        } else {
            alert(request.status + "\n" + "System error");
        }
    }
}

function createRequest() {
    let request = new XMLHttpRequest();
    var tempArray = [];
    var topFiveCountriesArray = [];
    request.open("GET", base_endpoint + getAllCountries + "desc");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let result = JSON.parse(request.response);
            for (i = 0; i < result.length; i++) {
                tempArray[i] = result[i].cases;
                homeCasesObj = {
                    name: result[i].country,
                    number: result[i].cases,
                    flag: result[i].countryInfo.flag
                }
                maxCasesArray.push(homeCasesObj);
            }
            tempArray = tempArray.sort((a, b) => b - a).slice(0, 5);
            let j = 0;
            for (i = 0; i < maxCasesArray.length; i++) {
                if (tempArray[j] === maxCasesArray[i].number) {
                    homeCasesObj = {
                        name: maxCasesArray[i].name,
                        number: maxCasesArray[i].number,
                        flag: maxCasesArray[i].flag
                    }
                    topFiveCountriesArray.push(homeCasesObj);
                    j++;
                    i = 0;
                    if (topFiveCountriesArray.length === 5)
                        i = 999;
                }
            }

            countryName = document.getElementById("Country1").innerHTML = topFiveCountriesArray[0].name;
            totalCases = document.getElementById("totalCases1").innerHTML = topFiveCountriesArray[0].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag1").src = topFiveCountriesArray[0].flag;

            countryName = document.getElementById("Country2").innerHTML = topFiveCountriesArray[1].name;
            totalCases = document.getElementById("totalCases2").innerHTML = topFiveCountriesArray[1].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag2").src = topFiveCountriesArray[1].flag;

            countryName = document.getElementById("Country3").innerHTML = topFiveCountriesArray[2].name;
            totalCases = document.getElementById("totalCases3").innerHTML = topFiveCountriesArray[2].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag3").src = topFiveCountriesArray[2].flag;

            countryName = document.getElementById("Country4").innerHTML = topFiveCountriesArray[3].name;
            totalCases = document.getElementById("totalCases4").innerHTML = topFiveCountriesArray[3].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag4").src = topFiveCountriesArray[3].flag;

            countryName = document.getElementById("Country5").innerHTML = topFiveCountriesArray[4].name;
            totalCases = document.getElementById("totalCases5").innerHTML = topFiveCountriesArray[4].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag5").src = topFiveCountriesArray[4].flag;
        } else {
            alert(request.status + "\n" + "System error");
        }
    }
}


function getContinentsData() {
    let request = new XMLHttpRequest();
    var europeCases;
    var asiaCases;
    var americaCases = 0;
    var africaCases;

    request.open("GET", base_endpoint + getContinents);
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let result = JSON.parse(request.response);

            for (var i = 0; i < result.length; i++) {
                if (result[i].continent === "Europe") {
                    europeCases = result[i].cases;
                }
                if (result[i].continent === "Asia") {
                    asiaCases = result[i].cases;
                }
                if (result[i].continent === "North America") {
                    americaCases += result[i].cases;
                }
                if (result[i].continent === "South America") {
                    americaCases += result[i].cases;
                }
                if (result[i].continent === "Africa") {
                    africaCases = result[i].cases;
                }

                // globalCases = globalCases + result[i].cases;
            }

            document.getElementById("europeCases").innerHTML = europeCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("asiaCases").innerHTML = asiaCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("americaCases").innerHTML = americaCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("africaCases").innerHTML = africaCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}