document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const city = document.getElementById('city').value;
        
        // Fetch weather data from the server
        fetch(`/weather?city=${city}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched Data:', data); // Debugging line
                const weatherResult = document.getElementById('weather-result');
                if (data.error) {
                    weatherResult.textContent = data.error;
                } else {
                    weatherResult.innerHTML = `
                        <h2>${data.city}</h2>
                        <p>Temperature: ${data.temperature} °C</p>
                        <p>Weather: ${data.description}</p>
                        <p>Humidity: ${data.humidity} %</p>
                        <p>Wind Speed: ${data.windSpeed} m/s</p>
                    `;
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error); // Debugging line
                const weatherResult = document.getElementById('weather-result');
                weatherResult.textContent = 'Error fetching weather data';
            });
    });
});
