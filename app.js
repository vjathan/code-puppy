// Load profile data and populate the website
async function loadProfileData() {
    try {
        console.log('🐶 Loading profile data...');
        const response = await fetch('data.json');
        const data = await response.json();
        console.log('✅ Data loaded:', Object.keys(data));
        
        // Populate profile sections
        console.log('Populating hero...');
        populateHero(data.profile, data.statistics);
        
        if (data.corporateImpact) {
            console.log('Populating corporate impact...');
            populateCorporateImpact(data.corporateImpact);
        }
        
        console.log('Populating platforms...');
        populatePlatforms(data.platforms);
        
        console.log('Populating achievements...');
        populateAchievements(data.achievements);
        
        console.log('Populating expertise...');
        populateExpertise(data.expertise, data.skills);
        
        console.log('Populating contributions...');
        populateContributions(data.confluence, data.statistics, data.teams);
        
        console.log('Populating timeline...');
        populateTimeline(data.timeline);
        
        if (data.timelineNote) {
            console.log('Populating timeline note...');
            populateTimelineNote(data.timelineNote);
        }
        
        console.log('Populating metadata...');
        populateMetadata(data.metadata);
        
        // Populate new comprehensive data sections
        if (data.professionalNetwork) {
            console.log('Populating professional network...');
            populateProfessionalNetwork(data.professionalNetwork);
        }
        
        if (data.directReports) {
            console.log('Populating direct reports...');
            populateDirectReports(data.directReports);
        }
        
        if (data.activeProjects) {
            console.log('Populating active projects...');
            populateActiveProjects(data.activeProjects);
        }
        
        if (data.emailMetrics) {
            console.log('Populating email metrics...');
            populateEmailMetrics(data.emailMetrics);
        }
        
        if (data.leadershipThemes) {
            console.log('Populating leadership themes...');
            populateLeadershipThemes(data.leadershipThemes);
        }
        
        console.log('✅ All sections populated successfully!');
        
    } catch (error) {
        console.error('❌ Error loading profile data:', error);
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

function populateCorporateImpact(impacts) {
    const grid = document.getElementById('corporateImpact');
    if (!grid) return;
    
    grid.innerHTML = impacts.map((impact, index) => `
        <div class="impact-card" style="animation-delay: ${index * 0.1}s">
            <div class="impact-header">
                <div class="impact-number">${index + 1}</div>
                <h3 class="impact-title">${impact.title}</h3>
            </div>
            <div class="impact-metric">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <span>${impact.metric}</span>
            </div>
            <div class="impact-value">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>${impact.impact}</span>
            </div>
            <div class="impact-details">
                <div class="impact-detail">
                    <strong>Timeframe:</strong> ${impact.timeframe}
                </div>
                <div class="impact-detail">
                    <strong>Scope:</strong> ${impact.scope}
                </div>
                <div class="impact-detail">
                    <strong>Leadership:</strong> ${impact.leadership}
                </div>
            </div>
        </div>
    `).join('');
}

function populatePlatforms(platforms) {
    try {
        const grid = document.getElementById('platformsGrid');
        if (!grid) {
            console.warn('platformsGrid element not found');
            return;
        }
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
    } catch (error) {
        console.error('Error in populatePlatforms:', error);
    }
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

function populateTimelineNote(note) {
    const noteContainer = document.getElementById('timelineNote');
    if (noteContainer && note) {
        noteContainer.textContent = note;
    }
}

function populateMetadata(metadata) {
    document.getElementById('lastUpdated').textContent = metadata.lastUpdated;
}

function populateProfessionalNetwork(network) {
    // Check if section exists in HTML, if not skip
    const networkContainer = document.getElementById('professionalNetwork');
    if (!networkContainer) return;
    
    networkContainer.innerHTML = network.slice(0, 10).map(contact => `
        <div class="network-contact">
            <div class="contact-name">${contact.name}</div>
            <div class="contact-role">${contact.role}</div>
            <div class="contact-frequency">${contact.frequency}</div>
        </div>
    `).join('');
}

function populateDirectReports(reports) {
    const reportsContainer = document.getElementById('directReports');
    if (!reportsContainer) return;
    
    reportsContainer.innerHTML = reports.map(report => `
        <div class="team-member">
            <div class="member-name">${report.name}</div>
            <div class="member-title">${report.title}</div>
            <div class="member-location">${report.location}</div>
        </div>
    `).join('');
}

function populateActiveProjects(projects) {
    const projectsContainer = document.getElementById('activeProjects');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-header">
                <h3 class="project-name">${project.name}</h3>
                <span class="project-status ${project.status.toLowerCase().replace(/\s+/g, '-')}">${project.status}</span>
            </div>
            <div class="project-deadline">⏰ Deadline: ${project.deadline}</div>
            <div class="project-role">👤 ${project.role}</div>
            <div class="project-scope">${project.scope}</div>
            <div class="project-impact">💡 ${project.impact}</div>
        </div>
    `).join('');
}

function populateEmailMetrics(metrics) {
    const metricsContainer = document.getElementById('emailMetrics');
    if (!metricsContainer) return;
    
    metricsContainer.innerHTML = `
        <div class="metric-item">Total Emails: ${metrics.totalEmails.toLocaleString()}</div>
        <div class="metric-item">Inbox: ${metrics.inboxEmails.toLocaleString()}</div>
        <div class="metric-item">Sent: ${metrics.sentEmails.toLocaleString()}</div>
        <div class="metric-item">Period: ${metrics.analysisPeriod}</div>
    `;
}

function populateLeadershipThemes(themes) {
    const themesContainer = document.getElementById('leadershipThemes');
    if (!themesContainer) return;
    
    themesContainer.innerHTML = themes.map(theme => `
        <div class="theme-item">${theme}</div>
    `).join('');
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
