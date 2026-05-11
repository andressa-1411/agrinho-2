document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ALTERNADOR DE MODO ESCURO/CLARO ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.querySelector(".theme-icon");
    
    // Checa preferência anterior salva no navegador
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
        if (currentTheme === "dark") {
            themeIcon.innerText = "☀️";
        }
    }

    // Evento de clique para alternar o tema
    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeIcon.innerText = "🌙";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeIcon.innerText = "☀️";
        }
    });


    // --- 2. ANIMAÇÃO DE PORCENTAGEM E NÚMEROS ---
    const counters = document.querySelectorAll(".impacto-num");

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target"); 
            const type = counter.getAttribute("data-type");      
            
            let count = 0;
            const duration = 2000; 
            const increment = target / (duration / 16); 

            const updateCount = () => {
                count += increment;
                
                if (count < target) {
                    let roundedValue = Math.ceil(count);
                    
                    if (type === "percent") {
                        counter.innerText = roundedValue + "%";
                    } else if (type === "plus") {
                        counter.innerText = "+" + roundedValue;
                    } else {
                        counter.innerText = roundedValue;
                    }
                    requestAnimationFrame(updateCount);
                } else {
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


    // --- 3. ANIMAÇÃO DE REVELAÇÃO AO ROLAR (SCROLL REVEAL) ---
    const scrollElements = document.querySelectorAll(".scroll-reveal");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add("active");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };

    // Inicializa funções de observação de tela
    const observerOptions = {
        threshold: 0.3
    };

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const impactoSection = document.getElementById("impacto");
    if (impactoSection) {
        countObserver.observe(impactoSection);
    }

    // Ativa detecção de scroll para as transições de surgir na tela
    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });

    // Roda uma vez no início caso o usuário já esteja no meio da página
    handleScrollAnimation();


    // --- 4. ROLAGEM SUAVE ---
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
