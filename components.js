class AppNavbar extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        this.innerHTML = `
        <div class="top-bar">
            <div class="container">
                <div class="top-bar-left">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>172/B 7th floor, Tower A, The Corenthum, Sector 62, Noida, UP</span>
                </div>
                <div class="top-bar-right">
                    <a href="tel:9810319001"><i class="fas fa-phone"></i> 9810319001</a>
                    <a href="mailto:info@aarambhrealtors.com"><i class="fas fa-envelope"></i> info@aarambhrealtors.com</a>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <nav class="navbar transition-navbar">
            <div class="container">
                <a href="index.html" class="logo">
                    <img src="assets/logo-ar.png" alt="Aarambh Realtors">
                </a>
                
                <ul class="nav-links" id="navLinks">
                    <li><a href="index.html" class="${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}">Home</a></li>
                    <li><a href="about.html" class="${currentPath === 'about.html' ? 'active' : ''}">About Us</a></li>
                    <li><a href="index.html#services">Services</a></li>
                    <li><a href="projects.html" class="${currentPath === 'projects.html' ? 'active' : ''}">Projects</a></li>
                    <li><a href="contact.html" class="${currentPath === 'contact.html' ? 'active' : ''}">Contact</a></li>
                    <li class="mobile-only"><a href="#" class="enquire-btn-nav" onclick="openModal()">Enquire Now</a></li>
                </ul>

                <div class="nav-actions">
                    <a href="#" class="enquire-btn-desktop" onclick="openModal()">Enquire Now</a>
                    <button class="menu-toggle" id="menuToggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
        `;

        this.initNavbarLogic();
    }

    initNavbarLogic() {
        const menuToggle = this.querySelector('#menuToggle');
        const navLinks = this.querySelector('#navLinks');
        const navbar = this.querySelector('.navbar');
        const topBar = this.querySelector('.top-bar');
        let lastScroll = 0;

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Background & Height
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Smart Hide/Show
            if (currentScroll > lastScroll && currentScroll > 400) {
                // Scrolling down
                navbar.classList.add('nav-hidden');
                if(topBar) topBar.classList.add('hidden');
            } else {
                // Scrolling up
                navbar.classList.remove('nav-hidden');
                if(topBar) topBar.classList.remove('hidden');
            }
            
            lastScroll = currentScroll;
        });
    }
}
customElements.define('app-navbar', AppNavbar);

class AppFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-col brand-col">
                        <img src="assets/logo-ar.png" alt="Aarambh Realtors" class="footer-logo">
                        <p>Building trust, delivering dreams. Your premier partner in luxury real estate across India.</p>
                        <div class="footer-social">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="projects.html">Projects</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4>Our Services</h4>
                        <ul>
                            <li><a href="index.html#services">Residential</a></li>
                            <li><a href="index.html#services">Commercial</a></li>
                            <li><a href="index.html#services">Farmhouses</a></li>
                            <li><a href="index.html#services">Premium Plots</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4>Contact Us</h4>
                        <div class="footer-contact-info">
                            <p><i class="fas fa-phone-alt"></i> +91 9810319001</p>
                            <p><i class="fas fa-envelope"></i> info@aarambhrealtors.com</p>
                            <p><i class="fas fa-map-marker-alt"></i> Sector 62, Noida, UP</p>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Aarambh Realtors. Crafted for Excellence.</p>
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
