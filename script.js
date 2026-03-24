// Replace this URL with your actual external backend API later
const PROJECT_API = 'https://jsonplaceholder.typicode.com/posts?_limit=3'; 

async function fetchProjects() {
    const container = document.getElementById('project-grid');
    
    try {
        const response = await fetch(PROJECT_API);
        const data = await response.json();
        
        // Clear the loading text
        container.innerHTML = '';

        // Map through data and create cards
        data.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${project.title.substring(0, 20)}</h3>
                <p>${project.body.substring(0, 100)}...</p>
                <a href="#" style="color: #38bdf8; text-decoration: none;">View Project →</a>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = '<p>Error loading projects. Check console for details.</p>';
        console.error("API Fetch Error:", error);
    }
}

// Initialize fetch on load
window.onload = fetchProjects;