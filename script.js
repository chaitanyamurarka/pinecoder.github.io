document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-link');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    const words = ["algo development", "complex strategies", "automated trading", "fast execution"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChars = isDeleting 
            ? currentWord.substring(0, charIndex--)
            : currentWord.substring(0, charIndex++);
        
        if (typewriterElement) {
            typewriterElement.textContent = currentChars;
        }

        if (!isDeleting && charIndex === currentWord.length + 1) {
            isDeleting = true;
            setTimeout(type, 2000); // Pause at end of word
        } else if (isDeleting && charIndex === -1) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500); // Pause before typing new word
        } else {
            const typingSpeed = isDeleting ? 50 : 120;
            setTimeout(type, typingSpeed);
        }
    }
    if (typewriterElement) {
        type();
    }
    
    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = question.classList.contains('open');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-question').classList.remove('open');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                }
            });

            // Open or close the clicked item
            if (!isOpen) {
                question.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                question.classList.remove('open');
                answer.style.maxHeight = '0px';
            }
        });
    });
    
    // --- Scroll-triggered Animations for Feature Cards & How It Works ---
    const animatedElements = document.querySelectorAll('.feature-card, .how-it-works-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(card => {
        observer.observe(card);
    });

});
