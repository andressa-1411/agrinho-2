// ============================================
// AGRO FORTE - SCRIPT PRINCIPAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌱 Agro Forte carregado com sucesso!');
    
    // Inicialização dos módulos
    initNavigation();
    initScrollAnimations();
    initCounterAnimation();
    initVideoControls();
    initParallaxEffect();
    initAOS();
    initIntersectionObserver();
    initMobileMenu();
    
    // Window events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
});

// ============================================
// NAVEGAÇÃO E HEADER
// ============================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            closeMobileMenu();
        });
    });
}

function handleScroll() {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

// ============================================
// MENU MOBILE
// ============================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// ============================================
// ANIMAÇÕES DE SCROLL (AOS - Animate On Scroll)
// ============================================
function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todos os cards
    document.querySelectorAll('.pilar-card, .beneficio-card, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// CONTADORES ANIMADOS
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 30);
}

// ============================================
// CONTROLE DO VÍDEO
// ============================================
function initVideoControls() {
    const playBtn = document.getElementById('playBtn');
    const videoIframe = document.getElementById('heroVideo');
    
    playBtn.addEventListener('click', () => {
        // Simular play no YouTube iframe
        playBtn.style.opacity = '0';
        playBtn.style.pointerEvents = 'none';
        
        // Post message para YouTube API (se disponível)
        videoIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        
        // Efeito de play
        videoIframe.style.transform = 'scale(1.02)';
        setTimeout(() => {
            videoIframe.style.transform = 'scale(1)';
        }, 300);
    });
}

// ============================================
// EFEITO PARALLAX
// ============================================
function initParallaxEffect() {
    const heroBg = document.querySelector('.hero-bg');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 10;
        const y = (e.clientY / window.innerHeight) * 10;
        
        heroBg.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// ============================================
// INTERSECTION OBSERVER AVANÇADO
// ============================================
function initIntersectionObserver() {
    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    document.querySelectorAll('.pilar-card, .beneficio-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        cardsObserver.observe(card);
    });
}

// ============================================
// EFEITOS PARTICULAS (BACKGROUND ANIMADO)
// ============================================
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        hero.appendChild(particle);
    }
}

// ============================================
// RESPONSIVIDADE
// ============================================
function handleResize() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}

// ============================================
// EFEITOS HOVER INTERATIVOS
// ============================================
function initHoverEffects() {
    // Cards hover com scale e shadow
    document.querySelectorAll('.pilar-card, .beneficio-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Stats hover
    document.querySelectorAll('.stat-item, .pilar-stat, .beneficio-stat').forEach(stat => {
        stat.addEventListener('mouseenter', () => {
            stat.style.transform = 'scale(1.05)';
        });
        
        stat.addEventListener('mouseleave', () => {
            stat.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// LOADING E PRELOADER
// ============================================
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <i class="fas fa-leaf"></i>
                <span>Agro Forte</span>
            </div>
            <div class="preloader-bar">
                <div class="preloader-progress"></div>
            </div>
        </div>
    `;
    document.body.appendChild(preloader);
    
    // Simular loading
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.remove();
            createParticles();
            initHoverEffects();
        }, 500);
    }, 2000);
}

// ============================================
// INICIALIZAÇÃO FINAL
// ============================================
window.addEventListener('load', () => {
    initPreloader();
    document.body.classList.add('loaded');
});

// ============================================
// UTILITARIOS
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll suave para todos os links
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

// ============================================
// CSS DINAMICO (OPCIONAL)
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
    
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        top: 100vh;
        animation: particleFloat linear infinite;
        pointer-events: none;
    }
    
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #4CAF50, #8BC34A);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .preloader-content {
        text-align: center;
        color: white;
    }
    
    .preloader-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 2rem;
        gap: 15px;
    }
    
    .preloader-bar {
        width: 200px;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
        overflow: hidden;
        margin: 0 auto;
    }
    
    .preloader-progress {
        width: 0%;
        height: 100%;
        background: white;
        border-radius: 2px;
        animation: load 2s ease-in-out forwards;
    }
    
    @keyframes load {
        to { width: 100%; }
    }
    
    .preloader.fade-out {
        opacity: 0;
        pointer-events: none;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .hamburger {
            display: flex;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);
