// Animação ao rolar a página
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

document.querySelectorAll('.content-text, .content-video, .stat-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transition = "all 1s";
    observer.observe(el);
});

// Adiciona classe de animação
window.addEventListener('scroll', () => {
    document.querySelectorAll('.content-text, .content-video, .stat-card').forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
});
