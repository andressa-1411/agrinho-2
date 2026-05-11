document.addEventListener("DOMContentLoaded", () => {
    
    // Efeito de rolagem suave ao clicar nos links do menu
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            
            // Só executa o scroll suave se for uma âncora interna
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

    // Envio do formulário de contato (Apenas demonstração amigável)
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            alert(`Obrigado pelo contato, ${name}! Nossa equipe do Agro Sustentável retornará em breve.`);
            form.reset();
        });
    }

    // Animação de contagem numérica ao atingir a seção "Impacto"
    const counters = document.querySelectorAll(".impacto-num");
    const speed = 200; // Quanto menor, mais rápido

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const targetText = counter.getAttribute("data-target");
                const target = +targetText;
                const currentText = counter.innerText.replace(/[^0-9]/g, '');
                const current = +currentText;

                const increment = target / speed;

                if (current < target) {
                    const nextValue = Math.ceil(current + increment);
                    if (targetText.includes("%")) {
                        counter.innerText = nextValue + "%";
                    } else if (targetText.includes("+")) {
                        counter.innerText = "+" + nextValue;
                    } else {
                        counter.innerText = nextValue;
                    }
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = targetText.includes("%") ? target + "%" : "+" + target;
                }
            };
            updateCount();
        });
    };

    // Monitorar rolagem para disparar os números só quando visível
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const impactoSection = document.getElementById("impacto");
    if (impactoSection) {
        observer.observe(impactoSection);
    }
});
