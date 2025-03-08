document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Variables
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');
    const templateDropdown = document.getElementById('template-dropdown');
    const deviceButtons = document.querySelectorAll('.device-buttons .btn');
    const contactForm = document.getElementById('contactForm');
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
        
        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile navigation if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        document.querySelector('.navbar-toggler').click();
                    }
                }
            }
        });
    });
    
    // Template Selector Functionality
    if (templateDropdown) {
        templateDropdown.addEventListener('change', function() {
            const selectedTemplate = this.value;
            const templateFrames = document.querySelectorAll('.template-frame');
            
            templateFrames.forEach(frame => {
                frame.classList.remove('active');
            });
            
            document.getElementById(`${selectedTemplate}-template`).classList.add('active');
        });
    }
    
    // Device Preview Buttons
    deviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            deviceButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the device type
            const deviceType = this.getAttribute('data-device');
            
            // Get the active template
            const activeTemplate = document.querySelector('.template-frame.active');
            
            // Remove all device classes
            activeTemplate.classList.remove('desktop', 'tablet', 'mobile');
            
            // Add the selected device class
            activeTemplate.classList.add(deviceType);
        });
    });
    
    // Contact Form Validation and Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const businessType = document.getElementById('businessType').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !businessType || !message) {
                showAlert('Please fill in all fields', 'danger');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address', 'danger');
                return false;
            }
            
            // Simulate form submission (would be replaced with actual AJAX submission)
            showAlert('Thanks for contacting us! We\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Alert message function
    function showAlert(message, type) {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Insert before contact form
        if (contactForm) {
            contactForm.parentNode.insertBefore(alertDiv, contactForm);
            
            // Auto dismiss after 5 seconds
            setTimeout(() => {
                alertDiv.classList.remove('show');
                setTimeout(() => {
                    alertDiv.remove();
                }, 300);
            }, 5000);
        }
    }
    
    // Typed.js integration for hero section (if available)
    if (typeof Typed !== 'undefined') {
        const typedElement = document.querySelector('.typed');
        if (typedElement) {
            new Typed('.typed', {
                strings: ['Websites', 'Landing Pages', 'E-commerce', 'Portfolios'],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true
            });
        }
    }

    // Template Preview Hover Effect
    const templateFrames = document.querySelectorAll('.template-frame');
    templateFrames.forEach(frame => {
        const overlay = frame.querySelector('.template-overlay');
        
        if (overlay) {
            frame.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
            });
            
            frame.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
            });
        }
    });

    // Responsive Images Loading
    function handleDevicePreview() {
        const activeDevice = document.querySelector('.device-buttons .btn.active');
        if (activeDevice) {
            const deviceType = activeDevice.getAttribute('data-device');
            const activeTemplate = document.querySelector('.template-frame.active');
            
            if (activeTemplate) {
                activeTemplate.classList.remove('desktop', 'tablet', 'mobile');
                activeTemplate.classList.add(deviceType);
            }
        }
    }

    // Initialize device preview
    handleDevicePreview();

    // Add active class to nav links based on scroll position
    function updateNavActiveState() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update nav active state on scroll
    window.addEventListener('scroll', updateNavActiveState);

    // Initialize tooltips (if Bootstrap JS is loaded)
    if (typeof bootstrap !== 'undefined' && typeof bootstrap.Tooltip !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Preload animation
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    });
});