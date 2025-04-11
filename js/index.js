document.addEventListener('DOMContentLoaded', () => {
    const currentLang = localStorage.getItem('language') || 'en';
    setLanguage(currentLang);
});

function toggleLanguage() {
    const currentLanguage = document.documentElement.lang;
    const newLanguage = currentLanguage === 'en' ? 'he' : 'en';
    setLanguage(newLanguage);
}

function setLanguage(lang) {
    document.body.classList.add('language-switching');
    
    setTimeout(function() {
        document.documentElement.lang = lang;
        
        const elements = document.querySelectorAll('[data-en], [data-he]');
        
        elements.forEach(element => {
            const content = element.getAttribute(`data-${lang}`);
            if (content) {
                element.innerHTML = content;
            }
        });
        
        // Highlight active language link
        const langLinks = document.querySelectorAll('.language-links a');
        langLinks.forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`.language-links .${lang}`).classList.add('active');
        
        // Save language preference
        localStorage.setItem('language', lang);
        
        // Remove transition class after animation completes
        setTimeout(function() {
            document.body.classList.remove('language-switching');
        }, 50); // Short delay before fade-in starts
    }, 300); // Transition duration
}