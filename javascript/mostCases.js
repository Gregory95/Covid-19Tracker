
const base_endpoint = 'https://corona.lmao.ninja/';
var getAllCountries = 'v2/countries?sort='; //sort query parameter -> desc or asc

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
let request = new XMLHttpRequest();


createRequest();


function createRequest() {

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
