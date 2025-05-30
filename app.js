document.addEventListener('DOMContentLoaded', function() {
    // ===== Menu Functionality =====
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const menuOverlay = document.getElementById('menu-overlay');
    
    if (mobileMenuBtn && mobileNav && menuOverlay) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle mobile nav and overlay
            mobileNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            
            // Toggle body overflow
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
            
            // Toggle between menu and close icons
            if (mobileNav.classList.contains('active')) {
                menuToggle.style.display = 'none';
                closeMenu.style.display = 'block';
            } else {
                menuToggle.style.display = 'block';
                closeMenu.style.display = 'none';
            }
        });

        menuOverlay.addEventListener('click', function() {
            // Close menu when overlay is clicked
            mobileNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Show menu icon, hide close icon
            menuToggle.style.display = 'block';
            closeMenu.style.display = 'none';
        });
    }

    // ===== GPS Functionality =====
    function getLocation(field) {
        const latInput = document.getElementById(`${field}-lat`);
        const lngInput = document.getElementById(`${field}-lng`);
        const addressInput = document.getElementById(field);
        
        if (!latInput || !lngInput || !addressInput) {
            console.error('Missing required elements for field:', field);
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    latInput.value = lat;
                    lngInput.value = lng;
                    
                    // Use a geocoding service (Nominatim in this case)
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                        .then(response => response.json())
                        .then(data => {
                            addressInput.value = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                        })
                        .catch(error => {
                            console.error('Geocoding error:', error);
                            addressInput.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                        });
                },
                function(error) {
                    alert("Error getting location: " + error.message);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    // Bind GPS buttons safely
    const gpsButtons = document.querySelectorAll('.gps-btn');
    if (gpsButtons.length) {
        gpsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const field = this.getAttribute('data-field');
                if (field) {
                    getLocation(field);
                }
            });
        });
    }

    // ===== Testimonial Slider =====
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length) {
        const dots = document.querySelectorAll('.slider-dot');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        let currentIndex = 0;
        let autoSlide;
        
        function showTestimonial(index) {
            testimonials.forEach(t => t.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }
        
        function nextTestimonial() {
            showTestimonial((currentIndex + 1) % testimonials.length);
        }
        
        function prevTestimonial() {
            showTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length);
        }
        
        function startAutoSlide() {
            autoSlide = setInterval(nextTestimonial, 5000);
        }
        
        // Initialize
        showTestimonial(0);
        startAutoSlide();
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', function() {
            clearInterval(autoSlide);
            nextTestimonial();
            startAutoSlide();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', function() {
            clearInterval(autoSlide);
            prevTestimonial();
            startAutoSlide();
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                clearInterval(autoSlide);
                showTestimonial(index);
                startAutoSlide();
            });
        });
    }

    // ===== Sticky Header =====
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.style.boxShadow = window.scrollY > 100 ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none';
        }
    });
});

// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('driverHireForm');
//     const thankYouMessage = document.getElementById('thankYouMessage');
    
//     // Hide thank you message initially
//     thankYouMessage.style.display = 'none';
    
//     form.addEventListener('submit', async function(e) {
//         e.preventDefault();
        
//         try {
//             const response = await fetch(form.action, {
//                 method: 'POST',
//                 body: new FormData(form),
//                 headers: {
//                     'Accept': 'application/json'
//                 }
//             });
            
//             if (response.ok) {
//                 // Hide form and show thank you message
//                 form.style.display = 'none';
//                 thankYouMessage.style.display = 'block';
                
//                 // Reset form
//                 form.reset();
//             } else {
//                 throw new Error('Form submission failed');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('There was a problem submitting your form. Please try again.');
//         }
//     });
// });