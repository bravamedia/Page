document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // 1. Lógica del Menú Móvil
    // ------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace (solo en móvil)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Usamos 900px como punto de quiebre (breakpoint) definido en CSS
                if (window.innerWidth <= 900) {
                    navLinks.classList.remove('active');
                    document.body.classList.remove('translate-visible'); // Asegura que el traductor se oculte
                }
            });
        });
    }

    // ------------------------------------
    // 2. Lógica de Navegación Pegajosa (Sticky)
    // ------------------------------------
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });
    }

    // ------------------------------------
    // 3. Lógica de Animación Scroll Reveal
    // ------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 10% visible para activar
    };

    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    scrollRevealElements.forEach(el => {
        observer.observe(el);
    });
    
    // ------------------------------------
    // 4. Lógica del Botón de Traducción (Toggle) - AJUSTADA
    // ------------------------------------
    // ✅ ID CORREGIDO: Ahora usamos el ID único 'translate-nav-toggle'
    const translateToggle = document.getElementById('translate-nav-toggle');
    const body = document.body; 
    const googleTranslateElement = document.getElementById('google_translate_element');

    if (translateToggle && googleTranslateElement) {
        
        // Al hacer clic en el ícono del globo:
        translateToggle.addEventListener('click', (event) => {
            event.stopPropagation(); 
            // Agregamos/quitamos la clase 'translate-visible' al body
            body.classList.toggle('translate-visible');
            
            // Mueve el widget de Google Translate para que aparezca justo al lado del botón
            if (body.classList.contains('translate-visible')) {
                const rect = translateToggle.getBoundingClientRect();
                const navHeight = navbar ? navbar.offsetHeight : 0; // Altura de la barra de navegación
                
                // Posiciona el widget debajo del botón, alineado a la derecha
                googleTranslateElement.style.right = (window.innerWidth - rect.right - 10) + 'px'; // 10px de margen derecho
                googleTranslateElement.style.top = (navHeight + 10) + 'px'; // Debajo de la navbar + margen
            }
        });

        // Cerrar el widget al hacer clic fuera
        document.addEventListener('click', (event) => {
            if (body.classList.contains('translate-visible') && 
                !translateToggle.contains(event.target) && 
                !googleTranslateElement.contains(event.target)) 
            {
                body.classList.remove('translate-visible');
            }
        });
    }
});