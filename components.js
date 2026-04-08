class AppNavbar extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const isDarkTheme = document.body.classList.contains('dark-theme'); // just in case
        
        this.innerHTML = `
        <div class="top-bar">
            <div class="container">
                <div class="top-bar-left">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>172/B 7th floor, Tower A, The Corenthum, Sector 62, Noida, Uttar Pradesh, 201309</span>
                </div>
                <div class="top-bar-right">
                    <a href="tel:9810319001"><i class="fas fa-phone"></i> 9810319001</a>
                    <a href="mailto:info@aarambhrealtors.com"><i class="fas fa-envelope"></i> info@aarambhrealtors.com</a>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                    <a href="#" class="enquire-btn" onclick="if(typeof openModal === 'function') openModal(); return false;">Enquire Now</a>
                </div>
            </div>
        </div>

        <nav class="navbar transition-navbar">
            <div class="container">
                <a href="home.html" class="logo">
                    <img src="assets/logo-ar.png" alt="Aarambh Realtors">
                </a>
                <ul class="nav-links">
                    <li><a href="home.html" class="${currentPath === 'home.html' ? 'active' : ''}">Home</a></li>
                    <li><a href="about.html" class="${currentPath === 'about.html' ? 'active' : ''}">About Us</a></li>
                    <li><a href="home.html#services">Services</a></li>
                    <li><a href="projects.html" class="${currentPath === 'projects.html' ? 'active' : ''}">Projects</a></li>
                    <li><a href="contact.html" class="${currentPath === 'contact.html' ? 'active' : ''}">Contact</a></li>
                </ul>
                <button class="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
        `;

        this.initSmartHeader();
    }

    initSmartHeader() {
        let lastScroll = 0;
        const navbar = this.querySelector('.navbar');
        const topBar = this.querySelector('.top-bar');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled', 'visible');
            } else {
                navbar.classList.remove('scrolled', 'visible');
            }
            
            // Smart Sticky Logic: Hide on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 200) {
                // Scrolling down
                if(topBar) topBar.classList.add('hidden');
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                if(topBar) topBar.classList.remove('hidden');
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });

        // Add CSS for Smart Header smoothly sliding
        if(!document.getElementById('smart-header-css')) {
            const style = document.createElement('style');
            style.id = 'smart-header-css';
            style.innerHTML = `
                app-navbar {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    display: block;
                }
                .transition-navbar {
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease, padding 0.3s ease;
                }
                .top-bar {
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s ease, padding 0.3s ease;
                }
                .top-bar.hidden {
                    transform: translateY(-100%);
                    height: 0;
                    padding-top: 0;
                    padding-bottom: 0;
                    overflow: hidden;
                }
            `;
            document.head.appendChild(style);
        }
    }
}
customElements.define('app-navbar', AppNavbar);

class AppFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer scroll-hidden">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-brand scroll-fade-left">
                        <img src="assets/logo-ar.png" alt="Aarambh Realtors" class="footer-logo">
                        <p>Building trust, delivering dreams. Your trusted real estate partner.</p>
                    </div>
                    <div class="footer-links scroll-hidden delay-1">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="home.html">Home</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="home.html#services">Services</a></li>
                            <li><a href="projects.html">Projects</a></li>
                        </ul>
                    </div>
                    <div class="footer-contact scroll-fade-right">
                        <h4>Contact</h4>
                        <p><i class="fas fa-phone"></i> 9810319001</p>
                        <p><i class="fas fa-envelope"></i> info@aarambhrealtors.com</p>
                    </div>
                </div>
                <div class="footer-bottom scroll-hidden delay-2">
                    <div class="footer-social" style="display:flex; gap:10px;">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                    <p>&copy; ${new Date().getFullYear()} Aarambh Realtors. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
        `;
    }
}
customElements.define('app-footer', AppFooter);

class AppWidgets extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="floating-buttons widget-animations">
            <a href="#" class="float-btn chat-btn" onclick="if(typeof openModal === 'function') { openModal(); } return false;">
                <i class="fas fa-comment-dots"></i>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=919810319001&text=Hi%20Aarambh%20Realtors,%20I%20am%20interested%20in%20your%20projects" class="float-btn whatsapp-btn" target="_blank">
                <i class="fab fa-whatsapp"></i>
                <span class="whatsapp-ping"></span>
            </a>
        </div>
        `;

        if(!document.getElementById('whatsapp-widget-css')) {
            const style = document.createElement('style');
            style.id = 'whatsapp-widget-css';
            style.innerHTML = `
                .widget-animations .float-btn {
                    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .widget-animations .float-btn:hover {
                    transform: scale(1.15) translateY(-5px);
                }
                .whatsapp-ping {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 12px;
                    height: 12px;
                    background: #25D366;
                    border-radius: 50%;
                    border: 2px solid white;
                    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                @keyframes ping {
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
}
customElements.define('app-widgets', AppWidgets);

// Page Transitions Setup
document.addEventListener('DOMContentLoaded', () => {
    // Inject smooth transition CSS if not present
    if(!document.getElementById('page-transitions-css')) {
        const style = document.createElement('style');
        style.id = 'page-transitions-css';
        style.innerHTML = \`
            body { 
                opacity: 0; 
                transition: opacity 0.4s ease-in-out;
            }
            body.page-loaded {
                opacity: 1;
            }
        \`;
        document.head.appendChild(style);
    }
    
    // Fade in on load
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 50);

    // Fade out on link click (only for internal links)
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const target = this.getAttribute('target');
            
            if (href && href.startsWith('#')) return; // ignore hashes
            if (href && href.startsWith('mailto')) return; // ignore mailto
            if (href && href.startsWith('tel')) return; // ignore tel
            if (target === '_blank') return; // ignore blank tabs
            if (href === 'javascript:void(0);' || href === '#') return; // ignore triggers
            
            // It's a local page navigate
            e.preventDefault();
            document.body.classList.remove('page-loaded');

            setTimeout(() => {
                window.location.href = href;
            }, 400); // match transition duration
        });
    });
});
