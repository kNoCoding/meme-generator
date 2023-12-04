'use strict';

// Function to show a specific section
function showSection(sectionClass) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = section.classList.contains(sectionClass) ? 'block' : 'none';
    });
}

// Making the function globally accessible
window.showSection = showSection;

// Initial application setup
function initApp() {
    // Show the gallery by default
    showSection('gallery');

    // Event listeners for navigation items
    document.querySelector('.nav-memes').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('memes-display');
    });
    document.querySelector('.nav-gallery').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('gallery');
    });
    document.querySelector('.nav-about').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('about');
    });

    // Event listener for the logo to return to the gallery
    document.querySelector('.logo').addEventListener('click', (e) => {
        e.preventDefault();
        showSection('gallery');
    });
}

// Call initApp to initialize the application
initApp();