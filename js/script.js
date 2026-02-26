document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 0';
            header.style.background = 'rgba(10, 11, 16, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.background = 'rgba(10, 11, 16, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Close mobile menu on link click or close button click
    const closeMenu = document.querySelector('.close-menu');
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });


    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Smooth scroll for nav links (only for anchors on the same page)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Contact Form Logic
    const contactForm = document.getElementById('dedicated-contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');

        // Auto-fill name logic
        const savedName = localStorage.getItem('user_name');
        if (savedName && nameInput) {
            nameInput.value = savedName;
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const productType = document.getElementById('product-type').value;
            const message = document.getElementById('message').value;

            // Save name for next time
            localStorage.setItem('user_name', name);

            // Trigger Animation Sequence
            const animationOverlay = document.getElementById('submission-animation');
            const contactContainer = document.querySelector('.contact-form-container');

            // 1. Shrink the form
            contactForm.classList.add('shrinking');

            // 2. Show animation overlay after form shrinks
            setTimeout(() => {
                animationOverlay.classList.remove('hidden');
                animationOverlay.classList.add('animate-mail', 'is-receiving');
            }, 800);

            // 3. Construct professional email
            const subject = encodeURIComponent(`New Inquiry: ${productType} - from ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Product Interest: ${productType}\n\n` +
                `Message:\n${message}`
            );

            // 4. Send after 5 seconds of animation
            const mailtoLink = `mailto:aks64bits@gmail.com?subject=${subject}&body=${body}`;

            setTimeout(() => {
                window.location.href = mailtoLink;

                // Optional: Soft reset after a delay if they come back to the tab
                setTimeout(() => {
                    contactForm.classList.remove('shrinking');
                    animationOverlay.classList.add('hidden');
                    animationOverlay.classList.remove('animate-mail', 'is-receiving');
                    contactForm.reset();
                }, 2000);
            }, 5800); // 800ms shrink + 5000ms flight
        });
    }
});

// Starry Background Animation
class StarryBackground {
    constructor() {
        this.canvas = document.getElementById('star-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 150;
        this.mouse = { x: -1000, y: -1000 };

        this.init();
        this.animate();
        this.events();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random()
            });
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    events() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.stars.forEach(star => {
            // Move stars
            star.x += star.speedX;
            star.y += star.speedY;

            // Interaction with mouse
            const dx = this.mouse.x - star.x;
            const dy = this.mouse.y - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const angle = Math.atan2(dy, dx);
                const force = (150 - distance) / 150;
                star.x -= Math.cos(angle) * force * 2;
                star.y -= Math.sin(angle) * force * 2;
            }

            // Wrap around edges
            if (star.x < 0) star.x = this.canvas.width;
            if (star.x > this.canvas.width) star.x = 0;
            if (star.y < 0) star.y = this.canvas.height;
            if (star.y > this.canvas.height) star.y = 0;

            // Draw star
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Brand Text Interaction
function initBrandAnimation() {
    const brandTexts = document.querySelectorAll('.brand-name');
    brandTexts.forEach(brand => {
        const text = brand.textContent.trim();
        brand.innerHTML = '';

        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.setProperty('--char-index', i);
            brand.appendChild(span);

            // Add magnetic effect logic
            brand.addEventListener('mousemove', (e) => {
                const rect = span.getBoundingClientRect();
                const charX = rect.left + rect.width / 2;
                const charY = rect.top + rect.height / 2;

                const dist = Math.sqrt(
                    Math.pow(e.clientX - charX, 2) +
                    Math.pow(e.clientY - charY, 2)
                );

                if (dist < 50) {
                    const angle = Math.atan2(e.clientY - charY, e.clientX - charX);
                    const force = (50 - dist) / 50;
                    const moveX = Math.cos(angle) * force * 5;
                    const moveY = Math.sin(angle) * force * 5;
                    span.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2)`;
                } else {
                    span.style.transform = 'translate(0, 0) scale(1)';
                }
            });

            brand.addEventListener('mouseleave', () => {
                span.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    });
}

// Counter Animation Logic
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-counter');
    const options = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.setAttribute('data-current', Math.floor(count));
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.setAttribute('data-current', target);
                    }
                };

                updateCount();
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => {
        counter.setAttribute('data-current', '0'); // Initialize
        counterObserver.observe(counter);
    });
}


// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new StarryBackground();
    initBrandAnimation();
    initCounterAnimation();
});
