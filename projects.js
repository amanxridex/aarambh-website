// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 20 + 'px';
    cursor.style.top = e.clientY - 20 + 'px';
    cursorDot.style.left = e.clientX - 4 + 'px';
    cursorDot.style.top = e.clientY - 4 + 'px';
});

// Cursor hover effect
document.querySelectorAll('a, button, .project-card, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// Page Transition
window.addEventListener('beforeunload', () => {
    document.querySelector('.page-transition').classList.add('active');
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hero Background Slider
const bgSlides = document.querySelectorAll('.bg-slide');
let currentSlide = 0;

function nextSlide() {
    bgSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % bgSlides.length;
    bgSlides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 5000);

// Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const filterTags = document.querySelector('.filter-tags');
const resultsCount = document.querySelector('.results-count strong');
let activeFilters = {
    type: 'all',
    status: 'all',
    minPrice: 0,
    maxPrice: 500
};

// Filter buttons click
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        const group = btn.dataset.group;
        
        // Update active state
        document.querySelectorAll(`.filter-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update filters
        activeFilters[group] = filter;
        
        applyFilters();
        updateFilterTags();
    });
});

// Budget Slider
const rangeMin = document.querySelector('.range-min');
const rangeMax = document.querySelector('.range-max');
const rangeFill = document.querySelector('.range-fill');
const minValue = document.querySelector('.min-value');
const maxValue = document.querySelector('.max-value');

function updateRange() {
    let min = parseInt(rangeMin.value);
    let max = parseInt(rangeMax.value);
    
    if (min > max - 10) {
        min = max - 10;
        rangeMin.value = min;
    }
    if (max < min + 10) {
        max = min + 10;
        rangeMax.value = max;
    }
    
    const percent1 = (min / 500) * 100;
    const percent2 = (max / 500) * 100;
    
    rangeFill.style.left = percent1 + '%';
    rangeFill.style.right = (100 - percent2) + '%';
    
    minValue.textContent = `₹${min} Lakh`;
    maxValue.textContent = max >= 500 ? '₹50+ Crore' : `₹${(max/10).toFixed(1)} Crore`;
    
    activeFilters.minPrice = min;
    activeFilters.maxPrice = max >= 500 ? 10000 : max;
    
    applyFilters();
}

rangeMin.addEventListener('input', updateRange);
rangeMax.addEventListener('input', updateRange);

// Sort functionality
document.querySelector('.sort-select').addEventListener('change', (e) => {
    const sortValue = e.target.value;
    const cardsArray = Array.from(projectCards);
    
    cardsArray.sort((a, b) => {
        const priceA = parseInt(a.dataset.price);
        const priceB = parseInt(b.dataset.price);
        
        switch(sortValue) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'newest':
                return b.classList.contains('new') ? 1 : -1;
            default:
                return 0;
        }
    });
    
    const grid = document.querySelector('.projects-masonry');
    cardsArray.forEach(card => grid.appendChild(card));
});

// Apply filters
function applyFilters() {
    let visibleCount = 0;
    
    projectCards.forEach(card => {
        const type = card.dataset.type;
        const status = card.dataset.status;
        const price = parseInt(card.dataset.price);
        
        const typeMatch = activeFilters.type === 'all' || type === activeFilters.type;
        const statusMatch = activeFilters.status === 'all' || status === activeFilters.status;
        const priceMatch = price >= activeFilters.minPrice && price <= activeFilters.maxPrice;
        
        if (typeMatch && statusMatch && priceMatch) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
            visibleCount++;
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    resultsCount.textContent = visibleCount;
}

// Update filter tags
function updateFilterTags() {
    filterTags.innerHTML = '';
    
    if (activeFilters.type !== 'all') {
        addFilterTag('Type: ' + activeFilters.type.charAt(0).toUpperCase() + activeFilters.type.slice(1), 'type');
    }
    if (activeFilters.status !== 'all') {
        addFilterTag('Status: ' + activeFilters.status.charAt(0).toUpperCase() + activeFilters.status.slice(1), 'status');
    }
}

function addFilterTag(text, group) {
    const tag = document.createElement('div');
    tag.className = 'filter-tag';
    tag.innerHTML = `
        ${text}
        <button onclick="removeFilter('${group}')">&times;</button>
    `;
    filterTags.appendChild(tag);
}

function removeFilter(group) {
    activeFilters[group] = 'all';
    document.querySelector(`.filter-btn[data-group="${group}"][data-filter="all"]`).click();
}

// Clear all filters
document.querySelector('.clear-filters').addEventListener('click', () => {
    activeFilters = { type: 'all', status: 'all', minPrice: 0, maxPrice: 500 };
    
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === 'all') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    rangeMin.value = 0;
    rangeMax.value = 500;
    updateRange();
    
    filterTags.innerHTML = '';
    applyFilters();
});

// Mobile filter toggle
document.querySelector('.filter-toggle')?.addEventListener('click', () => {
    document.querySelector('.filters').classList.toggle('active');
});

// Wishlist functionality
document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        
        // Add pulse animation
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
    });
});

// Comparison functionality
let compareList = [];
const comparisonBar = document.getElementById('comparisonBar');
const compareCount = document.querySelector('.compare-count');

projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('.wishlist-btn') || e.target.closest('.btn-primary') || e.target.closest('.btn-secondary')) {
            return;
        }
        
        const title = card.querySelector('h3').textContent;
        const isSelected = card.classList.contains('selected');
        
        if (isSelected) {
            card.classList.remove('selected');
            compareList = compareList.filter(item => item !== title);
        } else {
            if (compareList.length >= 3) {
                alert('You can compare up to 3 projects only');
                return;
            }
            card.classList.add('selected');
            compareList.push(title);
        }
        
        updateComparisonBar();
    });
});

function updateComparisonBar() {
    compareCount.textContent = compareList.length;
    
    if (compareList.length > 0) {
        comparisonBar.classList.add('active');
    } else {
        comparisonBar.classList.remove('active');
    }
}

function clearComparison() {
    compareList = [];
    projectCards.forEach(card => card.classList.remove('selected'));
    updateComparisonBar();
}

function showComparison() {
    const modal = document.getElementById('comparisonModal');
    const table = document.getElementById('comparisonTable');
    
    table.innerHTML = '';
    
    compareList.forEach(title => {
        const card = Array.from(projectCards).find(c => c.querySelector('h3').textContent === title);
        const img = card.querySelector('img').src;
        const price = card.querySelector('.price').textContent;
        const location = card.querySelector('.location').textContent;
        const type = card.dataset.type;
        
        table.innerHTML += `
            <div class="compare-card">
                <img src="${img}" alt="${title}">
                <h4>${title}</h4>
                <p class="price">${price}</p>
                <p>${location}</p>
                <span class="badge type">${type}</span>
            </div>
        `;
    });
    
    modal.classList.add('active');
}

function closeComparison() {
    document.getElementById('comparisonModal').classList.remove('active');
}

// Modal functions
function openModal(projectName) {
    document.getElementById('modalProjectName').textContent = projectName ? `Enquire: ${projectName}` : 'Enquire Now';
    document.getElementById('enquiryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('enquiryModal').classList.remove('active');
    document.body.style.overflow = '';
}

function submitEnquiry(e) {
    e.preventDefault();
    
    // Simulate form submission
    const btn = e.target.querySelector('.modal-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        closeModal();
        btn.textContent = originalText;
        btn.disabled = false;
        e.target.reset();
        
        // Show success notification
        showNotification('Thank you! We will contact you soon.');
    }, 1500);
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: #4caf50;
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10001;
        animation: slideIn 0.4s ease;
        font-weight: 600;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => notif.remove(), 400);
    }, 3000);
}

// Close modal on outside click
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Escape key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => {
            m.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Load more functionality
document.querySelector('.load-more-btn')?.addEventListener('click', function() {
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    
    setTimeout(() => {
        this.innerHTML = '<span>No More Projects</span><i class="fas fa-check"></i>';
        this.disabled = true;
        this.style.opacity = '0.5';
    }, 1500);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Initialize
updateRange();

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .project-card.selected::after {
        content: '✓';
        position: absolute;
        top: 15px;
        right: 65px;
        width: 30px;
        height: 30px;
        background: #4caf50;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        z-index: 10;
        animation: popIn 0.3s ease;
    }
    @keyframes popIn {
        0% { transform: scale(0); }
        80% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);