/**
 * ===================================================================================
 * PORTFOLIO - MAIN JAVASCRIPT FILE
 * ===================================================================================
 * AUTHOR: [Alvin Cesar Sanchez Ochoa Alvarez]
 * DESCRIPTION: Main script file for the portfolio website.
 * It uses the Module Pattern to encapsulate functionalities and keep the code clean.
 * -----------------------------------------------------------------------------------
 */

/**
 * ---------------------------------
 * NAVIGATION MODULE
 * ---------------------------------
 * Handles all navigation-related functionalities like smooth scrolling
 * and highlighting the active link in the navbar based on scroll position.
 */
const NavModule = (() => {
    // Seleccionamos los elementos del DOM una sola vez para mejorar el rendimiento.
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('.section');

    // Función para actualizar el enlace activo en la navegación.
    const updateActiveLink = () => {
        let currentSectionId = '';
        
        // Iteramos sobre cada sección para ver cuál está visible en la pantalla.
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Se considera "activa" la sección que está a 150px o menos del borde superior de la ventana.
            if (window.scrollY >= sectionTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Actualizamos las clases de los enlaces de navegación.
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            // Comparamos el href del link (ej: #proyectos) con el id de la sección actual.
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    };

    // La función init es la que inicializa la funcionalidad del módulo.
    const init = () => {
        // Escuchamos el evento 'scroll' en la ventana para actualizar el enlace activo.
        window.addEventListener('scroll', updateActiveLink);
    };

    // Exponemos públicamente solo la función 'init' para ser llamada desde fuera.
    return {
        initialize: init
    };
})();


/**
 * ---------------------------------
 * TYPEWRITER EFFECT MODULE
 * ---------------------------------
 * Creates a simple typing animation for a given element.
 */
const TypewriterModule = (() => {
    const start = (element) => {
        if (!element) return; // Buena práctica: verificar que el elemento exista.

        const text = element.textContent;
        element.textContent = ''; // Limpiamos el texto original.
        let i = 0;

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100); // Velocidad de escritura (100ms por caracter).
            }
        };
        type(); // Iniciamos el efecto.
    };

    return {
        initialize: start
    };
})();


/**
 * ---------------------------------
 * BLOG MODULE
 * ---------------------------------
 * Manages rendering blog posts from the 'blog-posts.js' data file
 * and handles the functionality of the modal window.
 */
const BlogModule = (() => {
    // Verificamos si la variable 'blogPosts' existe (debe ser cargada desde blog-posts.js).
    if (typeof blogPosts === 'undefined') {
        console.error("Blog posts data not found. Make sure 'blog-posts.js' is loaded before 'main.js'.");
        return { initialize: () => {} }; // Retornamos un módulo vacío para evitar errores.
    }
    
    // Elementos del DOM para el blog.
    const postsContainer = document.getElementById('blog-posts-container');
    const modal = document.getElementById('blog-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('modal-close-btn');

    // Función para renderizar las tarjetas de los posts en el contenedor.
    const renderPosts = () => {
        if (!postsContainer) return;

        // Usamos map para transformar cada objeto del array 'blogPosts' en un string HTML.
        // 'join' une todos los strings en uno solo.
        postsContainer.innerHTML = blogPosts.map(post => `
            <article class="blog-card" data-slug="${post.slug}" tabindex="0" role="button" aria-label="Leer más sobre ${post.title}">
                <h3 class="blog-card__title">${post.title}</h3>
                <p class="blog-card__date">${post.date}</p>
                <p class="blog-card__excerpt">${post.excerpt}</p>
            </article>
        `).join('');
    };

    // Función para abrir la modal con el contenido de un post específico.
    const openModalWithPost = (slug) => {
        const post = blogPosts.find(p => p.slug === slug);
        if (!post || !modal) return; // Si no se encuentra el post o la modal, no hacemos nada.

        modalTitle.textContent = post.title;
        modalDate.textContent = post.date;
        modalBody.innerHTML = post.content; // Inyectamos el contenido HTML del post.
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden'; // Evita el scroll del fondo.
    };

    // Función para cerrar la modal.
    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('is-open');
        document.body.style.overflow = 'auto'; // Restaura el scroll del fondo.
    };

    // Función para manejar todos los eventos del módulo.
    const bindEvents = () => {
        // Usamos delegación de eventos en el contenedor para eficiencia.
        postsContainer?.addEventListener('click', (e) => {
            const card = e.target.closest('.blog-card'); // Buscamos la tarjeta más cercana al clic.
            if (card) {
                const slug = card.dataset.slug; // Obtenemos el slug del atributo data.
                openModalWithPost(slug);
            }
        });
        
        closeModalBtn?.addEventListener('click', closeModal);

        modal?.addEventListener('click', (e) => {
            // Cierra la modal si se hace clic en el fondo oscuro (fuera del contenido).
            if (e.target === modal) {
                closeModal();
            }
        });

        // Cierra la modal al presionar la tecla 'Escape'. Buena práctica de accesibilidad.
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
                closeModal();
            }
        });
    };

    const init = () => {
        renderPosts();
        bindEvents();
    };

    return {
        initialize: init
    };
})();


/**
 * ---------------------------------
 * MAIN APP INITIALIZATION
 * ---------------------------------
 * Waits for the DOM to be fully loaded before initializing all modules.
 * This is the single entry point of our application.
 */
document.addEventListener('DOMContentLoaded', () => {
    NavModule.initialize();
    TypewriterModule.initialize(document.getElementById('typewriter'));
    BlogModule.initialize();
    
    console.log("Portfolio inicializado correctamente. ¡Listo para impresionar! ✨");
});