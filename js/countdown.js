// Countdown Timer
function updateCountdown() {
    // Set the countdown to 24 hours from now
    const now = new Date();
    const countDownDate = new Date(now);
    countDownDate.setHours(now.getHours() + 24);
    
    // Update the countdown every 1 second
    const x = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the countdown date
        const distance = countDownDate - now;
        
        // Time calculations for hours, minutes and seconds
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById("hours").textContent = String(hours).padStart(2, '0');
        document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
        document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
        
        // If the countdown is finished
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "¡La oferta ha terminado!";
        }
    }, 1000);
}

// Initialize the countdown when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    
    // Add smooth scrolling for anchor links
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
});
