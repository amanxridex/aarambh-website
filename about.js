// Page Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.page-loader').classList.add('hidden');
    }, 1500);
});

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');
const mobileOverlay = document.getElementById('mobileMenuOverlay');

function openMobileMenu() {
    menuToggle.classList.add('active');
    mobileNav.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', () => {
    if (mobileNav.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

mobileClose.addEventListener('click', closeMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Create Particles (limited on mobile)
function createParticles() {
    const container = document.getElementById('particles');
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 20 : 50;
    
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}
createParticles();

// Recreate particles on resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createParticles, 250);
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}
animateCounters();

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay * 1000);
            revealObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.1, 
    rootMargin: '0px 0px -30px 0px' 
});

revealElements.forEach(el => revealObserver.observe(el));

// Gallery Functionality
let currentImage = 0;
const images = document.querySelectorAll('.gallery-image');
const thumbs = document.querySelectorAll('.thumb');
const progressBar = document.querySelector('.progress-bar');
let autoSlideInterval;

function setImage(index) {
    images.forEach(img => img.classList.remove('active'));
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    
    images[index].classList.add('active');
    thumbs[index].classList.add('active');
    
    const progress = ((index + 1) / images.length) * 100;
    progressBar.style.width = progress + '%';
    
    currentImage = index;
    resetAutoSlide();
}

function changeImage(direction) {
    const newIndex = (currentImage + direction + images.length) % images.length;
    setImage(newIndex);
}

function autoSlide() {
    changeImage(1);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 5000);
}

// Initialize gallery
resetAutoSlide();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changeImage(-1);
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'Escape') closeMobileMenu();
});

// Touch/Swipe support for gallery
let touchStartX = 0;
let touchEndX = 0;
const gallery = document.querySelector('.gallery-main');

gallery.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

gallery.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) changeImage(1);
    if (touchEndX > touchStartX + swipeThreshold) changeImage(-1);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            const dot = entry.target.querySelector('.timeline-dot');
            dot.style.transform = window.innerWidth >= 640 ? 'translateX(-50%) scale(1.3)' : 'scale(1.3)';
            setTimeout(() => {
                dot.style.transform = window.innerWidth >= 640 ? 'translateX(-50%) scale(1)' : 'scale(1)';
            }, 300);
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => timelineObserver.observe(item));

// 3D Tilt effect for value cards (desktop only)
if (window.matchMedia('(min-width: 1024px)').matches) {
    document.querySelectorAll('.value-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Magnetic button effect (desktop only)
if (window.matchMedia('(min-width: 1024px)').matches) {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Text scramble effect for section tags
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply scramble effect
const sectionTags = document.querySelectorAll('.section-tag');
sectionTags.forEach(tag => {
    const fx = new TextScramble(tag);
    const originalText = tag.innerText;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fx.setText(originalText);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(tag);
});

// Add scramble CSS
const style = document.createElement('style');
style.textContent = `
    .scramble-char {
        color: var(--primary);
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// Pause animations when tab hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(autoSlideInterval);
    } else {
        resetAutoSlide();
    }
});