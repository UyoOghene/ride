document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuOverlay = document.getElementById('menu-overlay');
    
    menuToggle.addEventListener('click', function() {
        mobileNav.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    closeMenu.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        closeMenu.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
    });

    mobileNav.addEventListener('click',function(){
        closeMenu.style.display = 'flex';
    })
    
    menuOverlay.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu-ul a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    });
});
// Form submission
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to your server
    // For this example, we'll just show an alert
    alert('Thank you for your booking request! We will contact you shortly to confirm the details.');
    
    // Reset the form
    this.reset();
});

// Sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});