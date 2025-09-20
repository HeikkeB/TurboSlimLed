// Initialize AOS animations
        document.addEventListener('DOMContentLoaded', function() {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
            
            // Initialize slider functionality
            //initSlider();
            
            // Initialize ray animations on scroll
            initRays();
            
            // Initialize countdown timer
            initCountdown();
            
            // Initialize modal functionality
            initModal();
        });
        
         // Testimonials Carousel functionality
        function initTestimonialsCarousel() {
            const carousel = document.querySelector('.testimonials-carousel');
            const cards = document.querySelectorAll('.testimonial-card');
            const dots = document.querySelectorAll('.dot');
            let currentIndex = 0;
            let autoScrollInterval;
            
            // Функция для обновления видимых карточек
            function updateCarousel() {
                // Снимаем активный класс со всех карточек
                cards.forEach(card => card.classList.remove('active'));
                
                // Устанавливаем активный класс для текущей группы из 3 карточек
                for (let i = 0; i < 3; i++) {
                    const index = (currentIndex + i) % cards.length;
                    cards[index].classList.add('active');
                }
                
                // Обновляем точки навигации
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === Math.floor(currentIndex / 1));
                });
                
                // Плавное перемещение карусели
                const translateValue = -currentIndex * (100 / 3) + '%';
                carousel.style.transform = `translateX(${translateValue})`;
            }
            
            // Функция для автоматической прокрутки
            function startAutoScroll() {
                autoScrollInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % (cards.length - 2);
                    updateCarousel();
                }, 8000); // 8 секунд
            }
            
            // Останавливаем автоматическую прокрутку при наведении мыши
            carousel.addEventListener('mouseenter', () => {
                clearInterval(autoScrollInterval);
            });
            
            // Возобновляем автоматическую прокрутку, когда мышь убирают
            carousel.addEventListener('mouseleave', () => {
                startAutoScroll();
            });
            
            // Обработчики для точек навигации
            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    currentIndex = i * 1;
                    updateCarousel();
                });
            });
            
            // Запускаем автоматическую прокрутку
            startAutoScroll();
            
            // Инициализируем начальное состояние
            updateCarousel();
        }
        
        // Инициализация карусели при загрузке страницы            
           // Ожидаем полной загрузки DOM
        document.addEventListener('DOMContentLoaded', function() {
            initTestimonialsCarousel();
            // Получаем элементы только после загрузки DOM
            const slider = document.getElementById('comparison-slider');
            const afterContainer = document.querySelector('.after-container');
            const labelBefore = document.querySelector('.label-before');
            const labelAfter = document.querySelector('.label-after');
            const sliderArrow = document.querySelector('.slider-arrow');
            
            // Проверяем, что все элементы существуют
            if (!slider || !afterContainer || !labelBefore || !labelAfter || !sliderArrow) {
                console.error('One or more elements not found');
                return;
            }
            
            // Добавляем обработчик события
            slider.addEventListener('input', function() {
                const sliderValue = this.value;
                // Управляем шириной контейнера "После"
                afterContainer.style.width = sliderValue + '%';

                // Управляем видимостью надписей
                if (sliderValue > 95) {
                    labelBefore.style.opacity = 0;
                    labelAfter.style.opacity = 1;
                    sliderArrow.style.opacity = 0; // Прячем стрелку в конце
                } else if (sliderValue < 5) {
                    labelBefore.style.opacity = 1;
                    labelAfter.style.opacity = 0;
                    sliderArrow.style.opacity = 1; // Показываем стрелку в начале
                } else {
                    // Плавное исчезновение/появление при промежуточных значениях
                    labelBefore.style.opacity = 1 - (sliderValue / 100);
                    labelAfter.style.opacity = (sliderValue / 100) - 0.5;
                }
            });
        });
        /*function initSlider() {
            const slider = document.querySelector('.slider-container');
            const before = document.querySelector('.slider-before');
            const handle = document.querySelector('.slider-handle');
            
            let isMoving = false;
            
            const moveSlider = (x) => {
                if (!isMoving) return;
                
                const containerRect = slider.getBoundingClientRect();
                let position = (x - containerRect.left) / containerRect.width;
                position = Math.max(0, Math.min(1, position));
                
                before.style.width = position * 100 + '%';
                handle.style.left = position * 100 + '%';
            };
            
            handle.addEventListener('mousedown', () => isMoving = true);
            handle.addEventListener('touchstart', () => isMoving = true);
            
            document.addEventListener('mouseup', () => isMoving = false);
            document.addEventListener('touchend', () => isMoving = false);
            
            document.addEventListener('mousemove', (e) => moveSlider(e.clientX));
            document.addEventListener('touchmove', (e) => moveSlider(e.touches[0].clientX));
        }
        */
        
        // Ray animations
       /* function initRays() {
            const rays = document.querySelectorAll('.ray');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.5 });
            
            rays.forEach(ray => {
                observer.observe(ray);
            });
        }
        */
       // Updated ray animations for horizontal layout
        function initRays() {
            const rayCards = document.querySelectorAll('.ray-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, entry.target.dataset.rayIndex * 200); // Задержка появления для каждой карточки
                    }
                });
            }, { threshold: 0.3 });
            
            rayCards.forEach(card => {
                observer.observe(card);
            });
        }
        // Countdown timer
        function initCountdown() {
            const countdownElement = document.getElementById('countdown');
            let timeLeft = 14 * 60 * 60 + 59 * 60 + 59; // 14 hours, 59 minutes, 59 seconds
            
            const timer = setInterval(() => {
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    countdownElement.textContent = "00:00:00";
                    return;
                }
                
                timeLeft--;
                
                const hours = Math.floor(timeLeft / 3600);
                const minutes = Math.floor((timeLeft % 3600) / 60);
                const seconds = timeLeft % 60;
                
                countdownElement.textContent = 
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }
        
        // Modal functionality
        function initModal() {
            const modal = document.getElementById('modal');
            const ctaButton1 = document.getElementById('cta-button1');
            const ctaButton2 = document.getElementById('cta-button2');
            const closeButton = document.getElementById('close-modal');
            const leadForm = document.getElementById('lead-form');
            
            // Open modal on CTA button click
            ctaButton1.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            });

            // Open modal on CTA button click
            ctaButton2.addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            });
            
            // Close modal on close button click
            closeButton.addEventListener('click', function() {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            });
            
            // Close modal when clicking outside the form
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = ''; // Re-enable scrolling
                }
            });
            
            // Handle form submission
            leadForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                
                // Basic validation
                if (name && phone) {
                    // In a real scenario, you would send this data to your server
                    console.log('Form submitted:', { name, phone });
                    
                    // Show success message (you could replace this with a more sophisticated notification)
                    alert('¡Gracias por tu pedido! Te contactaremos pronto.');
                    
                    // Close the modal
                    modal.classList.remove('active');
                    document.body.style.overflow = ''; // Re-enable scrolling
                    
                    // Reset the form
                    leadForm.reset();
                }
            });
        }