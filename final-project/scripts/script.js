// Load random spotlight news
    async function loadSpotlights() {
    try {
        const response = await fetch('data/news.json');
        if (!response.ok) {
        console.error('Failed to load news.json:', response.status);
        return;
        }

        const articles = await response.json();

        // Validate data type
        if (!Array.isArray(articles) || articles.length === 0) {
        console.warn('No valid articles found in news.json');
        return;
        }

        // Pick 4–5 random unique articles
        const spotlights = getRandomArticles(articles, 5);
        if (spotlights.length === 0) {
        console.warn('No articles available for spotlight display');
        return;
        }

        displaySpotlights(spotlights);
    } catch (error) {
        console.error('Error loading spotlights:', error);
    }
    }

    // Get random articles without repetition
    function getRandomArticles(articles, count) {
    if (!Array.isArray(articles)) return [];
    const shuffled = [...articles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
    }

    // Display the spotlight section
    function displaySpotlights(spotlights) {
    const container = document.getElementById('spotlight-container');
    if (!container) {
        console.error('Spotlight container not found in HTML');
        return;
    }

    container.innerHTML = '';

    spotlights.forEach(article => {

        const spotlightItem = document.createElement('article');
        spotlightItem.classList.add('spotlight-item');

        spotlightItem.innerHTML = `
        <img src="${article.image}" alt="${article.title}">
        <div class="spotlight-content">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.link}" target="_blank">Read more</a>
        </div>
        `;

        container.appendChild(spotlightItem);
    });
    }

    // Initialize
    
    loadSpotlights();