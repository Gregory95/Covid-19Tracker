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
    document.getElementById("Africa").getElementsByTagName("tbody").innerHTML = getAfticanCountries();
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

    let j = 0;
    let i = 0;

    $("#europe tr").remove();
    $("#asia tr").remove();
    $("#america tr").remove();
    $("#africa tr").remove();
    $("#other tr").remove();

    $('.loader').show();

    fetch(url)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
            alert("System error");
        })
        .then((result) => {
            console.log(result);
            $('.loader').hide();
            europe_counter = 0;
            for (let k = 0; k < 221; k++) {
                if (result[k].continent === "Europe") {
                    europe_counter++;
                }


                generateTableRows(europe_counter, "Europe");
                for (i = 0; i < europe_counter; i++) {
                    //API has a mistake on Cyprus, it gives it as Asian country but its not.
                    if (result[i].continent === "Europe" || result[i].country === "Cyprus") {
                        document.getElementById("row" + j).getElementsByTagName('td')[0].innerHTML = result[i].country;
                        document.getElementById("row" + j).getElementsByTagName('td')[1].innerHTML = result[i].cases.toLocalString();
                        document.getElementById("row" + j).getElementsByTagName('td')[2].innerHTML = result[i].deaths.toLocalString();
                        document.getElementById("row" + j).getElementsByTagName('td')[3].innerHTML = result[i].critical.toLocalString();
                        document.getElementById("row" + j).getElementsByTagName('td')[4].innerHTML = result[i].active.toLocalString();
                        document.getElementById("row" + j).getElementsByTagName('td')[5].innerHTML = "+" + result[i].todayCases.toLocalString();
                        document.getElementById("row" + j).getElementsByTagName('td')[6].innerHTML = "+" + result[i].todayDeaths.toLocalString();
                        document.getElementById("row" + j).getElementsByTagName('td')[7].innerHTML = result[i].recovered.toLocalString();
                        document.getElementById("row" + j).getElementsByTagName('td')[8].innerHTML = result[i].population.toLocalString();
                        j++;
                    }
                }
            }
        })
        .catch((err) => {
            console.error(err);
            alert("System error");
        })
}

//Retrieve all the Asian Countries
const getAsianCountries = () => {
    let j = 0;
    let i = 0;

    $("#europe tr").remove();
    $("#asia tr").remove();
    $("#america tr").remove();
    $("#africa tr").remove();
    $("#other tr").remove();

    let request = new XMLHttpRequest();
    request.open("GET", base_endpoint + getAllCountries + "desc");
    request.send();
    $('.loader').show();
    request.onload = () => {
        let result = JSON.parse(request.response);
        if (request.status === 200) {
            $('.loader').hide();
            asia_counter = 0;
            for (let k = 0; k < result.length; k++) {
                if (result[k].continent === "Asia") {
                    asia_counter++;
                }
            }

            generateTableRows(asia_counter, "Asia");
            for (i = 0; i < result.length; i++) {
                //API has a mistake on Cyprus, it gives it as Asian country but its not.
                if (result[i].continent === "Asia" && result[i].country != "Cyprus") {
                    document.getElementById("row" + j).getElementsByTagName('td')[0].innerHTML = result[i].country;
                    document.getElementById("row" + j).getElementsByTagName('td')[1].innerHTML = result[i].cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[2].innerHTML = result[i].deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[3].innerHTML = result[i].critical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[4].innerHTML = result[i].active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[5].innerHTML = "+" + result[i].todayCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[6].innerHTML = "+" + result[i].todayDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[7].innerHTML = result[i].recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[8].innerHTML = result[i].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    j++;
                }
            }
        } else {
            alert(request.status + "\n" + "System error");
        }
    }
}


//Retrieve all the America Countries
const getAmericaCountries = () => {
    let j = 0;
    let i = 0;

    $("#europe tr").remove();
    $("#asia tr").remove();
    $("#america tr").remove();
    $("#africa tr").remove();
    $("#other tr").remove();

    let request = new XMLHttpRequest();
    request.open("GET", base_endpoint + getAllCountries + "desc");
    request.send();
    $('.loader').show();
    request.onload = () => {
        let result = JSON.parse(request.response);
        if (request.status === 200) {
            $('.loader').hide();
            america_counter = 0;
            for (let k = 0; k < result.length; k++) {
                if (result[k].continent === "North America" || result[k].continent === "South America") {
                    america_counter++;
                }
            }


            generateTableRows(america_counter, "America");
            for (i = 0; i < result.length; i++) {
                if (result[i].continent === "North America" || result[i].continent === "South America") {
                    document.getElementById("row" + j).getElementsByTagName('td')[0].innerHTML = result[i].country;
                    document.getElementById("row" + j).getElementsByTagName('td')[1].innerHTML = result[i].cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[2].innerHTML = result[i].deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[3].innerHTML = result[i].critical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[4].innerHTML = result[i].active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[5].innerHTML = "+" + result[i].todayCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[6].innerHTML = "+" + result[i].todayDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[7].innerHTML = result[i].recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[8].innerHTML = result[i].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    j++;
                }
            }
        } else {
            alert(request.status + "\n" + "System error");
        }
    }
}

//Retrieve all the Aftican Countries
const getAfticanCountries = () => {
    let j = 0;
    let i = 0;

    $("#europe tr").remove();
    $("#asia tr").remove();
    $("#america tr").remove();
    $("#africa tr").remove();
    $("#other tr").remove();

    let request = new XMLHttpRequest();
    request.open("GET", base_endpoint + getAllCountries + "desc");
    request.send();
    $('.loader').show();
    request.onload = () => {
        let result = JSON.parse(request.response);
        if (request.status === 200) {
            $('.loader').hide();
            africa_counter = 0;
            for (let k = 0; k < result.length; k++) {
                if (result[k].continent === "Africa") {
                    africa_counter++;
                }
            }


            generateTableRows(africa_counter, "Africa");
            for (i = 0; i < result.length; i++) {
                if (result[i].continent === "Africa") {
                    document.getElementById("row" + j).getElementsByTagName('td')[0].innerHTML = result[i].country;
                    document.getElementById("row" + j).getElementsByTagName('td')[1].innerHTML = result[i].cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[2].innerHTML = result[i].deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[3].innerHTML = result[i].critical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[4].innerHTML = result[i].active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[5].innerHTML = "+" + result[i].todayCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[6].innerHTML = "+" + result[i].todayDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[7].innerHTML = result[i].recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[8].innerHTML = result[i].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    j++;
                }
            }
        } else {
            alert(request.status + "\n" + "System error");
        }
    }
}


//Retrieve all the Other Countries
const getOtherCountries = () => {
    let j = 0;
    let i = 0;

    $("#europe tr").remove();
    $("#asia tr").remove();
    $("#america tr").remove();
    $("#africa tr").remove();
    $("#other tr").remove();

    let request = new XMLHttpRequest();
    request.open("GET", base_endpoint + getAllCountries + "desc");
    request.send();
    $('.loader').show();
    request.onload = () => {
        let result = JSON.parse(request.response);
        if (request.status === 200) {
            $('.loader').hide();
            other_counter = 0;
            for (let k = 0; k < result.length; k++) {
                if (result[k].continent != "Europe" && result[k].continent != "Asia" && result[k].continent != "Africa" && result[k].continent != "North America" && result[k].continent != "South America") {
                    other_counter++;
                }
            }


            generateTableRows(other_counter, "Other");
            for (i = 0; i < result.length; i++) {
                if (result[i].continent != "Europe" && result[i].continent != "Asia" && result[i].continent != "Africa" && result[i].continent != "North America" && result[i].continent != "South America") {
                    document.getElementById("row" + j).getElementsByTagName('td')[0].innerHTML = result[i].country;
                    document.getElementById("row" + j).getElementsByTagName('td')[1].innerHTML = result[i].cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[2].innerHTML = result[i].deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[3].innerHTML = result[i].critical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[4].innerHTML = result[i].active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[5].innerHTML = "+" + result[i].todayCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[6].innerHTML = "+" + result[i].todayDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[7].innerHTML = result[i].recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.getElementById("row" + j).getElementsByTagName('td')[8].innerHTML = result[i].population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    j++;
                }
            }
        } else {
            alert(request.status + "\n" + "System error");
        }
    }
}


const generateTableRows = (size, name) => {
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

