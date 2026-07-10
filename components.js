class AppNavbar extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname.split('/').pop() || 'home.html';
        
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

        <nav class="navbar transition-navbar visible">
            <div class="container">
                <a href="home.html" class="logo">
                    <img src="assets/logo-ar.png" alt="Aarambh Realtors">
                </a>
                
                <ul class="nav-links" id="navLinks">
                    <li><a href="home.html" class="${currentPath === 'home.html' || currentPath === '' ? 'active' : ''}">Home</a></li>
                    <li><a href="about.html" class="${currentPath === 'about.html' ? 'active' : ''}">About Us</a></li>
                    <li><a href="home.html#services">Services</a></li>
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

        if(!document.getElementById('navbar-mobile-css')) {
            const style = document.createElement('style');
            style.id = 'navbar-mobile-css';
            style.innerHTML = 
                app-navbar { display: block; position: sticky; top: 0; z-index: 1000; }`
                @media (max-width: 991px) {
                    .nav-links {
                        position: fixed;
                        top: 0;
                        right: -100%;
                        width: 280px;
                        height: 100vh;
                        background: rgba(10, 14, 39, 0.98);
                        backdrop-filter: blur(15px);
                        -webkit-backdrop-filter: blur(15px);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 30px;
                        transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                        z-index: 1000;
                        box-shadow: -10px 0 30px rgba(0,0,0,0.5);
                        margin: 0;
                        padding: 0;
                    }
                    .nav-links.active {
                        right: 0 !important;
                    }
                    .menu-toggle {
                        display: flex;
                        z-index: 1001;
                    }
                    .menu-toggle.active span:nth-child(1) {
                        transform: translateY(8px) rotate(45deg);
                    }
                    .menu-toggle.active span:nth-child(2) {
                        opacity: 0;
                    }
                    .menu-toggle.active span:nth-child(3) {
                        transform: translateY(-8px) rotate(-45deg);
                    }
                    
                    .top-bar {
                        display: none;
                    }

                    .enquire-btn-desktop {
                        display: none;
                    }
                    
                    .top-bar-right {
                        justify-content: flex-end;
                    }
                    .navbar .container {
                        padding: 0 15px;
                    }
                    .nav-links li {
                        width: 100%;
                        text-align: center;
                    }
                    .nav-links a {
                        font-size: 20px;
                        display: block;
                        padding: 15px;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this.initNavbarLogic();
    }

    initNavbarLogic() {
        const menuToggle = this.querySelector('#menuToggle');
        const navLinks = this.querySelector('#navLinks');
        const navbar = this.querySelector('.navbar');
        const topBar = this.querySelector('.top-bar');
        let lastScroll = 0;

        if(menuToggle) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });
        }

        if(navLinks) {
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if(menuToggle) menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                });
            });
        }

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                if(navbar) navbar.classList.add('scrolled');
            } else {
                if(navbar) navbar.classList.remove('scrolled');
            }
            
            if (currentScroll > lastScroll && currentScroll > 400) {
                if(navbar) navbar.classList.add('nav-hidden');
                if(topBar) topBar.classList.add('hidden');
            } else {
                if(navbar) navbar.classList.remove('nav-hidden');
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
        <footer class="footer premium-footer">
            <div class="footer-overlay"></div>
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-col brand-col">
                        <img src="assets/logo-ar.png" alt="Aarambh Realtors" class="footer-logo">
                        <p>Aarambh Realtors is your premier partner in the Indian real estate market. We specialize in luxury residential, commercial, and investment properties with a focus on trust and transparency.</p>
                        <div class="footer-social-new">
                            <a href="#" class="social-icon-btn"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social-icon-btn"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="social-icon-btn"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#" class="social-icon-btn"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-col">
                        <h4>Explore</h4>
                        <ul class="footer-links">
                            <li><a href="home.html"><i class="fas fa-chevron-right"></i> Home</a></li>
                            <li><a href="about.html"><i class="fas fa-chevron-right"></i> About Us</a></li>
                            <li><a href="projects.html"><i class="fas fa-chevron-right"></i> All Projects</a></li>
                            <li><a href="home.html#services"><i class="fas fa-chevron-right"></i> Our Services</a></li>
                            <li><a href="contact.html"><i class="fas fa-chevron-right"></i> Contact Us</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4>Services</h4>
                        <ul class="footer-links">
                            <li><a href="home.html#services"><i class="fas fa-chevron-right"></i> Residential Sales</a></li>
                            <li><a href="home.html#services"><i class="fas fa-chevron-right"></i> Commercial Leasing</a></li>
                            <li><a href="home.html#services"><i class="fas fa-chevron-right"></i> Farmhouse Plots</a></li>
                            <li><a href="home.html#services"><i class="fas fa-chevron-right"></i> Investment Advisory</a></li>
                            <li><a href="home.html#services"><i class="fas fa-chevron-right"></i> Property Management</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h4>Reach Us</h4>
                        <div class="footer-contact-new">
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <p>172/B, Tower A, The Corenthum, Sector 62, Noida, UP - 201301</p>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-phone-alt"></i>
                                <p>+91 9810319001</p>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <p>info@aarambhrealtors.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="footer-divider"></div>
                
                <div class="footer-bottom-new">
                    <div class="copyright">
                        <p>&copy; ${new Date().getFullYear()} <strong>Aarambh Realtors</strong>. All Rights Reserved.</p>
                    </div>
                    <div class="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
        `;

        if(!document.getElementById('footer-styles-css')) {
            const style = document.createElement('style');
            style.id = 'footer-styles-css';
            style.innerHTML = 
                app-navbar { display: block; position: sticky; top: 0; z-index: 1000; }`
                .premium-footer {
                    background: #05081a;
                    padding: 100px 0 40px;
                    color: #fff;
                    position: relative;
                    overflow: hidden;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }
                .footer-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at 50% 0%, rgba(25, 118, 210, 0.05) 0%, transparent 70%);
                    pointer-events: none;
                }
                .footer-logo {
                    height: 70px;
                    margin-bottom: 25px;
                    filter: drop-shadow(0 0 10px rgba(255,255,255,0.1));
                }
                .brand-col p {
                    color: #9aa5b8;
                    line-height: 1.8;
                    font-size: 14px;
                    margin-bottom: 30px;
                }
                .footer-social-new {
                    display: flex;
                    gap: 15px;
                }
                .social-icon-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    font-size: 16px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .social-icon-btn:hover {
                    background: #ff5252;
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(255,82,82,0.3);
                    border-color: #ff5252;
                }
                .footer-col h4 {
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 30px;
                    position: relative;
                    color: #fff;
                }
                .footer-col h4::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 0;
                    width: 40px;
                    height: 2px;
                    background: #ff5252;
                }
                .footer-links {
                    list-style: none;
                }
                .footer-links li {
                    margin-bottom: 15px;
                }
                .footer-links li a {
                    color: #9aa5b8;
                    text-decoration: none;
                    font-size: 15px;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .footer-links li a i {
                    font-size: 10px;
                    color: #ff5252;
                    opacity: 0;
                    transform: translateX(-5px);
                    transition: all 0.3s ease;
                }
                .footer-links li a:hover {
                    color: #fff;
                    transform: translateX(5px);
                }
                .footer-links li a:hover i {
                    opacity: 1;
                    transform: translateX(0);
                }
                .footer-contact-new .contact-item {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                .footer-contact-new i {
                    color: #ff5252;
                    margin-top: 5px;
                    font-size: 18px;
                }
                .footer-contact-new p {
                    color: #9aa5b8;
                    font-size: 14px;
                    line-height: 1.6;
                }
                .footer-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    margin: 50px 0 30px;
                }
                .footer-bottom-new {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 20px;
                }
                .footer-bottom-new p {
                    color: #64748b;
                    font-size: 14px;
                }
                .footer-bottom-links {
                    display: flex;
                    gap: 30px;
                }
                .footer-bottom-links a {
                    color: #64748b;
                    text-decoration: none;
                    font-size: 13px;
                    transition: color 0.3s;
                }
                .footer-bottom-links a:hover {
                    color: #fff;
                }
                @media (max-width: 768px) {
                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 50px;
                        text-align: center;
                    }
                    .footer-col h4::after {
                        left: 50%;
                        transform: translateX(-50%);
                    }
                    .footer-social-new {
                        justify-content: center;
                    }
                    .footer-links li a {
                        justify-content: center;
                    }
                    .footer-contact-new .contact-item {
                        flex-direction: column;
                        align-items: center;
                        gap: 10px;
                    }
                    .footer-bottom-new {
                        flex-direction: column;
                    }
                }
            `;
            document.head.appendChild(style);
        }
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
            style.innerHTML = 
                app-navbar { display: block; position: sticky; top: 0; z-index: 1000; }`
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
    if(!document.getElementById('page-transitions-css')) {
        const style = document.createElement('style');
        style.id = 'page-transitions-css';
        style.innerHTML = 
                app-navbar { display: block; position: sticky; top: 0; z-index: 1000; }`
            body { 
                opacity: 0; 
                transition: opacity 0.4s ease-in-out;
            }
            body.page-loaded {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 50);

    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const target = this.getAttribute('target');
            
            if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || target === '_blank' || href === 'javascript:void(0);' || href === '#') return;
            
            e.preventDefault();
            document.body.classList.remove('page-loaded');

            setTimeout(() => {
                window.location.href = href;
            }, 400);
        });
    });
});
