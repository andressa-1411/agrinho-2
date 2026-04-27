// Ativa animações conforme o usuário rola a página
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .benefit-card, .about-image');
    
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8;
        
        if (isVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Configurações iniciais das animações
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.card, .benefit-card, .about-image');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s ease-out';
    });
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Smooth Scroll para o menu
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
