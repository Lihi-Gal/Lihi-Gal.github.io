document.addEventListener('DOMContentLoaded', () => {
    // Initialize based on current page language
    const currentLang = document.documentElement.lang || 'en';
    highlightActiveLanguage(currentLang);
    
    // Add click handlers to language links if they don't already have them
    const langLinks = document.querySelectorAll('.language-links a');
    langLinks.forEach(link => {
        if (!link.getAttribute('data-handler-attached')) {
            link.setAttribute('data-handler-attached', 'true');
            link.addEventListener('click', function(e) {
                if (!this.href.includes('#')) {
                    // If it's a real link (not a # link), let the normal navigation happen
                    return;
                }
                
                e.preventDefault();
                const lang = this.classList.contains('en') ? 'en' : 'he';
                switchToLanguage(lang);
            });
        }
    });
});

function highlightActiveLanguage(lang) {
    // Highlight active language link
    const langLinks = document.querySelectorAll('.language-links a');
    langLinks.forEach(link => {
        link.classList.remove('active');
        if (link.classList.contains(lang)) {
            link.classList.add('active');
        }
    });
}

function switchToLanguage(lang) {
    // Apply transition effect
    document.body.classList.add('language-switching');
    
    // Get current path and construct the equivalent path in the new language
    const currentPath = window.location.pathname;
    let newPath;
    
    if (currentPath.startsWith('/en/')) {
        newPath = currentPath.replace('/en/', '/he/');
    } else if (currentPath.startsWith('/he/')) {
        newPath = currentPath.replace('/he/', '/en/');
    } else {
        // If we're on a path without language prefix, add it
        newPath = `/${lang}${currentPath.startsWith('/') ? currentPath : '/' + currentPath}`;
    }
    
    // Remember the language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Navigate to the new URL after transition effect
    setTimeout(() => {
        window.location.href = newPath;
    }, 300); // Match this to your CSS transition duration
}

// Check if we need to redirect based on stored language preference
function checkLanguageRedirect() {
    const currentLang = document.documentElement.lang;
    const preferredLang = localStorage.getItem('preferredLanguage');
    
    // If we have a preferred language that's different from current
    if (preferredLang && preferredLang !== currentLang) {
        const currentPath = window.location.pathname;
        
        // Only redirect if we're on a language-specific path
        if (currentPath.startsWith('/en/') || currentPath.startsWith('/he/')) {
            const newPath = currentPath.replace(`/${currentLang}/`, `/${preferredLang}/`);
            window.location.href = newPath;
        }
    }
}

// Run language redirect check once when page loads
// Uncomment this if you want automatic redirection based on saved preference
// checkLanguageRedirect();