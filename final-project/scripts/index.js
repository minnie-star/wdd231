document.addEventListener("DOMContentLoaded", () => {
    // Create a new Date object
    const now = new Date();

    // Display date only
    const date = now.toLocaleDateString();

    // Display time only
    const time = now.toLocaleTimeString();

    // To show on a webpage:
    const dateEl = document.getElementById("date");
    const timeEl = document.getElementById("time");
    if (dateEl) dateEl.textContent = date;
    if (timeEl) timeEl.textContent = time;

    // Navigation menu toggle
    const navbutton = document.querySelector('#ham-btn');
    const navLinks = document.querySelector('#nav-bar');
    if (navbutton && navLinks) {
        navbutton.addEventListener('click', () => {
            navbutton.classList.toggle('show');
            navLinks.classList.toggle('show');
        });
    }

    // DARK THEME TOGGLE
    document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    });


    // SELECT HTML ELEMENTS IN THE DOCUMENT
    const myTown = document.querySelector('#town');
    const myDescription = document.querySelector('#description');
    const myTemperature = document.querySelector('#temperature');
    const myGraphic = document.querySelector('#graphic');

    // CREATE REQUIRED VARIABLES FOR THE URL
    const myKey = "403f43814894415c1a2f02a1777a7a1c";
    const myLat = "-26.1788927995661";
    const myLong = "28.058559092766433";

    // CONSTRUCT A FULL PATH USING TEMPLATE LITERALS
    const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

    // TRY TO GRAB THE CURRENT WEATHER DATA
    async function apiFetch() {
        try {
            const response = await fetch(myURL);
            if (response.ok) {
                const data = await response.json();
                console.log(data); 
                displayResults(data);
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            console.log("Weather fetch error:", error.message);
            if (myDescription) {
                myDescription.textContent = "Weather data unavailable.";
            }
        }
    }

    // DISPLAY THE JSON DATA ONTO MY WEB PAGE
    function displayResults(data) {
        if (!data || !data.main || !data.weather || !data.weather[0]) {
            console.log("Invalid weather data format:", data);
            if (myDescription) myDescription.textContent = "Incomplete weather data.";
            return;
        }

        if (myTown) myTown.textContent = data.name || "Unknown location";
        if (myDescription) myDescription.textContent = data.weather[0].description || "No description";
        if (myTemperature) myTemperature.innerHTML = data.main.temp ? `${data.main.temp}&deg;F` : "N/A";

        if (myGraphic && data.weather[0].icon) {
            const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            myGraphic.setAttribute('src', iconsrc);
            myGraphic.setAttribute('alt', data.weather[0].description || "Weather icon");
        } else if (myGraphic) {
            myGraphic.removeAttribute('src');
            myGraphic.setAttribute('alt', 'No image available');
        }
    }

    apiFetch();

    

    const apiKey = 'fe2d6bfedff74dc1b87b558fd485d128';
    
    // Calculate dates for past 1 months
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 1);

    const fromDate = sixMonthsAgo.toISOString().split('T')[0];
    const toDate = today.toISOString().split('T')[0];

    const url = `https://newsapi.org/v2/everything?q=Africa&from=${fromDate}&to=${toDate}&sortBy=publishedAt&language=en&apiKey=${apiKey}`;
    
    
    fetch(url)
        .then(response => {
            if (!response.ok){
                throw new Error(`Network response was not ok:${response.status}`);
            }
            return response.json();
        })
        .then(data => {
        const container = document.getElementById('news');
        if (!container) { 
            console.error("Element with ID 'news' not found in HTML.");
            return;
        }

        container.innerHTML = '';

        if (!data.articles || data.articles.length === 0) {
            container.innerHTML = '<p>No article found</p>';
        } else {
            // Shuffle the articles randomly
            const shuffled = data.articles
                .sort(() => Math.random() - 0.5) 
                .slice(0, 8); 

            shuffled.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.classList.add('article');
                articleDiv.innerHTML = `
                    <img src="${article.urlToImage || 'https://placehold.co/300x180?text=No+Image'}" alt="No Image">
                    <h2>${article.title}</h2>
                    <p>${article.description || 'No description available.'}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                container.appendChild(articleDiv);
            });
        }
    })

        .catch(error => {
            document.getElementById('news').innerHTML = `<p>Error loading news: ${error.message}</p>`;
        });

    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
    });

    scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    });


})
