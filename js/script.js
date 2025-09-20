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
            
            // Initialize modal functionality
            initModal();
        });
        
           document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.querySelector('.testimonials-carousel');
            const cards = document.querySelectorAll('.testimonial-card');
            const container = document.querySelector('.carousel-container');
            
            let currentPosition = 0;
            let cardWidth = cards[0].offsetWidth + 30; // width + margin
            let autoScrollInterval;
            
            // Функция для расчета количества видимых карточек
            function calculateVisibleCards() {
                const containerWidth = container.offsetWidth;
                return Math.floor(containerWidth / cardWidth);
            }
            
            // Функция для центрирования карусели
            function centerCarousel() {
                const containerWidth = container.offsetWidth;
                const visibleCards = calculateVisibleCards();
                const contentWidth = cards.length * cardWidth;
                
                if (contentWidth < containerWidth) {
                    // Если все карточки помещаются в контейнер
                    currentPosition = 0;
                    carousel.style.transform = `translateX(0)`;
                    carousel.style.justifyContent = 'center';
                } else {
                    // Если карточек больше, чем помещается
                    carousel.style.justifyContent = 'flex-start';
                    updateCarousel();
                }
            }
            
            // Функция для обновления позиции карусели
            function updateCarousel() {
                const maxPosition = (cards.length - calculateVisibleCards()) * cardWidth;
                
                // Ограничиваем позицию в допустимых пределах
                if (currentPosition > maxPosition) {
                    currentPosition = maxPosition;
                } else if (currentPosition < 0) {
                    currentPosition = 0;
                }
                
                carousel.style.transform = `translateX(-${currentPosition }px)`;
            }
            
            // Функция для автоматической прокрутки
            function startAutoScroll() {
                clearInterval(autoScrollInterval);
                
                autoScrollInterval = setInterval(() => {
                    const visibleCards = calculateVisibleCards();
                    const maxPosition = (cards.length - visibleCards) * cardWidth;
                    
                    if (currentPosition >= maxPosition) {
                        // Если достигли конца, возвращаемся к началу
                        currentPosition = 0;
                    } else {
                        // Прокручиваем на одну карточку
                        currentPosition += cardWidth;
                    }
                    
                    updateCarousel();
                }, 5000); // 5 секунд
            }
            
            // Обработчик изменения размера окна
            function handleResize() {
                cardWidth = cards[0].offsetWidth + 30; // Обновляем ширину карточки
                centerCarousel();
                startAutoScroll(); // Перезапускаем автоскролл
            }
            
            // Инициализация
            centerCarousel();
            startAutoScroll();
            
            // Слушатель изменения размера окна
            window.addEventListener('resize', handleResize);
        });
        
        // Инициализация карусели при загрузке страницы            
           // Ожидаем полной загрузки DOM
        document.addEventListener('DOMContentLoaded', function() {
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