// Inicialización específica para la página de perfil del doctor
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar que la página está cargando
    document.body.classList.add('loading');
    
    // Ocultar loader cuando la página esté completamente cargada
    window.addEventListener('load', function() {
        const pageLoader = document.querySelector('.page-loader');
        if (pageLoader) {
            setTimeout(function() {
                pageLoader.classList.add('hidden');
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
                
                // Eliminar completamente el loader del DOM después de la animación
                setTimeout(function() {
                    pageLoader.remove();
                }, 500);
            }, 1000); // Mostrar el loader durante al menos 1 segundo
        }
    });
    // Inicializar AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Manejar el menú móvil (igual que en main.js)
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.innerHTML = mainNav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });
    }
    
    // Cerrar menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav) mainNav.classList.remove('active');
            if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Efecto de desplazamiento suave para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#' && this.getAttribute('href') !== '#!') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Manejar el estado del header al hacer scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
                header.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });
    }
    
    // Prevenir comportamiento predeterminado de enlaces con href="#"
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
        });
    });
});