//Novel Covid-19 APIs
const baseEndpoint = 'https://corona.lmao.ninja';
const getAllData = 'v2/all';
const getAllCountries = 'v2/countries?sort='; //sort query parameter -> desc or asc
const getSingleCountry = 'v2/countries'; ///v2/countries/:country add country name at the end
const getUnitedStatesOfAmerica = 'v2/states';
const getHOpkinsCSSE = 'v2/jhucsse';
const getHistory = 'v2/historical/'; //v2/historical/:country get history of specific country

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
    var singleCountryUrl = `${baseEndpoint}/${getSingleCountry}/${country}`;
    const getAllDataUrl = `${baseEndpoint}/${getAllData}`;

    if (country === "All") {
        url = getAllDataUrl;
    } else if (country === '-1') {
        clearTable();
        alert("\n" + "Please select a country!");
        document.getElementById("content-left").style.display = "none";
    } else {
        url = singleCountryUrl;
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
            document.getElementById("totalCases").innerHTML = result.cases.toLocaleString();
            document.getElementById("totalDeaths").innerHTML = result.deaths.toLocaleString();
            document.getElementById("activeCases").innerHTML = result.active.toLocaleString();
            document.getElementById("recovered").innerHTML = result.recovered.toLocaleString();
            document.getElementById("totalDeaths").innerHTML = result.deaths.toLocaleString();
            document.getElementById("deathsToday").innerHTML = "+" + result.todayDeaths.toLocaleString();
            document.getElementById("casesToday").innerHTML = "+" + result.todayCases.toLocaleString();
            document.getElementById("tests").innerHTML = result.tests.toLocaleString();
            document.getElementById("updateTime").innerHTML = convertLastUpdatedToNormalizedDate(result.updated);
            document.getElementById("flag").style.display = "block";


            /*Right content of the page*/
            if (counter < 1) {
                document.getElementById("flag").appendChild(img_url);
            }

            counter++;

            if (country === 'All') {
                img_url.src = "../assets/images/world.jpg";
                img_url.setAttribute('id', 'img_flag');
                img_url.setAttribute('width', '250px');
                img_url.setAttribute('height', '200px');
                document.getElementById("img_flag").src = img_url.src;

            } else {
                img_url.src = result.countryInfo.flag;
                img_url.setAttribute('id', 'img_flag');
                document.getElementById("img_flag").src = img_url.src;
            }

        }).catch((err) => {
            console.error(err);
            document.getElementById("content-left").style.display = "none";
            alert("Information about " + country + " are not available.");
        });
}

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