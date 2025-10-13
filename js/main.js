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
 * BLOG MODULE
 * ---------------------------------
 */
const BlogModule = (() => {
    if (typeof blogPosts === 'undefined') {
        console.error("Blog posts data not found.");
        return { initialize: () => {} };
    }
    
    const postsContainer = document.getElementById('blog-posts-container');
    const modal = document.getElementById('blog-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('modal-close-btn');

    const renderPosts = () => {
        if (!postsContainer) return;
        postsContainer.innerHTML = blogPosts.map(post => `
            <article class="blog-card fade-in" data-slug="${post.slug}" tabindex="0" role="button" aria-label="Leer más sobre ${post.title}">
                <h3 class="blog-card__title">${post.title}</h3>
                <p class="blog-card__date">${post.date}</p>
                <p class="blog-card__excerpt">${post.excerpt}</p>
            </article>
        `).join('');
    };

    const openModalWithPost = (slug) => {
        const post = blogPosts.find(p => p.slug === slug);
        if (!post || !modal) return;
        modalTitle.textContent = post.title;
        modalDate.textContent = post.date;
        modalBody.innerHTML = post.content;
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('is-open');
        document.body.style.overflow = 'auto';
    };

    const bindEvents = () => {
        postsContainer?.addEventListener('click', (e) => {
            const card = e.target.closest('.blog-card');
            if (card) openModalWithPost(card.dataset.slug);
        });
        
        closeModalBtn?.addEventListener('click', closeModal);
        modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal(); });
    };

    const init = () => {
        renderPosts();
        bindEvents();
    };
    return { initialize: init };
})();

/**
 * ---------------------------------
 * SCROLL ANIMATION MODULE
 * ---------------------------------
 */
const ScrollAnimationModule = (() => {
    // Seleccionamos todos los elementos que deben ser animados.
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
        // Observamos cada elemento que ya existe en el DOM.
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
        
        // Las tarjetas del blog se generan después de que el DOM carga.
        // Necesitamos una forma de observarlas DESPUÉS de que se hayan creado.
        // Usaremos un MutationObserver para detectar cuando se añaden al DOM.
        const blogContainer = document.getElementById('blog-posts-container');
        if (blogContainer) {
            const mutationObserver = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        // Nos aseguramos de que el nodo sea un elemento y tenga la clase
                        if (node.nodeType === 1 && node.classList.contains('fade-in')) {
                            observer.observe(node);
                        }
                    });
                });
            });
            // Le decimos al MutationObserver que observe el contenedor del blog
            // y se active cuando se añadan o quiten hijos (childList).
            mutationObserver.observe(blogContainer, { childList: true });
        }
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
    BlogModule.initialize();
    ScrollAnimationModule.initialize();
    
    console.log("Portfolio inicializado correctamente. ¡Listo para impresionar! ✨");
});