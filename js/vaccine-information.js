"use strict";

//Novel Covid-19 APIs
const baseEndpoint = 'https://disease.sh/v3/covid-19';
const getVaccineProviders = 'vaccine';


//counter helps me to keep one flag image on the screen at a time.
var counter = 0;

window.onload = () => {
    getVaccinationProviders();
}


//a function that returnes information about vaccines completed in each country
const getVaccinationProviders = () => {

    const url = `${baseEndpoint}/${getVaccineProviders}`;

    fetch(url)
        .then((response) => response.json())
        .catch((err) => {
            console.error(err);
        })
        .then((result) => {

            const cards = document.getElementById('content');

            for (let i = 0; i < result.data.length; i++) {
                let name = result.data[i].sponsors[0].toString().trim();
                name = name.split(' ').join('');

                const content = `
                <div id="vaccine-details">
                    <h4 id="vaccine-name">${result.data[i].sponsors[0]} 
                        <i style="font-size:18px; color:blue; background-color: rgb(195, 218, 240); cursor: pointer;"
                        class="fa">&#xf067;</i>
                    </h4>
                    <h5 id="mechanism" style="color:#0b9fb3;">Mechanism: ${result.data[i].mechanism}</h5>
                    <div id="details">${result.data[i].details}</div>
                </div>
                `;

                cards.innerHTML += content;
            }

        }).catch((err) => {
            console.error(err);
            alert("Vaccination Providers are not available.");
        });
}


const generateCards = (size) => {
    let newCard;

    for (let i = 0; i < size; i++) {
        var tableRef = document.getElementById('dataTable').getElementsByTagName('tbody')[0];


        // Insert a row in the table at row index 0
        let newRow = tableRef.insertRow(tableRef.rows.length);
        newRow.setAttribute("id", "row" + i);

        for (let j = 0; j < 10; j++) {
            // Insert a cell in the row at index 0
            newCell = newRow.insertCell(j);
        }
    }
}

//helper
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
