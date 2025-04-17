// Enhanced page transition system
document.addEventListener('DOMContentLoaded', () => {
    // Initialize based on current page language
    const currentLang = document.documentElement.lang || 'en';
    
    // Add click handlers to all navigation links
    const navLinks = document.querySelectorAll('.buttons a, .language-links a');
    navLinks.forEach(link => {
        if (!link.getAttribute('data-handler-attached')) {
            link.setAttribute('data-handler-attached', 'true');
            link.addEventListener('click', function(e) {
                // Don't handle external links or hash links differently
                if (this.target === '_blank' || this.href.includes('#')) {
                    return;
                }
                
                e.preventDefault();
                const targetHref = this.href;
                
                // Apply exit animation to all major elements
                document.body.classList.add('page-exit');
                
                // Store the target URL in session storage
                sessionStorage.setItem('lastNavigatedFrom', window.location.pathname);
                sessionStorage.setItem('targetUrl', targetHref);
                
                // Navigate to the new page after animation completes
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 800); // Match to your animation duration
            });
        }
    });
    
    // Check if we're arriving from another page in the site
    const lastPage = sessionStorage.getItem('lastNavigatedFrom');
    if (lastPage) {
        // We came from another page, start with elements off-screen
        document.body.classList.add('page-enter-prep');
        
        // Remove the stored navigation info
        sessionStorage.removeItem('lastNavigatedFrom');
        sessionStorage.removeItem('targetUrl');
        
        // Trigger entrance animation after a small delay
        setTimeout(() => {
            document.body.classList.remove('page-enter-prep');
            document.body.classList.add('page-enter');
        }, 50);
    }
    
    // Language switching functionality
    const langLinks = document.querySelectorAll('.language-links a');
    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.href.includes('#')) {
                // If it's a real link (not a # link), use our transition system
                const lang = this.classList.contains('en') ? 'en' : 'he';
                localStorage.setItem('preferredLanguage', lang);
            }
        });
    });
});

// Background animation for main page - only run if not in transition mode
if (document.querySelector('.sliding-background') && 
    !document.body.classList.contains('page-exit') && 
    !document.body.classList.contains('page-enter-prep') && 
    !document.body.classList.contains('page-enter')) {
    
    const background = document.querySelector('.sliding-background');
    background.style.animation = 'none';
    
    setTimeout(function() {
        if (!document.body.classList.contains('page-exit') && 
            !document.body.classList.contains('page-enter-prep') && 
            !document.body.classList.contains('page-enter')) {
            background.style.animation = 'slideUp 1.8s ease-out';
        }
    }, 10);
}

