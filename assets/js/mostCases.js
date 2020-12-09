
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
        } else {
            alert(request.status + "\n" + "System error");
        }
    }
}

function createRequest() {
    let request = new XMLHttpRequest();

    request.open("GET", base_endpoint + getAllCountries + "desc");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let result = JSON.parse(request.response);
            for (i = 0; i < result.length; i++) {
                    homeCasesObj = {
                        name: result[i].country,
                        number: result[i].cases,
                        flag: result[i].countryInfo.flag
                    }
                    maxCasesArray.push(homeCasesObj);
            }

            console.log(maxCasesArray);

            countryName = document.getElementById("Country1").innerHTML = maxCasesArray[0].name;
            totalCases = document.getElementById("totalCases1").innerHTML = maxCasesArray[0].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag1").src = maxCasesArray[0].flag;

            countryName = document.getElementById("Country2").innerHTML = maxCasesArray[1].name;
            totalCases = document.getElementById("totalCases2").innerHTML = maxCasesArray[1].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag2").src = maxCasesArray[1].flag;

            countryName = document.getElementById("Country3").innerHTML = maxCasesArray[2].name;
            totalCases = document.getElementById("totalCases3").innerHTML = maxCasesArray[2].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag3").src = maxCasesArray[2].flag;

            countryName = document.getElementById("Country4").innerHTML = maxCasesArray[3].name;
            totalCases = document.getElementById("totalCases4").innerHTML = maxCasesArray[3].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag4").src = maxCasesArray[3].flag;

            countryName = document.getElementById("Country5").innerHTML = maxCasesArray[4].name;
            totalCases = document.getElementById("totalCases5").innerHTML = maxCasesArray[4].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag5").src = maxCasesArray[4].flag;
        } else {
            alert(request.status + "\n" + "System error");
            // console.log(`error ${request.status} ${request.statusText}`);
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
            
            for (var i = 0; i < result.length; i++)
            {
                if (result[i].continent === "Europe")
                {
                    europeCases = result[i].cases;
                }
                if (result[i].continent === "Asia")
                {
                    asiaCases = result[i].cases;
                }
                if (result[i].continent === "North America")
                {
                    americaCases += result[i].cases;
                }
                if (result[i].continent === "South America")
                {
                    americaCases += result[i].cases;
                }
                if (result[i].continent === "Africa")
                {
                    africaCases = result[i].cases;
                }

                // globalCases = globalCases + result[i].cases;
            }

            console.log(europeCases);
            console.log(asiaCases);
            console.log(americaCases);

            document.getElementById("europeCases").innerHTML = europeCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("asiaCases").innerHTML = asiaCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("americaCases").innerHTML = americaCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("africaCases").innerHTML = africaCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}