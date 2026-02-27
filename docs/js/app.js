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
                this.sizeBase = Math.random() * 2.8 + 1.8;
                this.size = this.sizeBase;
                this.sizePhase = Math.random() * Math.PI * 2;
                this.sizeSpeed = 0.01 + Math.random() * 0.02;
                this.sizeAmplitude = 0.2 + Math.random() * 0.55;
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
                this.sizePhase += this.sizeSpeed;
                const smoothPulse = Math.sin(this.sizePhase) * this.sizeAmplitude;
                const randomJitter = (Math.random() - 0.5) * 0.08;
                this.size = Math.max(0.45, this.sizeBase + smoothPulse + randomJitter);

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

                    if (distance < 130) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(14, 165, 233, ${0.2 - distance / 900})`; // Faint but visible connections
                        ctx.lineWidth = 1.8;
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

    // 9. Footer Last-Modified Stamp
    const footerParagraph = document.querySelector('footer p');
    if (footerParagraph && document.lastModified) {
        const modifiedDate = new Date(document.lastModified);
        if (!Number.isNaN(modifiedDate.getTime())) {
            const formatted = modifiedDate.toLocaleString([], {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            const stamp = document.createElement('span');
            stamp.innerHTML = `<br>Last updated: ${formatted}`;
            footerParagraph.appendChild(stamp);
        }
    }

    // 10. Tracking Page Live Data
    const trackingSection = document.getElementById('tracking');
    if (trackingSection) {
        const githubUser = (trackingSection.getAttribute('data-github-user') || 'nero1342').trim();
        const leetcodeUser = (trackingSection.getAttribute('data-leetcode-user') || 'nero1342').trim();

        const updateText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };
        const updateWidth = (id, pct) => {
            const el = document.getElementById(id);
            if (!el) return;
            const bounded = Math.max(0, Math.min(100, pct));
            el.style.width = `${bounded}%`;
        };
        const formatNumber = (value) => {
            if (value == null || value === '') return '--';
            const n = Number(value);
            if (!Number.isFinite(n)) return String(value);
            return n.toLocaleString();
        };
        const asNumber = (value) => {
            const n = Number(value);
            return Number.isFinite(n) ? n : 0;
        };
        const nowLabel = () => new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

        const fetchJSON = async (url, timeoutMs = 12000) => {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), timeoutMs);
            try {
                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return await response.json();
            } finally {
                clearTimeout(timer);
            }
        };

        const initGitHubTracking = async () => {
            const ghProfileLink = document.getElementById('gh-profile-link');
            if (ghProfileLink) ghProfileLink.href = `https://github.com/${githubUser}`;

            try {
                const [profile, events, repos] = await Promise.all([
                    fetchJSON(`https://api.github.com/users/${githubUser}`),
                    fetchJSON(`https://api.github.com/users/${githubUser}/events/public?per_page=100`),
                    fetchJSON(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`)
                ]);

                const now = Date.now();
                const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
                const recentEvents = Array.isArray(events)
                    ? events.filter((event) => new Date(event.created_at).getTime() >= thirtyDaysAgo)
                    : [];

                let commitCount30 = 0;
                const activeRepoSet = new Set();
                const repoCommitMap = new Map();

                recentEvents.forEach((event) => {
                    if (event.type !== 'PushEvent') return;
                    const repoName = event.repo && event.repo.name ? event.repo.name : '';
                    activeRepoSet.add(repoName);
                    const commits = (event.payload && Array.isArray(event.payload.commits))
                        ? event.payload.commits.length
                        : 0;
                    commitCount30 += commits;
                    if (repoName) {
                        repoCommitMap.set(repoName, (repoCommitMap.get(repoName) || 0) + commits);
                    }
                });

                updateText('gh-commits-30', String(commitCount30));
                updateText('gh-active-repos', String(Array.from(activeRepoSet).filter(Boolean).length));
                const publicRepos = (profile && profile.public_repos != null) ? profile.public_repos : '--';
                updateText('gh-public-repos', String(publicRepos));
                updateText('github-status', `Live data for @${githubUser}`);
                updateText('gh-name', `@${githubUser}`);
                updateText('gh-followers', formatNumber(profile && profile.followers != null ? profile.followers : '--'));
                updateText('gh-following', formatNumber(profile && profile.following != null ? profile.following : '--'));
                const avatarEl = document.getElementById('gh-avatar');
                if (avatarEl && profile && profile.avatar_url) avatarEl.src = profile.avatar_url;

                const languageCount = {};
                if (Array.isArray(repos)) {
                    repos.forEach((repo) => {
                        const lang = repo && repo.language ? repo.language : null;
                        if (!lang) return;
                        languageCount[lang] = (languageCount[lang] || 0) + 1;
                    });
                }
                const topLanguage = Object.entries(languageCount).sort((a, b) => b[1] - a[1])[0];
                updateText('gh-language', topLanguage ? `Language: ${topLanguage[0]}` : 'Language: --');

                const dailyPace = commitCount30 / 30;
                const pacePercent = Math.min(100, (dailyPace / 5) * 100);
                updateText('gh-pace-label', `${dailyPace.toFixed(1)} / day`);
                updateText('gh-pace-pct', `${Math.round(pacePercent)}%`);
                updateWidth('gh-pace-bar', pacePercent);
                updateText('gh-updated', `Updated: ${nowLabel()}`);

                const repoListEl = document.getElementById('gh-repo-list');
                if (repoListEl) {
                    const topRepos = Array.from(repoCommitMap.entries())
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5);

                    if (topRepos.length === 0) {
                        repoListEl.innerHTML = '<li class="gh-repo-item"><span class="gh-repo-name">No recent push activity</span><span class="gh-repo-count">0</span></li>';
                    } else {
                        repoListEl.innerHTML = topRepos.map(([fullName, count]) => {
                            const repoShort = fullName.includes('/') ? fullName.split('/').pop() : fullName;
                            return `<li class="gh-repo-item"><span class="gh-repo-name">${repoShort}</span><span class="gh-repo-count">${count}</span></li>`;
                        }).join('');
                    }
                }
            } catch (error) {
                updateText('gh-commits-30', '--');
                updateText('gh-active-repos', '--');
                updateText('gh-public-repos', '--');
                updateText('gh-name', `@${githubUser}`);
                updateText('gh-followers', '--');
                updateText('gh-following', '--');
                updateText('gh-language', 'Language: --');
                updateText('gh-pace-label', '-- / day');
                updateText('gh-pace-pct', '--%');
                updateWidth('gh-pace-bar', 0);
                updateText('github-status', 'Live data unavailable right now.');
                updateText('gh-updated', 'Updated: --');
                const repoListEl = document.getElementById('gh-repo-list');
                if (repoListEl) {
                    repoListEl.innerHTML = '<li class="gh-repo-item"><span class="gh-repo-name">Could not load repositories</span><span class="gh-repo-count">--</span></li>';
                }
            }
        };

        const initLeetCodeTracking = async () => {
            const lcProfileLink = document.getElementById('lc-profile-link');
            if (lcProfileLink) lcProfileLink.href = `https://leetcode.com/u/${leetcodeUser}/`;

            try {
                // Primary source requested by user: noworneverev/leetcode-api
                const data = await fetchJSON(`https://leetcode-api-pied.vercel.app/user/${leetcodeUser}`);

                const profile = data && data.profile ? data.profile : {};
                const totals = data && data.totals ? data.totals : {};
                const solved = data && data.solved ? data.solved : {};
                const stats = data && data.stats ? data.stats : {};

                const easySolved = (
                    solved.easy != null ? solved.easy :
                    stats.easySolved != null ? stats.easySolved :
                    data.easySolved != null ? data.easySolved :
                    '--'
                );
                const mediumSolved = (
                    solved.medium != null ? solved.medium :
                    stats.mediumSolved != null ? stats.mediumSolved :
                    data.mediumSolved != null ? data.mediumSolved :
                    '--'
                );
                const hardSolved = (
                    solved.hard != null ? solved.hard :
                    stats.hardSolved != null ? stats.hardSolved :
                    data.hardSolved != null ? data.hardSolved :
                    '--'
                );
                const totalSolved = (
                    solved.total != null ? solved.total :
                    stats.totalSolved != null ? stats.totalSolved :
                    data.totalSolved != null ? data.totalSolved :
                    (asNumber(easySolved) + asNumber(mediumSolved) + asNumber(hardSolved))
                );
                const easyTotal = asNumber(
                    totals.easy != null ? totals.easy :
                    stats.totalEasy != null ? stats.totalEasy :
                    data.totalEasy
                );
                const mediumTotal = asNumber(
                    totals.medium != null ? totals.medium :
                    stats.totalMedium != null ? stats.totalMedium :
                    data.totalMedium
                );
                const hardTotal = asNumber(
                    totals.hard != null ? totals.hard :
                    stats.totalHard != null ? stats.totalHard :
                    data.totalHard
                );
                const rawAcceptance = (
                    profile.acceptanceRate != null ? profile.acceptanceRate :
                    stats.acceptanceRate != null ? stats.acceptanceRate :
                    data.acceptanceRate
                );
                const acceptanceRate = (rawAcceptance != null && rawAcceptance !== '')
                    ? `${rawAcceptance}%`
                    : '--';
                const ranking = (
                    profile.ranking != null ? profile.ranking :
                    stats.ranking != null ? stats.ranking :
                    data.ranking
                );

                const easySolvedNum = asNumber(easySolved);
                const mediumSolvedNum = asNumber(mediumSolved);
                const hardSolvedNum = asNumber(hardSolved);

                const easyPct = easyTotal > 0 ? (easySolvedNum / easyTotal) * 100 : 0;
                const mediumPct = mediumTotal > 0 ? (mediumSolvedNum / mediumTotal) * 100 : 0;
                const hardPct = hardTotal > 0 ? (hardSolvedNum / hardTotal) * 100 : 0;

                updateText('lc-total', formatNumber(totalSolved));
                updateText('lc-acceptance', acceptanceRate);
                updateText('lc-ranking', formatNumber(ranking));
                updateText('lc-easy-label', `${formatNumber(easySolvedNum)}${easyTotal > 0 ? ` / ${formatNumber(easyTotal)}` : ''}`);
                updateText('lc-medium-label', `${formatNumber(mediumSolvedNum)}${mediumTotal > 0 ? ` / ${formatNumber(mediumTotal)}` : ''}`);
                updateText('lc-hard-label', `${formatNumber(hardSolvedNum)}${hardTotal > 0 ? ` / ${formatNumber(hardTotal)}` : ''}`);
                updateText('lc-easy-pct', `${Math.round(easyPct)}%`);
                updateText('lc-medium-pct', `${Math.round(mediumPct)}%`);
                updateText('lc-hard-pct', `${Math.round(hardPct)}%`);
                updateWidth('lc-easy-bar', easyPct);
                updateWidth('lc-medium-bar', mediumPct);
                updateWidth('lc-hard-bar', hardPct);
                updateText('leetcode-status', `Live data for @${leetcodeUser}`);
                updateText('lc-updated', `Updated: ${nowLabel()}`);
            } catch (error) {
                updateText('lc-total', '--');
                updateText('lc-acceptance', '--');
                updateText('lc-ranking', '--');
                updateText('lc-easy-label', '--');
                updateText('lc-medium-label', '--');
                updateText('lc-hard-label', '--');
                updateText('lc-easy-pct', '--%');
                updateText('lc-medium-pct', '--%');
                updateText('lc-hard-pct', '--%');
                updateWidth('lc-easy-bar', 0);
                updateWidth('lc-medium-bar', 0);
                updateWidth('lc-hard-bar', 0);
                updateText('leetcode-status', 'Live data unavailable right now.');
                updateText('lc-updated', 'Updated: --');
            }
        };

        const initVisitorTracking = () => {
            const statusEl = document.getElementById('visitor-status');
            const mapContainer = document.getElementById('visitor-map-container');
            const noteEl = document.getElementById('visitor-note');
            const clustrToken = (trackingSection.getAttribute('data-clustrmaps-token') || '').trim();

            if (!mapContainer || !statusEl) return;

            if (!clustrToken) {
                statusEl.textContent = 'Visitor map is not configured yet.';
                if (noteEl) {
                    noteEl.innerHTML = 'Add your ClustrMaps token to <code>data-clustrmaps-token</code> in <code>tracking.html</code>.';
                }
                return;
            }

            try {
                mapContainer.innerHTML = '';
                const script = document.createElement('script');
                script.id = 'clustrmaps';
                script.async = true;
                script.src = `https://cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=900&t=tt&d=${encodeURIComponent(clustrToken)}&co=0b1220&ct=ffffff&cmo=3acc3a&cmn=ff5353`;

                script.onload = () => {
                    statusEl.textContent = 'Live global visitor map loaded.';
                    if (noteEl) noteEl.textContent = 'Map and visit counts are provided by ClustrMaps.';
                };
                script.onerror = () => {
                    statusEl.textContent = 'Could not load visitor map right now.';
                    if (noteEl) noteEl.textContent = 'Check your token or network settings.';
                };

                mapContainer.appendChild(script);
            } catch (error) {
                statusEl.textContent = 'Could not initialize visitor map.';
                if (noteEl) noteEl.textContent = 'Please verify the widget configuration.';
            }
        };

        initGitHubTracking();
        const leetCardImage = document.getElementById('leetcode-card-image');
        if (!leetCardImage) {
            initLeetCodeTracking();
        }
        initVisitorTracking();
    }

});
