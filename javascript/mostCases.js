const base_endpoint = 'https://corona.lmao.ninja/';
const getAllData = 'v2/all';
var getAllCountries = 'v2/countries?sort='; //sort query parameter -> desc or asc


createRequest();
getGlobal();


function getGlobal()
{
    let request = new XMLHttpRequest();
    request.open("GET", base_endpoint + getAllData);
    request.send();
    request.onload = () => {
    if (request.status === 200) {
        let result = JSON.parse(request.response);

        let totalCases = document.getElementById("totalCases").innerHTML = (JSON.parse(request.response).cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        let totalDeaths = document.getElementById("totalDeaths").innerHTML = (JSON.parse(request.response).deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        let activeCases = document.getElementById("activeCases").innerHTML = (JSON.parse(request.response).active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        let recovered = document.getElementById("recovered").innerHTML = (JSON.parse(request.response).recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        let deathsToday = document.getElementById("deathsToday").innerHTML = "+" + (JSON.parse(request.response).todayDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        let casesToday = document.getElementById("casesToday").innerHTML = "+" + (JSON.parse(request.response).todayCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        let tests = document.getElementById("tests").innerHTML = (JSON.parse(request.response).tests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}else {
    // console.log(`error ${request.status} ${request.statusText}`);
    // img_url.src = "";
    // document.getElementById("img_flag").src = img_url.src;
    alert(request.status + "\n" + "Information not found");
}
    }
}

function createRequest() {

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
    let maxCasesArray = [];
    let request = new XMLHttpRequest();
    var img_url = new Image();
    request.open("GET", base_endpoint + getAllCountries + "desc");
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let result = JSON.parse(request.response);
            max = result[0].cases;
            // console.log(max);
            // console.log(result);
            // console.log(maxCasesArray.length);
            // let totalCases = document.getElementById("totalCases").innerHTML = (JSON.parse(request.response).cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            for (i = 0; i < result.length; i++) {
                if (result[i].country === "Russia" || result[i].country === "USA" || result[i].country === "India" || result[i].country === "Brazil" || result[i].country === "South Africa") {
                    // max = result[i].cases;
                    homeCasesObj = {
                        name: result[i].country,
                        number: result[i].cases,
                        flag: result[i].countryInfo.flag
                    }
                    // console.log(max);
                    // console.log(homeCasesObj.name);
                    maxCasesArray.push(homeCasesObj);
                    // console.log(maxCasesArray[j]);
                    // console.log(j);
                    // console.log(i);
                    // console.log(homeCasesObj.flag);
                    j++;
                }
            }


            maxCasesArray.sort();



            console.log(maxCasesArray);

            
            countryName = document.getElementById("Country1").innerHTML = maxCasesArray[4].name;
            totalCases = document.getElementById("totalCases1").innerHTML = maxCasesArray[4].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag1").src = maxCasesArray[4].flag;

            countryName = document.getElementById("Country2").innerHTML = maxCasesArray[0].name;
            totalCases = document.getElementById("totalCases2").innerHTML = maxCasesArray[0].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag2").src = maxCasesArray[0].flag;

            countryName = document.getElementById("Country3").innerHTML = maxCasesArray[1].name;
            totalCases = document.getElementById("totalCases3").innerHTML = maxCasesArray[1].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag3").src = maxCasesArray[1].flag;

            countryName = document.getElementById("Country4").innerHTML = maxCasesArray[2].name;
            totalCases = document.getElementById("totalCases4").innerHTML = maxCasesArray[2].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag4").src = maxCasesArray[2].flag;

            countryName = document.getElementById("Country5").innerHTML = maxCasesArray[3].name;
            totalCases = document.getElementById("totalCases5").innerHTML = maxCasesArray[3].number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            flag = document.getElementById("flag5").src = maxCasesArray[3].flag;

       


        } else {
            alert(request.status + "\n" + "System error");
            // console.log(`error ${request.status} ${request.statusText}`);
        }
    }
}
