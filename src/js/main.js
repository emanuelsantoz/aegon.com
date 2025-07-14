// const video = document.querySelector('.video-container video');

// window.addEventListener('scroll', () => {
//   const section = document.querySelector('.hero-section');
//   const rect = section.getBoundingClientRect();
//   const windowHeight = window.innerHeight;

//   const visible = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
//   const scale = 1 + visible * 1;  // Aumenta até 20%

//   video.style.transform = `scale(${scale})`;
// });





// const videoContainer = document.querySelector('.video-container');
// const heroSection = document.querySelector('.hero-section');
// const overlay = document.querySelector('.overlay');

// let locked = false;
// let isExpanded = false;

// function animateVideo(grow = true) {
//   document.body.style.overflow = 'hidden';
//   locked = true;

//   let size = grow ? 500 : 800;
//   const targetSize = grow ? 800 : 500;
//   const speed = 3; // Quanto maior, mais rápido

//   overlay.style.opacity = grow ? '1' : '1';

//   const animate = () => {
//     size += grow ? speed : -speed;

//     if ((grow && size >= targetSize) || (!grow && size <= targetSize)) {
//       size = targetSize;
//       videoContainer.style.width = `${size}px`;
//       videoContainer.style.height = `${size}px`;

//       overlay.style.opacity = grow ? '1' : '0';

//       document.body.style.overflow = 'auto';
//       locked = false;
//       isExpanded = grow;
//       return;
//     }

//     videoContainer.style.width = `${size}px`;
//     videoContainer.style.height = `${size}px`;

//     requestAnimationFrame(animate);
//   };

//   requestAnimationFrame(animate);
// }

// window.addEventListener('scroll', () => {
//   const rect = heroSection.getBoundingClientRect();

//   // Descer: cresce
//   if (!locked && !isExpanded && rect.top <= 0 && rect.bottom >= window.innerHeight) {
//     animateVideo(true);
//   }

//   // Subir: volta a diminuir
//   if (!locked && isExpanded && rect.top >= 0) {
//     animateVideo(false);
//   }
// });


// site funcionamento
// Smooth scrolling for navigation links
      // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Fade in animation on scroll
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

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // What We Do section animation
        const whatWeDoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.service-card-item');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateX(0)';
                        }, index * 150);
                    });
                }
            });
        }, {
            threshold: 0.2
        });

        const whatWeDoSection = document.querySelector('.service-cards-container');
        if (whatWeDoSection) {
            // Initially hide cards for animation
            whatWeDoSection.querySelectorAll('.service-card-item').forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = `translateX(${(index % 2 === 0 ? '-' : '')}50px)`;
                card.style.transition = 'all 0.8s ease';
            });
            whatWeDoObserver.observe(whatWeDoSection);
        }

        // Carousel animation on scroll
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.carousel-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            });
        }, {
            threshold: 0.2
        });

        const carousel = document.querySelector('.image-carousel');
        if (carousel) {
            // Initially hide items for animation
            carousel.querySelectorAll('.carousel-item').forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = 'all 0.6s ease';
            });
            carouselObserver.observe(carousel);
        }

        // Timeline animation for about section
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timeline = entry.target;
                    const cards = timeline.querySelectorAll('.about-card');
                    const timelineProgress = timeline.querySelector('.timeline-progress');
                    
                    // Animate timeline progress
                    setTimeout(() => {
                        timelineProgress.style.height = '100%';
                    }, 500);
                    
                    // Animate cards one by one
                    cards.forEach((card, index) => {
                        const dot = card.querySelector('.timeline-dot');
                        setTimeout(() => {
                            card.classList.add('visible');
                            dot.classList.add('active');
                        }, 800 + (index * 600)); // 600ms delay between each card
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-50px 0px'
        });

        // Observe the timeline container
        const timelineContainer = document.querySelector('.about-timeline');
        if (timelineContainer) {
            timelineObserver.observe(timelineContainer);
        }

        // Progressive timeline animation on scroll
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const index = parseInt(card.dataset.index);
                    const timelineProgress = document.querySelector('.timeline-progress');
                    
                    // Update progress bar height based on card position
                    const progressHeight = ((index + 1) / 3) * 100;
                    timelineProgress.style.height = progressHeight + '%';
                    
                    // Activate current card
                    card.classList.add('visible');
                    const dot = card.querySelector('.timeline-dot');
                    dot.classList.add('active');
                }
            });
        }, {
            threshold: 0.5
        });

        // Observe each timeline card individually for progressive reveal
        document.querySelectorAll('.about-card').forEach(card => {
            progressObserver.observe(card);
        });

        // Portfolio filter functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Contact form handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Mobile menu toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.98)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            }
        });

        // Newsletter subscription
        document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            const btn = this.querySelector('.newsletter-btn');
            const originalContent = btn.innerHTML;
            
            if (email) {
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                btn.disabled = true;
                
                setTimeout(() => {
                    alert('✅ Obrigado por se inscrever em nossa newsletter!\n\nVocê receberá conteúdos exclusivos sobre marketing digital e inovação.');
                    this.querySelector('.newsletter-input').value = '';
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                }, 1500);
            }
        });

        // CTA Button click handler
        document.querySelector('.footer-cta-btn').addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to contact section
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Optional: Show modal or trigger contact form
            setTimeout(() => {
                alert('📞 Vamos conversar sobre seu projeto!\n\nPreencha o formulário abaixo ou entre em contato diretamente via WhatsApp: (11) 98888-8888');
            }, 1000);
        });

        // Add dynamic background animation to hero
        function createFloatingElements() {
            const hero = document.querySelector('.hero');
            for (let i = 0; i < 5; i++) {
                const element = document.createElement('div');
                element.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 100 + 50}px;
                    height: ${Math.random() * 100 + 50}px;
                    background: rgba(0, 87, 255, 0.1);
                    border-radius: 50%;
                    animation: float ${Math.random() * 20 + 10}s infinite linear;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;
                hero.appendChild(element);
            }
        }

        // Add CSS for floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        createFloatingElements();

        // Testimonials carousel functionality
        const testimonialsContainer = document.getElementById('testimonialsContainer');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicators = document.querySelectorAll('.indicator');
        let currentSlide = 0;
        const totalSlides = 5;
        const slideWidth = 370; // 350px card + 20px gap

        // Auto-scroll functionality
        let autoScrollInterval;

        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                nextSlide();
            }, 5000); // Change slide every 5 seconds
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        function updateSlide() {
            const scrollPosition = currentSlide * slideWidth;
            testimonialsContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            
            // Update navigation buttons
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }

        function nextSlide() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSlide();
            } else {
                currentSlide = 0;
                updateSlide();
            }
        }

        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlide();
            }
        }

        // Event listeners
        nextBtn.addEventListener('click', () => {
            stopAutoScroll();
            nextSlide();
            startAutoScroll();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoScroll();
            prevSlide();
            startAutoScroll();
        });

        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoScroll();
                currentSlide = index;
                updateSlide();
                startAutoScroll();
            });
        });

        // Pause auto-scroll on hover
        const testimonialsSection = document.querySelector('.testimonials-section');
        testimonialsSection.addEventListener('mouseenter', stopAutoScroll);
        testimonialsSection.addEventListener('mouseleave', startAutoScroll);

        // Video thumbnail clicks
        document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Simulate video modal (you can integrate with actual video player)
                const overlay = this.querySelector('.video-overlay');
                const testimonialText = overlay.textContent;
                alert(`🎥 Reproduzindo vídeo: ${testimonialText}\n\n(Aqui seria integrado um player de vídeo real)`);
            });
        });

        // Touch/swipe support for mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        testimonialsContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoScroll();
        });

        testimonialsContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        testimonialsContainer.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            startAutoScroll();
        });

        // Initialize carousel
        updateSlide();
        startAutoScroll();

        // Mid-page CTA functionality
        document.querySelector('.mid-cta-primary').addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to contact section with smooth animation
            document.getElementById('contact').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Optional: Highlight the contact form
            setTimeout(() => {
                const contactForm = document.getElementById('contactForm');
                contactForm.style.boxShadow = '0 0 30px rgba(0, 87, 255, 0.3)';
                contactForm.style.transform = 'scale(1.02)';
                contactForm.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    contactForm.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
                    contactForm.style.transform = 'scale(1)';
                }, 2000);
            }, 800);
        });

        document.querySelector('.mid-cta-secondary').addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to portfolio section
            document.getElementById('portfolio').scrollIntoView({
                behavior: 'smooth'
            });
        });

        // Mid-CTA section animation observer
        const midCtaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reset animations by removing and re-adding the section
                    const section = entry.target;
                    section.style.animation = 'none';
                    section.offsetHeight; // Trigger reflow
                    section.style.animation = null;
                }
            });
        }, {
            threshold: 0.3
        });

        const midCtaSection = document.querySelector('.mid-cta-section');
        if (midCtaSection) {
            midCtaObserver.observe(midCtaSection);
        }