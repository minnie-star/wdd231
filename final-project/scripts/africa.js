document.addEventListener("DOMContentLoaded", () => {
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
            const container = document.getElementById('africa-news');
            if (!container) { 
                console.error("Element with ID 'news' not found in HTML.");
                return;
            }

            container.innerHTML = '';

            if (!data.articles || data.articles.length === 0) {
                container.innerHTML = '<p>No article found</p>';
            } else {
                data.articles.forEach(article => {
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
            document.getElementById('africa-news').innerHTML = `<p>Error loading news: ${error.message}</p>`;
        });
}) 