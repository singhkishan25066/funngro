const projects = [
    { title: "Teen Finance Dashboard", category: "tech", description: "Build a responsive dashboard with budgets, goals, and analytics." },
    { title: "Startup Landing Page", category: "design", description: "Design a bold landing page with brand visuals and calls to action." },
    { title: "Portfolio Case Study", category: "design", description: "Create a polished case study presentation for your latest project." },
    { title: "Interactive Quiz App", category: "tech", description: "Develop a small app with questions, scoring, and dynamic results." }
];

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function renderProjects(items) {
    const container = document.getElementById('projectContainer');
    if (!container) return;
    container.innerHTML = '';
    if (items.length === 0) {
        container.innerHTML = '<p>No projects found for this category.</p>';
        return;
    }

    items.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <span class="project-category">${project.category}</span>
        `;
        container.appendChild(card);
    });
}

function filterProjects(category) {
    const filtered = category === 'all'
        ? projects
        : projects.filter(project => project.category === category);
    renderProjects(filtered);
}

function setActiveFilter(button) {
    document.querySelectorAll('.project-filter button').forEach(btn => btn.classList.remove('active'));
    if (button) button.classList.add('active');
}

function toggleTheme() {
    const current = document.body.classList.toggle('dark');
    localStorage.setItem('theme', current ? 'dark' : 'light');
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.textContent = current ? 'Light Mode' : 'Dark Mode';
    }
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
}

function scrollToElement(id) {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
        themeToggle.addEventListener('click', toggleTheme);
    }

    const welcomeMessage = document.getElementById('welcomeMessage');
    const savedName = localStorage.getItem('name');
    if (savedName && welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${savedName}`;
    }

    const projectContainer = document.getElementById('projectContainer');
    if (projectContainer) {
        renderProjects(projects);
    }

    const filterAll = document.getElementById('filterAll');
    const filterDesign = document.getElementById('filterDesign');
    const filterTech = document.getElementById('filterTech');
    if (filterAll) {
        setActiveFilter(filterAll);
        filterAll.addEventListener('click', () => {
            setActiveFilter(filterAll);
            filterProjects('all');
        });
    }
    if (filterDesign) {
        filterDesign.addEventListener('click', () => {
            setActiveFilter(filterDesign);
            filterProjects('design');
        });
    }
    if (filterTech) {
        filterTech.addEventListener('click', () => {
            setActiveFilter(filterTech);
            filterProjects('tech');
        });
    }

    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', event => {
            event.preventDefault();
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const ageInput = document.getElementById('age');
            const message = document.getElementById('formMessage');

            if (!nameInput || !emailInput || !ageInput || !message) return;

            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();
            const ageValue = ageInput.value.trim();

            if (!nameValue || !emailValue || !ageValue) {
                showMessage(message, 'Please complete all fields before submitting.', 'error');
                return;
            }

            if (!isValidEmail(emailValue)) {
                showMessage(message, 'Please enter a valid email address.', 'error');
                return;
            }

            localStorage.setItem('name', nameValue);
            showMessage(message, 'Thanks for joining! Your information is saved.', 'success');
            joinForm.reset();
        });
    }

    const scrollToFormButton = document.getElementById('scrollToForm');
    if (scrollToFormButton) {
        scrollToFormButton.addEventListener('click', () => scrollToElement('joinForm'));
    }

    const goToProjectsButton = document.getElementById('goToProjects');
    if (goToProjectsButton) {
        goToProjectsButton.addEventListener('click', () => scrollToElement('projectSection'));
    }
});
