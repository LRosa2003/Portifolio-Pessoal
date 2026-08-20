document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. ALTERNADOR DE TEMA (MODO CLARO / ESCURO - SOL & LUA)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Recupera tema do localStorage ou usa 'dark' por padrão
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun'; // Ícone de Sol no escuro
            themeToggleBtn.setAttribute('title', 'Mudar para Modo Claro');
        } else {
            themeIcon.className = 'fas fa-moon'; // Ícone de Lua no claro
            themeToggleBtn.setAttribute('title', 'Mudar para Modo Escuro');
        }
    }

    /* ==========================================================================
       2. EFEITO TYPEWRITER (DIGITAÇÃO DO SLOGAN DA CAPA)
       ========================================================================== */
const sloganText = "Ideas into code, code into solutions.";
const typewriterElement = document.getElementById('typewriter-text');

let index = 0;
let isDeleting = false;

function typeEffect() {

    if (!typewriterElement) return;

    if (!isDeleting) {
        // DIGITANDO
        typewriterElement.textContent = sloganText.substring(0, index);
        index++;

        // Quando terminar de digitar
        if (index > sloganText.length) {
            isDeleting = true;

            // Espera 2 segundos antes de apagar
            setTimeout(typeEffect, 1500);
            return;
        }

        // Velocidade da digitação
        setTimeout(typeEffect, 70);

    } else {
        // APAGANDO
        typewriterElement.textContent = sloganText.substring(0, index);
        index--;

        // Quando apagar tudo
        if (index < 0) {
            index = 0;
            isDeleting = false;

            // Pequena pausa antes de começar novamente
            setTimeout(typeEffect, 300);
            return;
        }

        // Velocidade para apagar
        setTimeout(typeEffect, 40);
    }
}

setTimeout(typeEffect, 300);

    /* ==========================================================================
       3. NAVEGAÇÃO SUAVE & GARANTIA DE FUNCIONAMENTO DOS BOTÕES DE SEÇÃO
       ========================================================================== */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ==========================================================================
       4. SCROLL REVEAL (REVELAÇÃO GRADUAL DAS SEÇÕES)
       ========================================================================== */
    const observerOptions = {
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });

    /* ==========================================================================
       5. DESTAQUE AUTOMÁTICO DO MENU CONFORME ROLAGEM & BOTÃO TOPO
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 110;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Exibir botão de voltar ao topo
        if (window.scrollY > 350) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==========================================================================
       6. MENU MOBILE (HAMBURGUER)
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburgerBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburgerBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    /* ==========================================================================
       7. INTERAÇÃO E VALIDAÇÃO DO FORMULÁRIO DE CONTATO
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simula o envio bem sucedido e limpa os campos
            contactForm.reset();

            // Exibe notificação toast
            if (toast) {
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 4000);
            }
        });
    }

});