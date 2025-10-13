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
 * MAIN APP INITIALIZATION
 * ---------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
    NavModule.initialize();
    TypewriterModule.initialize(document.getElementById('typewriter'));
    ScrollAnimationModule.initialize();
    
    console.log("Portfolio inicializado correctamente. ¡Listo para impresionar! ✨");
});