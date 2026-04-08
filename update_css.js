const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\91836\\ar\\index.css', 'utf8');

const lines = content.split('\n');
const startIdx = lines.findIndex(l => l.includes('/* About Us Section */'));
const endIdx = lines.findIndex(l => l.includes('/* Map Section */'));

if (startIdx !== -1 && endIdx !== -1) {
    const newCss = `/* ================= MODERN TEXT UTILITIES ================= */
.text-gradient {
    background: linear-gradient(135deg, #1976d2, #64b5f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.text-gradient-alt {
    background: linear-gradient(135deg, #ff5252, #ff8a80);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.glass-effect {
    background: rgba(30, 37, 48, 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
}

/* ================= THE MODERN ABOUT US ================= */
.modern-about {
    background: #0a0e27;
    padding: 100px 0;
    position: relative;
    overflow: hidden;
}
.about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}
.section-tag {
    display: inline-block;
    padding: 6px 16px;
    background: rgba(25, 118, 210, 0.1);
    color: #448aff;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 20px;
}
.section-title {
    font-size: 42px;
    color: white;
    line-height: 1.2;
    margin-bottom: 30px;
}
.about-text {
    color: #9aa5b8;
    font-size: 17px;
    line-height: 1.8;
    margin-bottom: 40px;
}
.learn-more-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 15px 30px;
    background: transparent;
    color: white;
    border: 2px solid #1976d2;
    border-radius: 30px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s;
}
.learn-more-btn:hover {
    background: #1976d2;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(25, 118, 210, 0.3);
}

/* Glass Cards */
.about-visual {
    position: relative;
    height: 400px;
}
.glass-card {
    background: rgba(25, 118, 210, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    color: white;
    position: absolute;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    transition: transform 0.4s;
}
.glass-card:hover { transform: translateY(-10px); }
.glass-card i {
    font-size: 40px;
    color: #ff5252;
}
.card-info h3 { font-size: 28px; margin-bottom: 5px; }
.card-info p { color: #9aa5b8; font-size: 14px; margin: 0;}
.trust-card { top: 20px; left: 0; right: 40px; z-index: 2;}
.stat-card { bottom: 20px; right: 0; left: 40px; background: rgba(255, 82, 82, 0.05); z-index:1;}

@media (max-width: 968px) {
    .about-grid { grid-template-columns: 1fr; }
    .about-visual { height: 300px; margin-top: 40px; }
}

/* ================= MODERN SERVICES (BENTO GRID) ================= */
.modern-services {
    background: #0d122b;
    padding: 100px 0;
    position: relative;
    overflow: hidden;
}
.container-relative { position: relative; z-index: 2; }
.bento-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 240px;
    gap: 25px;
    margin-top: 50px;
}
.bento-card {
    background: rgba(30, 37, 48, 0.5);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    padding: 35px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.bento-card:hover {
    border-color: rgba(25, 118, 210, 0.4);
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 40px rgba(25,118,210,0.1);
}
.bento-icon {
    position: absolute;
    top: 35px;
    left: 35px;
    width: 60px;
    height: 60px;
    background: rgba(25, 118, 210, 0.1);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #448aff;
    transition: all 0.4s;
}
.bento-card:hover .bento-icon {
    background: #1976d2;
    color: white;
    transform: scale(1.1) rotate(5deg);
}
.bento-content { position: relative; z-index: 2; }
.bento-content h4 {
    color: white;
    font-size: 22px;
    margin-bottom: 12px;
}
.bento-content p {
    color: #9aa5b8;
    font-size: 15px;
    line-height: 1.6;
    margin: 0;
}
.bento-bg {
    position: absolute;
    bottom: -50%;
    right: -20%;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(25,118,210,0.2) 0%, transparent 70%);
    transition: all 0.5s;
    pointer-events: none;
}
.bento-card:hover .bento-bg { transform: scale(3); }
.bento-wide { grid-column: span 2; }
.bento-tall { grid-row: span 2; }

@media (max-width: 968px) {
    .bento-grid { grid-template-columns: 1fr; grid-auto-rows: auto; }
    .bento-wide, .bento-tall { grid-column: span 1; grid-row: span 1; }
}

/* ================= MODERN PROJECTS (SWIPER) ================= */
.modern-projects {
    background: #0a0e27;
    padding: 100px 0 120px;
    position: relative;
    overflow: hidden;
}
.projects-swiper {
    padding: 40px 20px;
    margin: 0 -20px; /* Counter container padding for shadow space */
    overflow: visible !important; /* Extremely important: fix tilt clipping */
}
/* Reusing Project Card Core CSS from original but cleaning it */
.project-card {
    background: #1e2530;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.05);
    height: 100%;
}
.project-card a {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
}
.project-image {
    position: relative;
    height: 250px;
    overflow: hidden;
}
.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}
.project-card:hover .project-image img {
    transform: scale(1.1);
}
.glass-badge {
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(10, 14, 39, 0.6);
    backdrop-filter: blur(10px);
    padding: 8px 16px;
    border-radius: 30px;
    font-size: 12px;
    font-weight: 700;
    color: white;
    border: 1px solid rgba(255,255,255,0.1);
    letter-spacing: 1px;
}
.glass-badge.ongoing { border-color: #2196f3; color: #64b5f6; }
.glass-badge.ready { border-color: #4caf50; color: #81c784; }
.glass-badge.coming { border-color: #ff5252; color: #ff8a80; }
.glass-badge.new { border-color: #ff9800; color: #ffb74d; }

.project-content {
    padding: 30px;
    position: relative;
}
.project-content h4 {
    color: white;
    font-size: 22px;
    margin-bottom: 15px;
    font-weight: 600;
}
.project-location {
    color: #ff5252;
    font-size: 14px;
    margin-bottom: 15px;
}
.project-desc {
    color: #9aa5b8;
    font-size: 15px;
    line-height: 1.6;
}

/* Swiper custom UI */
.swiper-pagination-bullet {
    background: #fff !important;
    opacity: 0.3 !important;
}
.swiper-pagination-bullet-active {
    background: #ff5252 !important;
    opacity: 1 !important;
}
.glass-nav {
    background: rgba(255,255,255,0.05) !important;
    backdrop-filter: blur(10px) !important;
    width: 50px !important;
    height: 50px !important;
    border-radius: 50% !important;
    color: white !important;
    border: 1px solid rgba(255,255,255,0.1) !important;
}
.glass-nav:after { font-size: 20px !important; }
.glass-nav:hover { background: #ff5252 !important; border-color:#ff5252 !important; }

@media (max-width: 600px) {
    .glass-nav { display: none !important; }
}
.sleek-btn {
    display: inline-block;
    padding: 16px 40px;
    background: linear-gradient(135deg, #1976d2, #1565c0);
    color: white;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.3s;
    border: none;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(25, 118, 210, 0.3);
}
.sleek-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(25, 118, 210, 0.5);
    color: white;
}
.center-btn { text-align: center; margin-top: 40px; }

/* ================= MODERN GET IN TOUCH ================= */
.modern-contact {
    background: #0d122b;
    padding: 100px 0;
    position: relative;
}
.modern-contact::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(10, 14, 39, 0.85); /* Dark overlay */
}
.contact-glass-panel {
    position: relative;
    z-index: 2;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 30px;
    padding: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.5);
}
.contact-info-side h2 {
    font-size: 46px;
    color: white;
    margin-bottom: 20px;
    line-height: 1.2;
}
.contact-info-side p {
    color: #b0b8c8;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 50px;
}
.method-item {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
}
.method-icon {
    width: 60px;
    height: 60px;
    background: rgba(255, 82, 82, 0.1);
    color: #ff5252;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}
.method-item h5 { color: white; font-size: 18px; margin-bottom: 5px; }
.method-item span { color: #9aa5b8; font-size: 16px; }

.glass-form {
    background: rgba(10, 14, 39, 0.5);
    padding: 40px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
}
.input-group {
    position: relative;
    margin-bottom: 25px;
}
.input-group input, .input-group textarea {
    width: 100%;
    padding: 15px 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    font-size: 16px;
    transition: all 0.3s;
    font-family: inherit;
    box-sizing: border-box;
}
.input-group textarea { resize: vertical; min-height: 120px; }
.input-group label {
    position: absolute;
    left: 20px;
    top: 15px;
    color: #9aa5b8;
    transition: all 0.3s;
    pointer-events: none;
}
.input-group input:focus, .input-group input:not(:placeholder-shown),
.input-group textarea:focus, .input-group textarea:not(:placeholder-shown) {
    background: rgba(255, 255, 255, 0.1);
    border-color: #1976d2;
    outline: none;
}
.input-group input:focus ~ label, .input-group input:not(:placeholder-shown) ~ label,
.input-group textarea:focus ~ label, .input-group textarea:not(:placeholder-shown) ~ label {
    top: -10px;
    left: 15px;
    font-size: 12px;
    background: #0a0e27;
    padding: 0 5px;
    color: #1976d2;
    border-radius: 4px;
}
.glowing-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #ff5252, #d32f2f);
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-family: inherit;
}
.glowing-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 82, 82, 0.4);
}

@media (max-width: 968px) {
    .contact-glass-panel { grid-template-columns: 1fr; padding: 40px 20px; }
}
`;

    const before = lines.slice(0, startIdx).join('\n');
    const after = lines.slice(endIdx).join('\n');
    fs.writeFileSync('c:\\Users\\91836\\ar\\index.css', before + '\n' + newCss + '\n' + after);
    console.log('Success CSS Update!');
} else {
    console.log('Indexes not found', startIdx, endIdx);
}
