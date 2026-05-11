// Efeito de contagem animada para os números estatísticos
document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".stat-number");
    
    const animateStats = () => {
        stats.forEach(stat => {
            const targetText = stat.innerText;
            // Verifica se possui o símbolo de + ou %
            const hasPlus = targetText.includes("+");
            const hasPercent = targetText.includes("%");
            
            // Extrai apenas o valor numérico
            const targetValue = parseInt(targetText.replace(/[^0-9]/g, ''));
            let startValue = 0;
            const duration = 2000; // Tempo da animação em milissegundos
            const stepTime = Math.abs(Math.floor(duration / targetValue));
            
            if (stat.dataset.animated) return; // Evita re-animar
            stat.dataset.animated = true;

            const timer = setInterval(() => {
                startValue += 1;
                let displayValue = startValue;
                
                if (hasPlus) displayValue = "+" + startValue;
                if (hasPercent) displayValue = startValue + "%";
                
                stat.innerText = displayValue;
                
                if (startValue >= targetValue) {
                    clearInterval(timer);
                    stat.innerText = targetText; // Garante o valor exato final
                }
            }, stepTime);
        });
    };

    // Ativa a animação quando a seção de estatísticas estiver visível na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector(".stats");
    if(statsSection) {
        observer.observe(statsSection);
    }
});
