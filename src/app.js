const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    
    try {
        // Fetch location data from MetaWeather
        const locationResponse = await fetch(`https://www.metaweather.com/api/location/search/?query=${city}`);
        const locationData = await locationResponse.json();

        console.log('Location Data:', locationData); // Debugging line

        if (locationData.length === 0) {
            res.json({ error: 'City not found' });
            return;
        }

        const woeid = locationData[0].woeid;

        // Fetch weather data from MetaWeather
        const weatherResponse = await fetch(`https://www.metaweather.com/api/location/${woeid}/`);
        const weatherData = await weatherResponse.json();

        console.log('Weather Data:', weatherData); // Debugging line

        const todayWeather = weatherData.consolidated_weather[0];

        const weather = {
            city: weatherData.title,
            temperature: todayWeather.the_temp.toFixed(2),
            description: todayWeather.weather_state_name,
            humidity: todayWeather.humidity,
            windSpeed: todayWeather.wind_speed.toFixed(2)
        };

        res.json(weather);
    } catch (error) {
        console.error('Error:', error); // Debugging line
        res.json({ error: 'Error fetching weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
