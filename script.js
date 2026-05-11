document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Efeito de rolagem suave ao clicar nos links do menu
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // 2. Envio demonstrativo do formulário de contato
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            alert(`Obrigado pelo contato, ${name}! Nossa equipe do Agro Sustentável retornará em breve.`);
            form.reset();
        });
    }

    // 3. ANIMAÇÃO DE PORCENTAGENS E NÚMEROS (Melhorada e Corrigida)
    const counters = document.querySelectorAll(".impacto-num");

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target"); // Valor final numérico
            const type = counter.getAttribute("data-type");      // Tipo (plus ou percent)
            
            let count = 0;
            const duration = 2000; // Tempo total da animação em milissegundos (2 segundos)
            const increment = target / (duration / 16); // Baseado em ~60fps (16ms por frame)

            const updateCount = () => {
                count += increment;
                
                if (count < target) {
                    let roundedValue = Math.ceil(count);
                    
                    // Formata a exibição durante o crescimento do número
                    if (type === "percent") {
                        counter.innerText = roundedValue + "%";
                    } else if (type === "plus") {
                        counter.innerText = "+" + roundedValue;
                    } else {
                        counter.innerText = roundedValue;
                    }
                    
                    requestAnimationFrame(updateCount);
                } else {
                    // Garante que termine exatamente no número final correto
                    if (type === "percent") {
                        counter.innerText = target + "%";
                    } else if (type === "plus") {
                        counter.innerText = "+" + target;
                    } else {
                        counter.innerText = target;
                    }
                }
            };
            
            updateCount();
        });
    };

    // Usando IntersectionObserver para disparar a animação apenas quando a seção estiver visível
    const observerOptions = {
        threshold: 0.3 // Dispara quando 30% da seção de impacto estiver na tela
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target); // Desativa o observador para rodar a animação apenas uma vez
            }
        });
    }, observerOptions);

    const impactoSection = document.getElementById("impacto");
    if (impactoSection) {
        observer.observe(impactoSection);
    }
});
