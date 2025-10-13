document.addEventListener("DOMContentLoaded", () => {

    // Load and filter South African news only
    async function loadSANews() {
    try {
        const response = await fetch('data/news.json');
        const articles = await response.json();

        // Filter only articles from South Africa
        const saArticles = articles.filter(article => 
    article.code == "za"
    )


        displayNews(saArticles, 'grid');
    } catch (error) {
        console.error('Error loading South Africa news:', error);
    }
    }

    // Display news in either grid or list format
    function displayNews(articles, viewType) {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    container.className = viewType === 'grid' ? 'news-grid' : 'news-list';

    articles.forEach(article => {
        const newsCard = document.createElement('article');
        newsCard.classList.add('news-item');

        newsCard.innerHTML = `
        <img src="images/${article.image}" alt="${article.title}">
        <div class="news-content">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.link}" target="_blank">Read more</a>
        </div>
        `;

        container.appendChild(newsCard);
    });
    }

    // Button event listeners
    document.getElementById('grid-view').addEventListener('click', async () => {
    const response = await fetch('data/news.json');
    const articles = await response.json();
    const saArticles = articles.filter(article => 
        article.code == 'za'
    );
    displayNews(saArticles, 'grid');
    });

    document.getElementById('list-view').addEventListener('click', async () => {
    const response = await fetch('data/news.json');
    const articles = await response.json();
    const saArticles = articles.filter(article => 
        article.code == 'za'
    );
    displayNews(saArticles, 'list');
    });

    // Initialize
    loadSANews();


})