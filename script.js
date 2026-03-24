const GITHUB_USERNAME = 'matteolublanis'; 
const PROJECT_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`; 

async function fetchProjects() {
    const container = document.getElementById('project-grid');
    
    try {
        const response = await fetch(PROJECT_API);
        
        if (!response.ok) throw new Error('GitHub API limit reached or User not found');
        
        const repos = await response.json();
        
        container.innerHTML = '';

        repos
            .filter(repo => !repo.fork && repo.name !== `${GITHUB_USERNAME}.github.io`) 
            .forEach(repo => {
                const card = document.createElement('div');
                card.className = 'card';
                
                card.innerHTML = `
                    <h3>${repo.name.replace(/-/g, ' ')}</h3>
                    <p>${repo.description || "No description provided."}</p>
                    <div style="margin-top: 15px;">
                        <span style="font-size: 0.8rem; color: #38bdf8;">● ${repo.language || 'Code'}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" style="display: block; margin-top: 15px; color: #38bdf8; text-decoration: none; font-weight: bold;">View Repo →</a>
                `;
                container.appendChild(card);
            });
            
    } catch (error) {
        container.innerHTML = `<p>Oops! Could not load projects from GitHub.</p>`;
        console.error("GitHub Fetch Error:", error);
    }
}

window.onload = fetchProjects;
