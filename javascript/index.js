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

var infoContent = document.getElementById("info").innerHTML;

//a function that returns information of covid-19 for a specific country that a user chooses.
function createRequest() {

    document.getElementById("tests").style.display = "none";
    document.getElementById("flag").style.display = "none";
    document.getElementById("info").style.display = "none";
    let request = new XMLHttpRequest();
    let country = document.getElementById("country2").value;
    var img_url = new Image();
    if (country === "All") {
        request.open("GET", base_endpoint + getAllData);
    } else {
        request.open("GET", base_endpoint + getSingleCountry + country);
    }
    request.send();
    $('.loader').show();
    request.onload = () => {
        if (request.status === 200) {
            document.getElementById("tests").style.display = "block";
            document.getElementById("flag").style.display = "block";
            document.getElementById("info").style.display = "none";
            $('.loader').hide();
            // console.log(JSON.parse(request.response));
            let totalCases = document.getElementById("totalCases").innerHTML = (JSON.parse(request.response).cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            let totalDeaths = document.getElementById("totalDeaths").innerHTML = (JSON.parse(request.response).deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            let activeCases = document.getElementById("activeCases").innerHTML = (JSON.parse(request.response).active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            let recovered = document.getElementById("recovered").innerHTML = (JSON.parse(request.response).recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            let deathsToday = document.getElementById("deathsToday").innerHTML = "+" + (JSON.parse(request.response).todayDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            let casesToday = document.getElementById("casesToday").innerHTML = "+" + (JSON.parse(request.response).todayCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            let tests = document.getElementById("tests").innerHTML = (JSON.parse(request.response).tests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

            // document.getElementById("flag").innerHTML += '<img src="'+img_url+'">';
            if (counter < 1) {
                document.getElementById("flag").appendChild(img_url);
            }

            if (country === 'All') {
                // document.getElementById("tests").innerHTML =  tests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                img_url.src = "../images/world.png";
                img_url.setAttribute('id', 'img_flag');
                document.getElementById("img_flag").src = img_url.src;
            } else {
                img_url.src = JSON.parse(request.response).countryInfo.flag;
                img_url.setAttribute('id', 'img_flag');
                document.getElementById("img_flag").src = img_url.src;
                // document.getElementById("tests").innerHTML = tests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " tests.";
            }
            document.getElementById("info").innerHTML = "";

            counter++;
        } else {
            if (country === '-1') {
                clearTheTable();
                // img_url.src = "";
                // document.getElementById("img_flag").src = img_url.src;
                $('.loader').hide();
                alert(request.status = "\n" + "Please select a country!");
                document.getElementById("info").style.display = "block";
            }else {
                // console.log(`error ${request.status} ${request.statusText}`);
                clearTheTable();
                // img_url.src = "";
                // document.getElementById("img_flag").src = img_url.src;
                alert(request.status + "\n" + "Information about " + country + " not found");
                $('.loader').hide();
                document.getElementById("info").style.display = "block";
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
    document.getElementById("info").innerHTML = infoContent;

}