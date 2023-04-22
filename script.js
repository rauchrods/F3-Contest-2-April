let fetchbtn = document.querySelector('#fetch-btn');

fetchbtn.addEventListener('click', () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }


});

function showPosition(position) {
    let cod = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }

    console.log(cod);
    let myiframe = document.querySelector("iframe");
    myiframe.src = `https://maps.google.com/maps?q=${cod.latitude},${cod.longitude}&hl=es;z=14&output=embed`;
    document.querySelector(".coordinatecontainer>span:nth-child(1)").innerText = `Lat: ${cod.latitude}`;
    document.querySelector(".coordinatecontainer>span:nth-child(2)").innerText = `Long: ${cod.longitude}`;
    document.querySelector(".coordinatecontainer").style.display = "grid";
    fetchbtn.style.display = "none";




    let apiID = "3fdc7fcbc732a035cdfee3954c2ad4b5";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${cod.latitude}&lon=${cod.longitude}&exclude={part}&appid=${apiID}`;

    let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${cod.latitude}&lon=${cod.longitude}&exclude={part}&appid=${apiID}`;

    getweatherDetails(url);


}

let temptitle = document.querySelector("#temp-detail");
let locationtitle = document.querySelector("#loc-detail");
let lattitle = document.querySelector(".pos>span:nth-child(1)");
let longtitle = document.querySelector(".pos>span:nth-child(2)");
let tztitle = document.querySelector("#tz-detail");
let wstitle = document.querySelector("#ws-detail");
let prtitle = document.querySelector("#pr-detail");
let humtitle = document.querySelector("#hum-detail");
let wdtitle = document.querySelector("#wd-detail");
let uvititle = document.querySelector("#uvi-detail");
let fltitle = document.querySelector("#fl-detail");

function getweatherDetails(url) {
    

    document.querySelector(".weather-container").style.display = "block";

    fetch(url).then((result) => {

        return result.json();


    }).then((weatherobj) => {
        temptitle.innerText = `Temperature: ${Math.round(weatherobj.main.temp - 273.15)} °C / ${Math.round((weatherobj.main.temp - 273.15) * 9 / 5 + 32)} °F / ${weatherobj.main.temp} Kelvin`;
        locationtitle.innerText = `Location: ${weatherobj.name}`;
        lattitle.innerText = `Lat: ${weatherobj.coord.lat}`;
        longtitle.innerText = `Long: ${weatherobj.coord.lon}`;
        tztitle.innerText = `Timezone: ${weatherobj.timezone} UTC / ${new Date().toLocaleTimeString()}`;
        wstitle.innerText = `Wind Speed: ${weatherobj.wind.speed} m/s`;
        prtitle.innerText = `Pressure: ${weatherobj.main.pressure} hPa`;
        humtitle.innerText = `Humidity: ${weatherobj.main.humidity}%`;
        wdtitle.innerText = `Wind Direction: ${weatherobj.wind.deg}°`;
        uvititle.innerText = `UV Index: NA`;
        fltitle.innerText = `Feels Like: ${weatherobj.main.feels_like} Kelvin / ${Math.round(weatherobj.main.feels_like - 273.15)} °C`;
    })
        .catch((err) => {
            console.log(err);
        });

}