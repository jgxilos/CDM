// Counter animation
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
        
        updateCounter();
    });
}

// Initialize counters when they enter viewport
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const counterContainer = document.querySelector('.counter-container');
    if (counterContainer) {
        observer.observe(counterContainer);
    }
    
    // Initialize counters on page load for visible elements
    const visibleCounters = document.querySelector('.counter-container.visible');
    if (visibleCounters) {
        animateCounters();
    }
});