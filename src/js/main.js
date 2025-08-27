// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    // Open mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(event) {
            if (event.target.tagName === 'A') {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Services Carousel Functionality
    const carousel = document.querySelector('.services-carousel');
    const slides = document.querySelectorAll('.service-panel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (carousel && slides.length > 0) {
        let currentSlide = 0;
        let isTransitioning = false;
        
        function showSlide(index) {
            if (isTransitioning) return; // Prevent multiple rapid clicks
            
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            
            currentSlide = index;
            
            // Each slide spans full width
            const translateX = -(index * 100);
            
            // Add smooth transition
            carousel.style.transition = 'transform 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)';
            carousel.style.transform = `translate3d(${translateX}%, 0, 0)`;
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            // Prevent rapid clicking during transition
            isTransitioning = true;
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        function goToSlide(index) {
            showSlide(index);
        }
        
        // Keyboard support for buttons
        [prevBtn, nextBtn].forEach(btn => {
            if (!btn) return;
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (btn === nextBtn) nextSlide(); else prevSlide();
                }
            });
        });

        // Event listeners for navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                prevSlide();
            });
            
            prevBtn.addEventListener('touchstart', function(e) {
                e.preventDefault();
                prevSlide();
            }, { passive: false });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                nextSlide();
            });
            
            nextBtn.addEventListener('touchstart', function(e) {
                e.preventDefault();
                nextSlide();
            }, { passive: false });
        }
        
        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                goToSlide(index);
            });
            
            indicator.addEventListener('touchstart', function(e) {
                e.preventDefault();
                goToSlide(index);
            }, { passive: false });
        });
        
        // Add visual feedback for buttons
        [prevBtn, nextBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('mousedown', function() {
                    this.style.transform = 'translateY(-50%) scale(0.95)';
                });
                
                btn.addEventListener('mouseup', function() {
                    this.style.transform = 'translateY(-50%) scale(1)';
                });
                
                btn.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(-50%) scale(1)';
                });
            }
        });
        
        // Initialize first slide
        showSlide(0);
    }
    

    
    // Add scroll effect to service panels (simplified for carousel)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all service panels
    document.querySelectorAll('.service-panel').forEach(panel => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(30px)';
        panel.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(panel);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollIndicator.style.setProperty('--scroll-width', scrolled + '%');
        });
    }

    // Enhanced scroll animations (reuse observerOptions)

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.service-card, .feature-card, .blog-card, .about-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(element);
    });

    // Header scroll effect
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.9)';
                header.style.boxShadow = 'none';
            }
        });
    }
});
