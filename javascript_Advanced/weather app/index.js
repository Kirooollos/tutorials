const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "b9fcf0faff38ecec26c62166327886bb";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            DisplayWeatherInfo(weatherData);

            
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
        
    } else {
        displayError("Please enter a valid city");
    }


}
);

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
        throw new Error("Could not fetch weather data");

    } 
    return await response.json();


}

function DisplayWeatherInfo(data) {
    console.log(data);
}

function getWeatherEmoji(weatherId) {
    
}

function displayError(message) {
    
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}
