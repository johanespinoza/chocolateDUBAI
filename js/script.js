document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999); // Set to end of day
        
        const diff = endOfDay - now;
        
        if (diff <= 0) {
            // Reset the countdown for the next day
            endOfDay.setDate(endOfDay.getDate() + 1);
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
    
    // Notification System
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    const customers = [
        { name: 'María', location: 'México' },
        { name: 'Juan', location: 'Colombia' },
        { name: 'Ana', location: 'Argentina' },
        { name: 'Carlos', location: 'España' },
        { name: 'Laura', location: 'Chile' },
        { name: 'Pedro', location: 'Perú' },
        { name: 'Sofía', location: 'Venezuela' },
        { name: 'Diego', location: 'Ecuador' },
        { name: 'Valentina', location: 'Uruguay' },
        { name: 'Andrés', location: 'Panamá' }
    ];
    
    function showRandomNotification() {
        const customer = customers[Math.floor(Math.random() * customers.length)];
        notificationText.textContent = `${customer.name} desde ${customer.location} acaba de acceder al ebook`;
        
        // Show notification
        notification.style.display = 'flex';
        
        // Hide after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.5s reverse forwards';
            setTimeout(() => {
                notification.style.display = 'none';
                notification.style.animation = 'slideIn 0.5s ease-out';
            }, 500);
        }, 5000);
    }
    
    // Show first notification after 10 seconds
    setTimeout(showRandomNotification, 10000);
    
    // Then show a new notification every 25 seconds
    setInterval(showRandomNotification, 25000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.benefit-item, .bonus-item, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const animatedElements = document.querySelectorAll('.benefit-item, .bonus-item, .testimonial');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
    
    // Track button clicks for analytics
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            // Track the button click in Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', 'InitiateCheckout');
            }
            
            // You can add more tracking here if needed
            console.log('Button clicked:', this.textContent.trim());
        });
    });
});
