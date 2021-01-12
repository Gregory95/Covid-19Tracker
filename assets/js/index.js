//Novel Covid-19 APIs
const base_endpoint = 'https://corona.lmao.ninja/';
const getAllData = 'v2/all';
var getAllCountries = 'v2/countries?sort='; //sort query parameter -> desc or asc
var getSingleCountry = 'v2/countries/'; ///v2/countries/:country add country name at the end
const getUnitedStatesOfAmerica = 'v2/states';
const getHOpkinsCSSE = 'v2/jhucsse';
var getHistory = 'v2/historical/'; //v2/historical/:country get history of specific country
var counter = 0;

document.getElementById("tests").style.display = "none";
document.getElementById("flag").style.display = "none";
document.getElementById("content-left").style.display = "none";



document.getElementById("runApi").onclick = function setup() {

    document.getElementById("content-left").style.display = "block";
    createRequest()
};


//a function that returns information of covid-19 for a specific country that a user chooses.
function createRequest() {

    document.getElementById("tests").style.display = "none";
    document.getElementById("flag").style.display = "none";
    let request = new XMLHttpRequest();
    let country = document.getElementById("country2").value;
    var img_url = new Image();
    if (country === "All") {
        request.open("GET", base_endpoint + getAllData);
    } else {
        request.open("GET", base_endpoint + getSingleCountry + country);
    }
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            let result = JSON.parse(request.response);

            var d = new Date(result.updated);
            var formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
            var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
            var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
            var formattedTime = hours + ":" + minutes;

            formattedDate = formattedDate + " " + formattedTime;

            document.getElementById("tests").style.display = "block";
            document.getElementById("flag").style.display = "block";
            document.getElementById("totalCases").innerHTML = result.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("totalDeaths").innerHTML = result.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("activeCases").innerHTML = result.active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("recovered").innerHTML = result.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("deathsToday").innerHTML = "+" + result.todayDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("casesToday").innerHTML = "+" + result.todayCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("tests").innerHTML = result.tests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById("updateTime").innerHTML = formattedDate;

            if (counter < 1) {
                document.getElementById("flag").appendChild(img_url);
            }

            if (country === 'All') {
                img_url.src = "/assets/img/images/world.jpg";
                img_url.setAttribute('id', 'img_flag');
                img_url.setAttribute('width', '500px');
                img_url.setAttribute('height', '400px');
                document.getElementById("img_flag").src = img_url.src;
            } else {
                img_url.src = JSON.parse(request.response).countryInfo.flag;
                img_url.setAttribute('id', 'img_flag');
                document.getElementById("img_flag").src = img_url.src;
            }
            counter++;
        } else {
            if (country === '-1') {
                clearTheTable();
                alert(request.status = "\n" + "Please select a country!");
            } else {
                clearTheTable();
                alert(request.status + "\n" + "Information about " + country + " not found");
            }
        }
    }
}


function clearTheTable() {
    document.getElementById("totalCases").innerHTML = "";
    document.getElementById("totalDeaths").innerHTML = "";
    document.getElementById("activeCases").innerHTML = "";
    document.getElementById("recovered").innerHTML = "";
    document.getElementById("deathsToday").innerHTML = "";
    document.getElementById("casesToday").innerHTML = "";
    document.getElementById("tests").innerHTML = "";
}