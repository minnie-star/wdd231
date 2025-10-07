document.addEventListener("DOMContentLoaded", () => {
    // Create a new Date object
    const now = new Date();

    // Display date only
    const date = now.toLocaleDateString(); 

    // Display time only
    const time = now.toLocaleTimeString();

    // To show on a webpage:
    document.getElementById("date").textContent = date;
    document.getElementById("time").textContent = time;


    const navbutton = document.querySelector('#ham-btn');
    const navLinks = document.querySelector('#nav-bar');

    navbutton.addEventListener('click', () => {
        navbutton.classList.toggle('show');
        navLinks.classList.toggle('show');
    })

    //SELECT HTML ELEMENTS INT THE DOCUMENT
    const myTown = document.querySelector('#town');
    const myDescription = document.querySelector('#description');
    const myTemperature = document.querySelector('#temperature');
    const myGraphic = document.querySelector('#graphic');

    //CREATE REQUIRED VARIABLES FOR THE URL
    const myKey = "403f43814894415c1a2f02a1777a7a1c"
    const myLat = "-26.1788927995661"
    const myLong = "28.058559092766433"

    //CONSTRUCT A FULL PATH USING TEMPLATE LITERALS
    const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`

    // TRY TO GRAB THE CURRENT WEATHER DATA
    async function apiFetch() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
    }


    //DISPLAY THE JSON DATA ONTO MY WEB PAGE
    function displayResults(data) {
        myTown.innerHTML = data.name
        myDescription.innerHTML = data.weather[0].description
        myTemperature.innerHTML =`${data.main.temp}&deg;F`
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        myGraphic.setAttribute('SRC', iconsrc)
        myGraphic.setAttribute('alt', data.weather[0].description)
    }

    apiFetch();
    

    const apiKey = 'fe2d6bfedff74dc1b87b558fd485d128';
    
    // Calculate dates for past 6 months
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 1);

    const fromDate = sixMonthsAgo.toISOString().split('T')[0];
    const toDate = today.toISOString().split('T')[0];

    const url = `https://newsapi.org/v2/everything?q=Africa&from=${fromDate}&to=${toDate}&sortBy=publishedAt&language=en&apiKey=${apiKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.articles && data.articles.length > 0) {
        data.articles.forEach(article => {
            console.log(`
    Title: ${article.title}
    Source: ${article.source.name}
    Date: ${article.publishedAt}
    URL: ${article.url}
            `);
        });
        } else {
        console.log('No articles found for Africa in the past 6 months.');
        }
    })
    .catch(error => console.error('Error fetching news:', error));


})