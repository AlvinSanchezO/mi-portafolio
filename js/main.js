/**
 * ===================================================================================
 * PORTFOLIO - MAIN JAVASCRIPT FILE
 * ===================================================================================
 * AUTHOR: Alvin Cesar Sanchez Ochoa Alvarez
 * DESCRIPTION: Main script file for the portfolio website.
 * It uses the Module Pattern to encapsulate functionalities and keep the code clean.
 * -----------------------------------------------------------------------------------
 */

/**
 * ---------------------------------
 * NAVIGATION MODULE
 * ---------------------------------
 * Handles navigation-related functionalities like highlighting the
 * active link in the navbar based on scroll position.
 */
const NavModule = (() => {
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('.section');

    const updateActiveLink = () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    };

    const init = () => {
        window.addEventListener('scroll', updateActiveLink);
    };

    return { initialize: init };
})();


/**
 * ---------------------------------
 * TYPEWRITER EFFECT MODULE
 * ---------------------------------
 * Creates a simple typing animation for a given element.
 */
const TypewriterModule = (() => {
    const start = (element) => {
        if (!element) return;
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };
        type();
    };
    return { initialize: start };
})();


/**
 * ---------------------------------
 * SCROLL ANIMATION MODULE
 * ---------------------------------
 * Uses Intersection Observer API to add animations to elements as they
 * enter the viewport.
 */
const ScrollAnimationModule = (() => {
    const elementsToAnimate = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const init = () => {
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    };

    return { initialize: init };
})();


/**
 * ---------------------------------
 * THEME SWITCHER MODULE
 * ---------------------------------
 * Manages the light/dark/system theme functionality.
 */
const ThemeModule = (() => {
    const themeButton = document.getElementById('theme-button');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const ICONS = {
        light: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
        dark: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
    };

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            themeIcon.innerHTML = ICONS.light;
        } else {
            body.classList.remove('dark-theme');
            themeIcon.innerHTML = ICONS.dark;
        }
    };

    const toggleTheme = () => {
        const currentThemeIsDark = body.classList.contains('dark-theme');
        const newTheme = currentThemeIsDark ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('user-theme', newTheme);
    };

    const init = () => {
        if (!themeButton || !themeIcon) return;

        const savedTheme = localStorage.getItem('user-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let initialTheme = 'light';
        if (savedTheme) {
            initialTheme = savedTheme;
        } else if (systemPrefersDark) {
            initialTheme = 'dark';
        }
        
        applyTheme(initialTheme);
        
        themeButton.addEventListener('click', toggleTheme);
    };

    return { initialize: init };
})();


/**
 * ---------------------------------
 * MAIN APP INITIALIZATION
 * ---------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
    NavModule.initialize();
    TypewriterModule.initialize(document.getElementById('typewriter'));
    ScrollAnimationModule.initialize();
    ThemeModule.initialize();
    
    console.log("Portfolio initialized successfully. Ready to impress! ✨");
});