// Mobile-only enhancements
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

    // Add simple swipe to carousel arrows
    var carousel = document.querySelector('.services-carousel');
    var prev = document.getElementById('prevBtn');
    var next = document.getElementById('nextBtn');
    if (carousel && prev && next) {
        var startX = 0;
        var threshold = 40;
        carousel.addEventListener('touchstart', function(e){
            startX = e.changedTouches[0].clientX;
        }, { passive: true });
        carousel.addEventListener('touchend', function(e){
            var dx = e.changedTouches[0].clientX - startX;
            if (dx > threshold) { prev.click(); }
            else if (dx < -threshold) { next.click(); }
        }, { passive: true });
    }
});






