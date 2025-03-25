const API_KEY = '976cf6373f5d844070edd6bb3fec7595';

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '불러오는 중...';

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
        );

        if (!response.ok) {
            throw new Error('도시를 찾을 수 없어요 😢');
        }

        const data = await response.json();
        const { name, main, weather } = data;

        resultDiv.innerHTML = `
        📍 <strong>${name}</strong><br/>
        🌡️ 온도: ${main.temp}°C<br/>
        🌥️ 상태: ${weather[0].description}
        `;

    } catch (err) {
        resultDiv.innerHTML = err.message;
    }
}