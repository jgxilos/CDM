// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animaciones al hacer scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Manejar el menú móvil
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
            mainNav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Efecto de desplazamiento suave para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#' && this.getAttribute('href') !== '#!' && 
                this.getAttribute('href') !== '#cita') {
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
    
    // Actualización del desplazamiento para el botón Agendar Cita
    document.querySelectorAll('a[href="#appointment-form"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector('#appointment-form');
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Implementación del efecto parallax
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
    
    // Manejar el estado del header al hacer scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        // Mostrar/ocultar header al hacer scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        // Añadir clase scrolled cuando se baja más de 100px
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
    
    // Manejar el formulario de citas
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simular envío del formulario
            const formMessage = document.getElementById('form-message');
            formMessage.textContent = '¡Solicitud de cita recibida! Nos pondremos en contacto contigo pronto.';
            formMessage.className = 'form-success';
            formMessage.style.display = 'block';
            // Limpiar el formulario después de 5 segundos
            setTimeout(() => {
                appointmentForm.reset();
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
    
    // Manejar el formulario de contacto en la sección de contacto
    const contactForm = document.getElementById('appointment-form-contact');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simular envío del formulario
            const formMessage = document.createElement('div');
            formMessage.className = 'form-message form-success';
            formMessage.textContent = '¡Solicitud de cita recibida! Nos pondremos en contacto contigo pronto.';
            contactForm.appendChild(formMessage);
            
            // Limpiar el formulario después de 5 segundos
            setTimeout(() => {
                contactForm.reset();
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
    
    // Animación de contadores
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
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
    const counterContainer = document.querySelector('.stats-grid');
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
    
    // Inicializar contadores al cargar la página
    if (window.location.hash) {
        setTimeout(animateCounters, 500);
    }
    
    // Testimonials Carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        testimonials[index].classList.add('active');
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
        nextBtn.addEventListener('click', nextTestimonial);
    }
    
    // Auto-rotate testimonials
    if (testimonials.length > 0) {
        showTestimonial(currentTestimonial);
        setInterval(nextTestimonial, 5000);
    }
    
    // Prevenir comportamiento predeterminado de enlaces con href="#"
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
        });
    });
});