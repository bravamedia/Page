document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------------------
    // 1. ANIMACIÓN DE SCROLL
    // -------------------------------------------------
    
    // Selecciona la barra de navegación para el efecto de scroll
    const navbar = document.getElementById('navbar');
    
    // Selecciona todos los elementos con la clase 'scroll-animation'.
    const scrollAnimatedElements = document.querySelectorAll('.scroll-animation');

    // Función para el efecto de Navbar y la animación de elementos
    const handleScroll = () => {
        // --- Efecto Navbar Sticky ---
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // --- Animación de Elementos ---
        const windowHeight = window.innerHeight;
        scrollAnimatedElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            // Si el top del elemento está a 150px del fondo de la ventana
            if (rect.top < windowHeight - 150) { 
                el.classList.add('animate-in');
            }
        });
    };
    
    // Asigna el evento de scroll
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Ejecuta la función una vez al cargar
    handleScroll();

    // -------------------------------------------------
    // 2. NAVEGACIÓN MÓVIL (Menú Hamburguesa)
    // -------------------------------------------------
    
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        // Toggle (mostrar/ocultar) el menú al hacer clic en el botón
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cierra el menú cuando se hace clic en un enlace (en móvil)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Solo si la pantalla es pequeña (ej. < 900px)
                if (window.innerWidth <= 900) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }
});