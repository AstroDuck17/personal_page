// Event tracking function for personal github.io website
document.addEventListener('DOMContentLoaded', function() {
    // Track page view on initial load
    logEvent('view', 'page', document.title);
    
    // Set up click event listeners for all interactive elements
    setupClickListeners();
    
    // Set up intersection observer for tracking element views
    setupViewTracking();
});

// Function to log events in the required format
function logEvent(eventType, objectType, objectDetails) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, ${eventType}, ${objectType}: ${objectDetails}`);
}

// Function to set up click event listeners
function setupClickListeners() {
    // Track clicks on all elements
    document.addEventListener('click', function(event) {
        let targetElement = event.target;
        let objectType = 'unknown';
        let objectDetails = '';
        
        // Check for skill box clicks - improved detection
        const skillBox = targetElement.closest('.skills-box');
        if (skillBox) {
            objectType = 'skill-box';
            // Get the skill category from the header
            const headerElement = skillBox.querySelector('.skills-header h3');
            objectDetails = headerElement ? headerElement.textContent : 'Skill Box';
            logEvent('click', objectType, objectDetails);
            return;
        }
        
        // Determine the type of element clicked
        if (targetElement.tagName === 'A') {
            objectType = 'link';
            objectDetails = targetElement.textContent || targetElement.href;
            
            // Special case for CV download
            if (targetElement.classList.contains('cv-download')) {
                objectType = 'cv-download';
            }
        } 
        else if (targetElement.tagName === 'IMG') {
            objectType = 'image';
            objectDetails = targetElement.alt || targetElement.src.split('/').pop();
        }
        else if (targetElement.tagName === 'BUTTON') {
            objectType = 'button';
            // Handle gallery navigation arrows
            if (targetElement.classList.contains('arrow')) {
                objectType = 'gallery-arrow';
                objectDetails = targetElement.classList.contains('left') ? 'left' : 'right';
            } else {
                objectDetails = targetElement.textContent || targetElement.id;
            }
        }
        else if (targetElement.classList.contains('skill-tag')) {
            objectType = 'skill-tag';
            objectDetails = targetElement.textContent;
        }
        else if (targetElement.classList.contains('social-link')) {
            objectType = 'social-link';
            objectDetails = targetElement.textContent;
        }
        else if (targetElement.closest('nav') && targetElement.tagName === 'A') {
            objectType = 'nav-item';
            objectDetails = targetElement.textContent;
        }
        else if (targetElement.classList.contains('skills-header') || targetElement.closest('.skills-header')) {
            // Handle clicks on skills header or its children
            const header = targetElement.classList.contains('skills-header') ? 
                           targetElement : 
                           targetElement.closest('.skills-header');
                           
            const headerText = header.querySelector('h3');
            objectType = 'skills-header';
            objectDetails = headerText ? headerText.textContent : 'Skills Header';
        }
        else if (targetElement.classList.contains('skills-icon')) {
            objectType = 'skills-icon';
            const header = targetElement.closest('.skills-header');
            const headerText = header.querySelector('h3');
            objectDetails = headerText ? headerText.textContent : 'Skills Icon';
        }
        
        // Log the click event
        logEvent('click', objectType, objectDetails);
    });
}

// Function to track when elements come into view
function setupViewTracking() {
    // Define elements to track views for
    const sectionsToTrack = [
        { id: 'about', type: 'section', details: 'About Me' },
        { id: 'hometown', type: 'section', details: 'Hometown' },
        { id: 'education', type: 'section', details: 'Education' },
        { id: 'skills', type: 'section', details: 'Skills' },
        { id: 'cv', type: 'section', details: 'CV' }
    ];
    
    // Additional elements to track
    const elementsToTrack = [
        { selector: '.profile-image', type: 'profile-picture', details: 'Profile Picture' },
        { selector: '.hometown-image', type: 'hometown-image', details: 'Hometown Image' },
        { selector: '.timeline-item', type: 'education-item', details: 'Education Timeline Item' },
        { selector: '.skills-box', type: 'skills-box', details: 'Skills Category' }
    ];
    
    // Set up the intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element has come into view
                const element = entry.target;
                let type = element.dataset.trackType;
                let details = element.dataset.trackDetails;
                
                // For skills boxes, get the actual skill category
                if (type === 'skills-box') {
                    const headerElement = element.querySelector('.skills-header h3');
                    if (headerElement) {
                        details = headerElement.textContent;
                    }
                }
                
                // Only log view once per page load
                if (!element.dataset.viewed) {
                    logEvent('view', type, details);
                    element.dataset.viewed = 'true';
                }
            }
        });
    }, { threshold: 0.5 }); // Element is considered "viewed" when 50% visible
    
    // Observe sections
    sectionsToTrack.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
            element.dataset.trackType = section.type;
            element.dataset.trackDetails = section.details;
            observer.observe(element);
        }
    });
    
    // Observe other elements
    elementsToTrack.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach((element, index) => {
            element.dataset.trackType = item.type;
            element.dataset.trackDetails = `${item.details} ${index + 1}`;
            observer.observe(element);
        });
    });
}