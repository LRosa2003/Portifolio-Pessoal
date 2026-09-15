document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       ELEMENTOS PRINCIPAIS
       ========================================================= */

    const htmlElement = document.documentElement;

    const themeToggleBtn =
        document.getElementById("theme-toggle");

    const themeIcon =
        document.getElementById("theme-icon");

    const hamburgerBtn =
        document.getElementById("hamburger");

    const navMenu =
        document.getElementById("nav-menu");

    const header =
        document.getElementById("header");

    const backToTopBtn =
        document.getElementById("back-to-top");

    const contactForm =
        document.getElementById("contact-form");

    const toast =
        document.getElementById("toast");


    /* =========================================================
       1. TEMA CLARO / ESCURO
       ========================================================= */

    const savedTheme =
        localStorage.getItem("theme") || "dark";


    function setTheme(theme) {

        htmlElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "theme",
            theme
        );


        if (theme === "dark") {

            themeIcon.className =
                "fas fa-sun";

            themeToggleBtn.setAttribute(
                "aria-label",
                "Mudar para modo claro"
            );

            themeToggleBtn.setAttribute(
                "title",
                "Mudar para modo claro"
            );

        } else {

            themeIcon.className =
                "fas fa-moon";

            themeToggleBtn.setAttribute(
                "aria-label",
                "Mudar para modo escuro"
            );

            themeToggleBtn.setAttribute(
                "title",
                "Mudar para modo escuro"
            );
        }
    }


    setTheme(savedTheme);


    if (themeToggleBtn) {

        themeToggleBtn.addEventListener(
            "click",
            () => {

                const currentTheme =
                    htmlElement.getAttribute(
                        "data-theme"
                    );

                const newTheme =
                    currentTheme === "dark"
                        ? "light"
                        : "dark";

                setTheme(newTheme);

            }
        );
    }



    /* =========================================================
       2. TYPEWRITER
       ========================================================= */

    const sloganText =
        "Ideas into code, code into solutions.";

    const typewriterElement =
        document.getElementById(
            "typewriter-text"
        );


    let index = 0;

    let isDeleting = false;


    function typeEffect() {

        if (!typewriterElement) {
            return;
        }


        if (!isDeleting) {

            typewriterElement.textContent =
                sloganText.substring(
                    0,
                    index
                );

            index++;


            if (index > sloganText.length) {

                isDeleting = true;

                setTimeout(
                    typeEffect,
                    1800
                );

                return;
            }


            setTimeout(
                typeEffect,
                65
            );

        } else {

            typewriterElement.textContent =
                sloganText.substring(
                    0,
                    index
                );

            index--;


            if (index < 0) {

                index = 0;

                isDeleting = false;

                setTimeout(
                    typeEffect,
                    500
                );

                return;
            }


            setTimeout(
                typeEffect,
                38
            );
        }
    }


    setTimeout(
        typeEffect,
        500
    );



    /* =========================================================
       3. NAVEGAÇÃO SUAVE
       ========================================================= */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    anchorLinks.forEach((link) => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const targetSection =
                    document.querySelector(
                        targetId
                    );


                if (!targetSection) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 70;


                const targetPosition =
                    targetSection.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });


                /* Fecha menu mobile */

                if (
                    navMenu &&
                    navMenu.classList.contains(
                        "active"
                    )
                ) {

                    closeMobileMenu();
                }

            }
        );

    });



    /* =========================================================
       4. SCROLL REVEAL
       ========================================================= */

    const animatedElements =
        document.querySelectorAll(
            ".animate-on-scroll"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add("visible");

                                observer.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(
            (element) => {

                observer.observe(element);

            }
        );

    } else {

        animatedElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );
    }



    /* =========================================================
       5. MENU ATIVO + HEADER + BOTÃO TOPO
       ========================================================= */

    const sections =
        document.querySelectorAll(
            "main section"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    function updateScrollState() {

        const scrollPosition =
            window.scrollY;


        /* Header */

        if (header) {

            if (scrollPosition > 30) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );
            }
        }


        /* Botão voltar ao topo */

        if (backToTopBtn) {

            if (scrollPosition > 350) {

                backToTopBtn.classList.add(
                    "visible"
                );

            } else {

                backToTopBtn.classList.remove(
                    "visible"
                );
            }
        }


        /* Menu ativo */

        let currentSection = "";


        sections.forEach(
            (section) => {

                const sectionTop =
                    section.offsetTop - 160;

                const sectionBottom =
                    sectionTop +
                    section.offsetHeight;


                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionBottom
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );
                }

            }
        );


        navLinks.forEach(
            (link) => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute("href") ===
                    `#${currentSection}`
                ) {

                    link.classList.add(
                        "active"
                    );
                }

            }
        );
    }


    window.addEventListener(
        "scroll",
        updateScrollState,
        {
            passive: true
        }
    );


    updateScrollState();



    /* =========================================================
       6. VOLTAR AO TOPO
       ========================================================= */

    if (backToTopBtn) {

        backToTopBtn.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }



    /* =========================================================
       7. MENU MOBILE
       ========================================================= */

    function closeMobileMenu() {

        if (!navMenu || !hamburgerBtn) {
            return;
        }


        navMenu.classList.remove(
            "active"
        );


        hamburgerBtn.setAttribute(
            "aria-expanded",
            "false"
        );


        hamburgerBtn.setAttribute(
            "aria-label",
            "Abrir menu"
        );


        const icon =
            hamburgerBtn.querySelector(
                "i"
            );


        if (icon) {

            icon.className =
                "fas fa-bars";
        }
    }


    if (
        hamburgerBtn &&
        navMenu
    ) {

        hamburgerBtn.addEventListener(
            "click",
            () => {

                const isOpen =
                    navMenu.classList.toggle(
                        "active"
                    );


                hamburgerBtn.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                hamburgerBtn.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Fechar menu"
                        : "Abrir menu"
                );


                const icon =
                    hamburgerBtn.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.className =
                        isOpen
                            ? "fas fa-times"
                            : "fas fa-bars";
                }

            }
        );


        /* Fecha menu ao clicar fora */

        document.addEventListener(
            "click",
            (event) => {

                const clickedInsideMenu =
                    navMenu.contains(
                        event.target
                    );

                const clickedHamburger =
                    hamburgerBtn.contains(
                        event.target
                    );


                if (
                    navMenu.classList.contains(
                        "active"
                    ) &&
                    !clickedInsideMenu &&
                    !clickedHamburger
                ) {

                    closeMobileMenu();
                }

            }
        );


        /* Fecha menu ao pressionar ESC */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    navMenu.classList.contains(
                        "active"
                    )
                ) {

                    closeMobileMenu();

                    hamburgerBtn.focus();
                }

            }
        );

    }



    /* =========================================================
       8. EFEITO DE MOUSE NOS CARDS DE PROJETO
       ========================================================= */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(
        (card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const xPercent =
                        (x / rect.width) * 100;


                    const yPercent =
                        (y / rect.height) * 100;


                    card.style.setProperty(
                        "--mouse-x",
                        `${xPercent}%`
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        `${yPercent}%`
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.setProperty(
                        "--mouse-x",
                        "50%"
                    );


                    card.style.setProperty(
                        "--mouse-y",
                        "50%"
                    );

                }
            );

        }
    );



    /* =========================================================
       9. EFEITO 3D SUTIL NOS CARDS
       ========================================================= */

    projectCards.forEach(
        (card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches
                    ) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateY =
                        ((x / rect.width) - 0.5) *
                        3;


                    const rotateX =
                        ((y / rect.height) - 0.5) *
                        -3;


                    card.style.transform =
                        `translateY(-10px)
                         scale(1.012)
                         perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        }
    );



    /* =========================================================
       10. FORMULÁRIO
       ========================================================= */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                /* Validação nativa */

                if (
                    !contactForm.checkValidity()
                ) {

                    contactForm.reportValidity();

                    return;
                }


                /* Limpa formulário */

                contactForm.reset();


                /* Mostra toast */

                showToast();

            }
        );

    }


    let toastTimeout;


    function showToast() {

        if (!toast) {
            return;
        }


        toast.classList.add(
            "show"
        );


        clearTimeout(
            toastTimeout
        );


        toastTimeout =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                4000
            );

    }



    /* =========================================================
       11. DOWNLOAD DO CURRÍCULO
       ========================================================= */

    const cvButtons =
        document.querySelectorAll(
            '[download="Curriculo_Leticia_Rosa.pdf"]'
        );


    cvButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    /* Pequena confirmação visual */

                    setTimeout(
                        () => {

                            showToastMessage(
                                "Download do currículo iniciado!"
                            );

                        },
                        300
                    );

                }
            );

        }
    );


    function showToastMessage(message) {

        if (!toast) {
            return;
        }


        const originalText =
            toast.childNodes[
                toast.childNodes.length - 1
            ];


        if (originalText) {

            originalText.textContent =
                ` ${message}`;
        }


        toast.classList.add(
            "show"
        );


        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

    }



    /* =========================================================
       12. ANIMAÇÃO DE ENTRADA DOS CARDS
       ========================================================= */

    const cards =
        document.querySelectorAll(
            ".info-card, .skill-category-card, .timeline-item, .project-card, .contact-card"
        );


    cards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${Math.min(index * 60, 300)}ms`;

        }
    );

});

/* ==========================================================================
   GRADIENTE DO BACKGROUND ACOMPANHANDO O MOUSE
   ========================================================================== */

document.addEventListener("mousemove", (event) => {

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    document.body.style.setProperty(
        "--mouse-x",
        `${mouseX}px`
    );

    document.body.style.setProperty(
        "--mouse-y",
        `${mouseY}px`
    );

    document.body.classList.add("mouse-active");
});