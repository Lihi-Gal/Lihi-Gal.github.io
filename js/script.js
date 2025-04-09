document.addEventListener('DOMContentLoaded', () => {
    const currentLang = localStorage.getItem('language') || 'en';
    setLanguage(currentLang);
});

function toggleLanguage() {
    const currentLanguage = document.documentElement.lang;
    const newLanguage = currentLanguage === 'en' ? 'he' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
}

function setLanguage(lang) {
    document.documentElement.lang = lang;
    
    const elements = document.querySelectorAll('[data-en], [data-he]');
    
    elements.forEach(element => {
        const content = element.getAttribute(`data-${lang}`);
        if (content) {
            element.innerHTML = content;
        }
    });

    document.getElementById('current-lang').textContent = lang === 'en' ? 'EN' : 'עב';
    document.getElementById('alt-lang').textContent = lang === 'en' ? 'עב' : 'EN';
    document.body.style.direction = lang === 'en' ? 'ltr' : 'rtl';

    localStorage.setItem('language', lang);
}
