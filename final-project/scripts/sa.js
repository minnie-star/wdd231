document.addEventListener("DOMContentLoaded", () => {

    const apiKey = 'f357dac3cb6e63d1fe460195eebeec5f';

    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 1); 

    const fromDate = sixMonthsAgo.toISOString().split('T')[0];
    const toDate = today.toISOString().split('T')[0];


    // filter South African news
    const saUrl = `https://gnews.io/api/v4/search?q=example&from=${fromDate}&to=${toDate}&apikey=${apiKey}`;

    fetch(saUrl)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        const container = document.getElementById('sa-news');
        //console.log("API data received:", data);
        
        if (!container) {
            container.innerHTML = `<p>Error loading SA news: ${err.message}</p>`;
        } 

        container.innerHTML = '';

        if (!data.articles || data.articles.length === 0) {
            container.innerHTML = '<p>No article found</p>';
        } else {
            data.articles.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.classList.add('article');
                articleDiv.innerHTML = `
                <img src=${article.urlToImage || 'https://placehold.co/300x180?text=No+Image'}" alt="No Image">
                <h2>${article.title}</h2>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank">Read more</a>`;

                container.appendChild(articleDiv);
            });
        }

    })
    .catch(error => {
        document.getElementById('sa-news').innerHTML = `<p>Error loading news: ${error.message}</p>`
    });
  
    

})