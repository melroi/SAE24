// Navigation entre les pages avec animations améliorées
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    // Fonction pour changer de page avec animation
    function showPage(pageId) {
        // Masquer toutes les pages avec animation
        pages.forEach(page => {
            if (page.classList.contains('active')) {
                page.style.opacity = '0';
                page.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    page.classList.remove('active');
                }, 150);
            }
        });

        // Désactiver tous les boutons de navigation
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Afficher la page sélectionnée avec animation
        setTimeout(() => {
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                targetPage.style.opacity = '0';
                targetPage.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    targetPage.style.opacity = '1';
                    targetPage.style.transform = 'translateY(0)';
                }, 50);
            }

            // Activer le bouton correspondant
            const activeButton = document.querySelector(`[data-page="${pageId}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }
        }, 150);

        // Faire défiler vers le haut avec animation fluide
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Ajouter les événements de clic aux boutons de navigation
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
            
            // Animation de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Gestion des boutons d'action avec animations améliorées
    const actionButtons = document.querySelectorAll('.btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Éviter le comportement par défaut pour les boutons de démonstration
            if (this.textContent.includes('Commencer') || 
                this.textContent.includes('En savoir plus') ||
                this.textContent.includes('Créer votre premier rapport')) {
                e.preventDefault();
                
                // Animation de feedback avec effet de vague
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);

                // Afficher un message de démonstration
                if (this.textContent.includes('Créer votre premier rapport') || 
                    this.textContent.includes('Commencer')) {
                    showPage('rapports');
                }
            }
        });
    });

    // Animation au survol des cartes améliorée
    const cards = document.querySelectorAll('.feature-card, .report-card, .team-member');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Gestion du formulaire de paramètres avec animation
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        const saveButton = settingsForm.querySelector('.btn-primary');
        if (saveButton) {
            saveButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Animation de succès
                const originalText = this.textContent;
                const originalBg = this.style.background;
                
                this.textContent = '✓ Sauvegardé !';
                this.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
                this.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = originalBg;
                }, 2000);
            });
        }
    }

    // Parallax effect pour le background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.body;
        const speed = scrolled * 0.5;
        parallax.style.backgroundPosition = `center ${speed}px`;
    });

    // Animation d'apparition au scroll améliorée
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.feature-card, .report-card, .team-member');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Animation de typing pour le titre principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Appliquer l'effet de typing au titre principal
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }

    // Effet de particules flottantes
    function createFloatingParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '1';
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(255, 255, 255, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            particleContainer.appendChild(particle);
        }
    }

    // Créer les particules après un délai
    setTimeout(createFloatingParticles, 1000);

    // Responsive navigation pour mobile avec animations
    function handleResize() {
        const nav = document.querySelector('.nav');
        const headerContent = document.querySelector('.header-content');
        
        if (window.innerWidth <= 768) {
            headerContent.style.flexDirection = 'column';
            nav.style.flexWrap = 'wrap';
            nav.style.justifyContent = 'center';
        } else {
            headerContent.style.flexDirection = 'row';
            nav.style.flexWrap = 'nowrap';
            nav.style.justifyContent = 'flex-end';
        }
    }

    // Appeler au chargement et au redimensionnement
    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation de chargement de la page
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Styles CSS pour les animations JavaScript
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        33% {
            transform: translateY(-10px) rotate(120deg);
        }
        66% {
            transform: translateY(5px) rotate(240deg);
        }
    }
`;
document.head.appendChild(style);

