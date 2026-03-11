// Load profile data and populate the website
async function loadProfileData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Populate profile sections
        populateHero(data.profile, data.statistics);
        populatePlatforms(data.platforms);
        populateAchievements(data.achievements);
        populateExpertise(data.expertise, data.skills);
        populateContributions(data.confluence, data.statistics, data.teams);
        populateTimeline(data.timeline);
        populateMetadata(data.metadata);
        
    } catch (error) {
        console.error('Error loading profile data:', error);
    }
}

function populateHero(profile, statistics) {
    // Basic profile info
    document.getElementById('profileName').textContent = profile.name;
    document.getElementById('profileTagline').textContent = profile.tagline;
    document.getElementById('profileBio').textContent = profile.bio;
    document.getElementById('profileLocation').textContent = profile.location;
    document.getElementById('profileEmail').textContent = profile.email;
    document.getElementById('profileEmail').href = `mailto:${profile.email}`;
    document.getElementById('profilePhone').textContent = profile.phone;
    
    // Statistics
    document.getElementById('statEpics').textContent = statistics.epicsOwned;
    document.getElementById('statStoryPoints').textContent = statistics.storyPointsDelivered;
    document.getElementById('statPlatforms').textContent = statistics.platformsLed;
    document.getElementById('statTeams').textContent = statistics.teamsManaged;
    
    // Profile photo placeholder (will be replaced with LinkedIn photo)
    const profilePhoto = document.getElementById('profilePhoto');
    profilePhoto.alt = profile.name;
}

function populatePlatforms(platforms) {
    const grid = document.getElementById('platformsGrid');
    grid.innerHTML = '';
    
    platforms.forEach(platform => {
        const card = document.createElement('div');
        card.className = 'platform-card';
        
        card.innerHTML = `
            <div class="platform-header">
                <div>
                    <div class="platform-name">${platform.name}</div>
                    <div class="platform-role">${platform.role}</div>
                </div>
                <div class="platform-status">${platform.status}</div>
            </div>
            <div class="platform-description">${platform.description}</div>
            <div class="platform-impact">
                <div class="platform-impact-label">Impact</div>
                <div class="platform-impact-value">${platform.impact}</div>
            </div>
            <div class="platform-tech">
                ${platform.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="platform-meta">
                <div class="meta-item">
                    <svg class="icon" style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    ${platform.epics} Epics
                </div>
                ${platform.milestone ? `<div class="meta-item">🎯 ${platform.milestone}</div>` : ''}
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function populateAchievements(achievements) {
    const timeline = document.getElementById('achievementsTimeline');
    timeline.innerHTML = '';
    
    achievements.forEach(achievement => {
        const item = document.createElement('div');
        item.className = 'achievement-item';
        
        item.innerHTML = `
            <div class="achievement-date">${achievement.date}</div>
            <div class="achievement-content">
                <div class="achievement-category">${achievement.category}</div>
                <h3 class="achievement-title">${achievement.title}</h3>
                <p class="achievement-description">${achievement.description}</p>
                <div class="achievement-impact">📊 ${achievement.impact}</div>
            </div>
        `;
        
        timeline.appendChild(item);
    });
}

function populateExpertise(expertise, skills) {
    // Core expertise
    const coreExpertise = document.getElementById('coreExpertise');
    coreExpertise.innerHTML = expertise.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');
    
    // Languages
    const languages = document.getElementById('skillsLanguages');
    languages.innerHTML = skills.languages.map(lang => 
        `<span class="tech-tag">${lang}</span>`
    ).join('');
    
    // Cloud
    const cloud = document.getElementById('skillsCloud');
    const cloudSkills = [...skills.cloud, ...skills.frameworks];
    cloud.innerHTML = cloudSkills.map(skill => 
        `<span class="tech-tag">${skill}</span>`
    ).join('');
    
    // DevOps
    const devops = document.getElementById('skillsDevOps');
    const devopsSkills = [...skills.devops, ...skills.tools];
    devops.innerHTML = devopsSkills.map(skill => 
        `<span class="tech-tag">${skill}</span>`
    ).join('');
}

function populateContributions(confluence, statistics, teams) {
    // Confluence stats
    document.getElementById('confluenceTotal').textContent = `${confluence.totalPages} Pages`;
    
    const confluenceCategories = document.getElementById('confluenceCategories');
    confluenceCategories.innerHTML = confluence.categories.slice(0, 3).map(cat => 
        `<div class="detail-item">
            <span class="label">${cat.name}</span>
            <span>${cat.count}</span>
        </div>`
    ).join('');
    
    // JIRA stats
    document.getElementById('jiraEpics').textContent = `${statistics.epicsOwned} Epics`;
    document.getElementById('jiraCompleted').textContent = statistics.completedInitiatives;
    document.getElementById('jiraActive').textContent = statistics.currentProjects;
    document.getElementById('jiraPoints').textContent = statistics.storyPointsDelivered;
    
    // Teams
    document.getElementById('teamsCount').textContent = `${teams.length} Teams`;
    const teamsList = document.getElementById('teamsList');
    teamsList.innerHTML = teams.slice(0, 5).map(team => 
        `<div class="detail-item">
            <span>${team}</span>
        </div>`
    ).join('');
    if (teams.length > 5) {
        teamsList.innerHTML += `<div class="detail-item"><span class="label">+${teams.length - 5} more teams</span></div>`;
    }
}

function populateTimeline(timeline) {
    const timelineContainer = document.getElementById('careerTimeline');
    timelineContainer.innerHTML = '';
    
    timeline.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const yearQuarter = item.quarter ? `${item.year} ${item.quarter}` : item.year;
        
        timelineItem.innerHTML = `
            <div class="timeline-year">${yearQuarter}</div>
            <div class="timeline-content">${item.event}</div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

function populateMetadata(metadata) {
    document.getElementById('lastUpdated').textContent = metadata.lastUpdated;
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Load data
    loadProfileData();
    
    // Add smooth scrolling to all nav links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.platform-card, .achievement-item, .contribution-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
