// Enhanced Mobile JavaScript Features
document.addEventListener('DOMContentLoaded', function() {
    // Ensure mobile menu toggles close after navigation
    var menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.addEventListener('click', function(e){
            if (e.target.tagName === 'A') {
                menu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Enhanced swipe gestures for carousel
    var carousel = document.querySelector('.services-carousel');
    var prev = document.getElementById('prevBtn');
    var next = document.getElementById('nextBtn');
    if (carousel && prev && next) {
        var startX = 0;
        var startY = 0;
        var threshold = 50;
        var isHorizontalSwipe = false;

        carousel.addEventListener('touchstart', function(e){
            startX = e.changedTouches[0].clientX;
            startY = e.changedTouches[0].clientY;
            isHorizontalSwipe = false;
        }, { passive: true });

        carousel.addEventListener('touchmove', function(e){
            if (!startX || !startY) return;

            var moveX = e.changedTouches[0].clientX;
            var moveY = e.changedTouches[0].clientY;
            var diffX = Math.abs(moveX - startX);
            var diffY = Math.abs(moveY - startY);

            // Determine if it's a horizontal swipe
            if (diffX > diffY && diffX > 10) {
                isHorizontalSwipe = true;
                e.preventDefault(); // Prevent scrolling when swiping horizontally
            }
        }, { passive: false });

        carousel.addEventListener('touchend', function(e){
            if (!isHorizontalSwipe) return;

            var endX = e.changedTouches[0].clientX;
            var dx = endX - startX;

            if (dx > threshold) {
                prev.click();
            } else if (dx < -threshold) {
                next.click();
            }

            startX = 0;
            startY = 0;
            isHorizontalSwipe = false;
        }, { passive: true });
    }

    // Mobile-specific scroll optimizations
    var scrollElements = document.querySelectorAll('.service-panel, .blog-card, .testimonial-card');
    scrollElements.forEach(function(element) {
        element.style.willChange = 'transform';
    });

    // Debounced scroll handler for mobile performance
    var scrollTimeout;
    function debouncedScroll() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Mobile-specific scroll effects
            var scrolled = window.pageYOffset;
            var rate = scrolled * -0.3;

            // Apply subtle parallax to hero on mobile
            var hero = document.querySelector('.hero');
            if (hero && window.innerWidth <= 768) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        }, 16); // ~60fps
    }

    window.addEventListener('scroll', debouncedScroll, { passive: true });

    // Touch-friendly button interactions
    var buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .carousel-nav');
    buttons.forEach(function(button) {
        var touchStartTime = 0;

        button.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });

        button.addEventListener('touchend', function(e) {
            var touchDuration = Date.now() - touchStartTime;
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.2s ease';

            // Prevent click if touch was too long (potential scroll)
            if (touchDuration > 300) {
                e.preventDefault();
            }
        }, { passive: true });
    });

    // Mobile menu enhancements
    var mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.9)';
        }, { passive: false });

        mobileMenuToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(1)';
        }, { passive: false });
    }

    // Prevent zoom on double tap
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function(e) {
        var now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });

    // Mobile viewport height fix for Safari
    function setVH() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }

    setVH();
    window.addEventListener('resize', setVH, { passive: true });
    window.addEventListener('orientationchange', function() {
        setTimeout(setVH, 100);
    }, { passive: true });

    // Enhanced mobile navigation with swipe gestures
    var mainContent = document.querySelector('main');
    if (mainContent) {
        var navStartX = 0;
        var navThreshold = 80;

        mainContent.addEventListener('touchstart', function(e) {
            navStartX = e.changedTouches[0].clientX;
        }, { passive: true });

        mainContent.addEventListener('touchend', function(e) {
            if (!navStartX) return;

            var navEndX = e.changedTouches[0].clientX;
            var navDiffX = navEndX - navStartX;

            // Swipe from left edge to open menu
            if (navStartX < 30 && navDiffX > navThreshold && menu) {
                menu.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            navStartX = 0;
        }, { passive: true });
    }

    // Mobile performance: Lazy load images
    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, { rootMargin: '50px 0px' });

        document.querySelectorAll('img[data-src]').forEach(function(img) {
            imageObserver.observe(img);
        });
    }
});






