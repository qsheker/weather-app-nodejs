const btn = document.getElementById('searchBtn');
const input = document.getElementById('cityInput');
const result = document.getElementById('result');
const errorBox = document.getElementById('error');
const toggleCountryBtn = document.getElementById('toggleCountryBtn');
const toggleSunriseBtn = document.getElementById('toggleSunriseBtn');
const countryInfo = document.getElementById('countryInfo');
const sunriseSunsetInfo = document.getElementById('sunriseSunsetInfo');

let currentWeatherData = null;

btn.addEventListener('click', async () => {
    const city = input.value.trim();
    result.classList.add('hidden');
    errorBox.classList.add('hidden');
    countryInfo.classList.add('hidden');
    sunriseSunsetInfo.classList.add('hidden');

    if (!city) {
        showError('City is required');
        return;
    }

    try {
        const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Error');
        }

        currentWeatherData = data.data;

        document.getElementById('cityName').textContent =
            data.data.city + ' (' + data.data.countryCode + ')';
        document.getElementById('description').textContent =
            data.data.weatherDescription;
        document.getElementById('temp').textContent = data.data.temperature;
        document.getElementById('feels').textContent = data.data.feelsLike;
        document.getElementById('humidity').textContent = data.data.humidity;
        document.getElementById('wind').textContent = data.data.windSpeed;

        result.classList.remove('hidden');

        await fetchCountryInfo(data.data.countryCode);

    } catch (err) {
        showError(err.message);
    }
});

async function fetchCountryInfo(countryCode) {
    try {
        const res = await fetch(`/api/extra/country?code=${encodeURIComponent(countryCode)}`);
        const data = await res.json();

        if (data.success) {
            updateCountryInfo(data.data);
        }
    } catch (error) {
        console.log('Could not fetch country info:', error.message);
    }
}

function updateCountryInfo(countryData) {
    document.getElementById('countryName').textContent = countryData.name;
    document.getElementById('countryPopulation').textContent =
        countryData.population.toLocaleString();
    document.getElementById('countryCapital').textContent = countryData.capital;
    document.getElementById('countryRegion').textContent = countryData.region;

    const flagContainer = document.getElementById('countryFlag');
    if (countryData.flag) {
        flagContainer.innerHTML = `<img src="${countryData.flag}" alt="${countryData.name} flag" class="flag">`;
    }
}

async function fetchSunriseSunset(lat, lon) {
    try {
        const res = await fetch(`/api/extra/sunrise-sunset?lat=${lat}&lon=${lon}`);
        const data = await res.json();

        if (data.success) {
            updateSunriseSunsetInfo(data.data);
        }
    } catch (error) {
        console.log('Could not fetch sunrise/sunset info:', error.message);
    }
}

function updateSunriseSunsetInfo(timeData) {
    document.getElementById('sunriseTime').textContent =
        timeData.sunrise_formatted || timeData.sunrise;
    document.getElementById('sunsetTime').textContent =
        timeData.sunset_formatted || timeData.sunset;
    document.getElementById('timezone').textContent = timeData.timezone;
}

toggleCountryBtn.addEventListener('click', () => {
    if (countryInfo.classList.contains('hidden')) {
        countryInfo.classList.remove('hidden');
        toggleCountryBtn.classList.add('active');
    } else {
        countryInfo.classList.add('hidden');
        toggleCountryBtn.classList.remove('active');
    }
});

toggleSunriseBtn.addEventListener('click', () => {
    if (sunriseSunsetInfo.classList.contains('hidden')) {
        if (currentWeatherData && currentWeatherData.lat && currentWeatherData.lon) {
            fetchSunriseSunset(currentWeatherData.lat, currentWeatherData.lon);
        } else {
            showError('Location coordinates not available');
            return;
        }
        sunriseSunsetInfo.classList.remove('hidden');
        toggleSunriseBtn.classList.add('active');
    } else {
        sunriseSunsetInfo.classList.add('hidden');
        toggleSunriseBtn.classList.remove('active');
    }
});

function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.remove('hidden');
}

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btn.click();
    }
});
