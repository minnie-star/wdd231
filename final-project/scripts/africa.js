document.addEventListener("DOMContentLoaded", () => {

    // Fetch and display African news
    async function loadNews() {
    try {
        const response = await fetch('data/news.json');
        const articles = await response.json();
        displayNews(articles, 'grid');
    } catch (error) {
        console.error('Error loading news:', error);
    }
    }

    // Display news articles
    function displayNews(articles, viewType) {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; 

    container.className = viewType === 'grid' ? 'news-grid' : 'news-list';

    articles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.classList.add('news-item');

        articleElement.innerHTML = `
        <img src="images/${article.image}" alt="${article.title}">
        <div class="news-content">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.link}" target="_blank">Read more</a>
        </div>
        `;

        container.appendChild(articleElement);
    });
    }

    // Event listeners for view toggle buttons
    document.getElementById('grid-view').addEventListener('click', async () => {
    const response = await fetch('data/news.json');
    const articles = await response.json();
    displayNews(articles, 'grid');
    });

    document.getElementById('list-view').addEventListener('click', async () => {
    const response = await fetch('data/news.json');
    const articles = await response.json();
    displayNews(articles, 'list');
    });

    // Initialize
    loadNews();

}) 