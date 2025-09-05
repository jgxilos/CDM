// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animaciones al hacer scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Manejar el menú móvil
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            this.innerHTML = mobileMenu.classList.contains('hidden') ? 
                '<i class="fas fa-bars"></i>' : 
                '<i class="fas fa-times"></i>';
        });
    }

    // Cerrar menú móvil al hacer clic en un enlace
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Efecto de desplazamiento suave para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
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

    // Manejar el formulario de citas
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío del formulario
            const formMessage = document.getElementById('form-message');
            formMessage.className = 'form-success mt-4';
            formMessage.textContent = '¡Solicitud de cita recibida! Nos pondremos en contacto contigo pronto.';
            formMessage.classList.remove('hidden');
            
            // Limpiar el formulario después de 5 segundos
            setTimeout(() => {
                appointmentForm.reset();
                formMessage.classList.add('hidden');
            }, 5000);
        });
    }

    // Manejar el formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío del formulario
            const contactMessage = document.getElementById('contact-message');
            contactMessage.className = 'form-success mt-4';
            contactMessage.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo en breve.';
            contactMessage.classList.remove('hidden');
            
            // Limpiar el formulario después de 5 segundos
            setTimeout(() => {
                contactForm.reset();
                contactMessage.classList.add('hidden');
            }, 5000);
        });
    }

    // Animación de contadores
    function animateCounters() {
        const counters = document.querySelectorAll('.stats-counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            let count = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    counter.textContent = Math.floor(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Iniciar animación después de un pequeño retraso
            setTimeout(updateCounter, 300);
        });
    }

    // Detectar cuando los contadores están en la vista
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observar el contenedor de contadores
    const counterContainer = document.querySelector('.counter-container');
    if (counterContainer) {
        observer.observe(counterContainer);
    }

    // Efecto de desvanecimiento al hacer scroll
    const fadeElements = document.querySelectorAll('.fadeInUp, .scaleIn');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Manejar el estado del header al hacer scroll
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Inicializar contadores al cargar la página
    if (window.location.hash) {
        setTimeout(animateCounters, 500);
    }
});

// Prevenir comportamiento predeterminado de enlaces con href="#"
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
    });
});
