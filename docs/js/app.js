// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // 0. Global page-enter animation
    requestAnimationFrame(() => {
        document.body.classList.add('page-ready');
    });

    // 1. Navigation Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 3. Global Theme Toggle (shared across pages)
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const root = document.documentElement;
    const themeStorageKey = 'ero_theme';

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        const dark = theme === 'dark';
        themeToggles.forEach((toggle) => {
            const icon = toggle.querySelector('i');
            const label = toggle.querySelector('span');
            if (icon) icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
            if (label) label.textContent = dark ? 'Day' : 'Night';
        });
    }

    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem(themeStorageKey);
    } catch (error) {
        savedTheme = null;
    }

    if (savedTheme === 'light' || savedTheme === 'dark') {
        applyTheme(savedTheme);
    } else {
        applyTheme('dark');
    }

    themeToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
            try {
                localStorage.setItem(themeStorageKey, nextTheme);
            } catch (error) {
                // Ignore storage write errors (private mode / blocked storage)
            }
        });
    });

    // 4. Highlight Active Nav Link
    const links = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach((link) => {
        link.classList.remove('active');
        const rawHref = (link.getAttribute('href') || '').trim();
        if (!rawHref || rawHref.startsWith('#')) return;

        // Normalize about/home aliases.
        const hrefPage = (rawHref === './' || rawHref === '/' || rawHref === '')
            ? 'index.html'
            : rawHref.split('/').pop();

        if (hrefPage === currentPage) {
            link.classList.add('active');
        }
    });

    // 5. Scroll Reveal with IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // 6. Hero Particle System
    const particleCanvases = document.querySelectorAll('.hero-particles');
    particleCanvases.forEach((canvas) => {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const getBaseParticleCount = () => {
            const isMobile = window.innerWidth < 768;
            if (particleCanvases.length > 1) return isMobile ? 26 : 48;
            return isMobile ? 70 : 130;
        };
        let numParticles = getBaseParticleCount();

        const mouse = {
            x: null,
            y: null,
            radius: 150
        };

        // Capture mouse over the container that owns this canvas.
        const particleHost = canvas.parentElement;
        particleHost.addEventListener('mousemove', function (event) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        });

        particleHost.addEventListener('mouseleave', function () {
            mouse.x = null;
            mouse.y = null;
        });

        // Resize Canvas
        function resize() {
            const parent = canvas.parentElement;
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
            const base = getBaseParticleCount();
            const areaScale = Math.sqrt((canvas.width * canvas.height) / (1280 * 720));
            const scaled = Math.round(base * Math.max(0.8, Math.min(1.4, areaScale)));
            numParticles = Math.max(22, Math.min(180, scaled));
        }
        window.addEventListener('resize', () => {
            resize();
            init();
        });
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 20) + 1;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.angle = Math.random() * Math.PI * 2;
                this.spin = (Math.random() - 0.5) * 0.04;
                this.shape = this.pickShape();
                this.color = this.pickColor();
            }

            pickShape() {
                const r = Math.random();
                if (r < 0.34) return 'circle';
                if (r < 0.54) return 'diamond';
                if (r < 0.74) return 'triangle';
                if (r < 0.9) return 'plus';
                return 'ring';
            }

            pickColor() {
                const palette = [
                    'rgba(14, 165, 233, 0.55)',
                    'rgba(6, 182, 212, 0.5)',
                    'rgba(56, 189, 248, 0.5)',
                    'rgba(13, 148, 136, 0.48)'
                ];
                return palette[Math.floor(Math.random() * palette.length)];
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.shadowColor = 'rgba(14, 165, 233, 0.35)';
                ctx.shadowBlur = 8;

                if (this.shape === 'circle') {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                } else if (this.shape === 'diamond') {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size * 1.5);
                    ctx.lineTo(this.size * 1.15, 0);
                    ctx.lineTo(0, this.size * 1.5);
                    ctx.lineTo(-this.size * 1.15, 0);
                    ctx.closePath();
                    ctx.fill();
                } else if (this.shape === 'triangle') {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size * 1.7);
                    ctx.lineTo(this.size * 1.45, this.size * 1.3);
                    ctx.lineTo(-this.size * 1.45, this.size * 1.3);
                    ctx.closePath();
                    ctx.fill();
                } else if (this.shape === 'plus') {
                    const w = Math.max(1, this.size * 0.65);
                    const l = this.size * 1.8;
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = w;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(-l, 0);
                    ctx.lineTo(l, 0);
                    ctx.moveTo(0, -l);
                    ctx.lineTo(0, l);
                    ctx.stroke();
                    ctx.closePath();
                } else {
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = Math.max(1, this.size * 0.5);
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.closePath();
                }

                ctx.restore();
            }

            update() {
                // Natural movement
                this.x += this.vx;
                this.y += this.vy;
                this.angle += this.spin;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                // Mouse interaction
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance === 0) return;
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    if (distance < mouse.radius) {
                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        // Return to natural position slowly
                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 20;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 20;
                        }
                    }
                }

                // Keep base coords updated so they drift
                this.baseX += this.vx;
                this.baseY += this.vy;
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Draw lines between particles
                for (let j = i; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 80) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(14, 165, 233, ${0.1 - distance / 800})`; // Faint connections
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        }

        init();
        animateCanvas();
    });

    // 7. 3D Tilt Effect on Profile Image
    const profileContainer = document.querySelector('.profile-image-container');
    if (profileContainer) {
        profileContainer.addEventListener('mousemove', (e) => {
            const rect = profileContainer.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15; // Max tilt 15deg
            const rotateY = ((x - centerX) / centerX) * 15;

            profileContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            profileContainer.style.transition = 'transform 0.1s ease';
        });

        profileContainer.addEventListener('mouseleave', () => {
            profileContainer.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
            profileContainer.style.transition = 'transform 0.5s ease';
        });
    }

    // 8. Looping Typewriter Effect
    const typeWriterElement = document.querySelector('.typewriter-text');
    if (typeWriterElement) {
        const phrases = [
            "CS Ph.D. Student @ Stony Brook University",
            "Vision & Robotics Researcher",
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                // Delete characters
                typeWriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Type characters
                typeWriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            // Determine typing speed
            let typeSpeed = isDeleting ? 40 : 80;

            // If word is completely typed
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at the end
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next word
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                // Pause before typing next word
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // Start the effect
        setTimeout(typeWriter, 1000);
    }

});
