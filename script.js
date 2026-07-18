class ImageSlider {
    constructor() {
        // Массив изображений (замените на свои URL)
        this.images = [
            'https://twizz.ru/wp-content/uploads/-000//1/short-neck13.jpg',
            'https://twizz.ru/wp-content/uploads/-000//1/short-neck15.jpg',
            'https://twizz.ru/wp-content/uploads/-000//1/short-neck1.jpg',
            'https://twizz.ru/wp-content/uploads/-000//1/short-neck3.jpg',
            'https://twizz.ru/wp-content/uploads/-000//1/short-neck12.jpg'
        ];
        
        this.currentIndex = 0;
        this.totalImages = this.images.length;
        
        // Получаем DOM элементы
        this.sliderImage = document.getElementById('sliderImage');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.imageCounter = document.getElementById('imageCounter');
        this.sliderDots = document.getElementById('sliderDots');
        
        // Инициализация
        this.init();
    }
    
    init() {
        // Создаем точки навигации
        this.createDots();
        
        // Добавляем слушатели событий
        this.prevBtn.addEventListener('click', () => this.prevImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());
        
        // Добавляем поддержку клавиатуры
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevImage();
            } else if (e.key === 'ArrowRight') {
                this.nextImage();
            }
        });
        
        // Показываем первое изображение
        this.updateImage();
    }
    
    createDots() {
        for (let i = 0; i < this.totalImages; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.goToImage(i));
            this.sliderDots.appendChild(dot);
        }
        this.updateDots();
    }
    
    updateImage() {
        // Обновляем изображение с плавной анимацией
        this.sliderImage.style.opacity = '0';
        
        setTimeout(() => {
            this.sliderImage.src = this.images[this.currentIndex];
            this.sliderImage.style.opacity = '1';
        }, 150);
        
        // Обновляем счетчик
        this.imageCounter.textContent = `Изображение ${this.currentIndex + 1} из ${this.totalImages}`;
        
        // Обновляем точки
        this.updateDots();
    }
    
    updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    nextImage() {
        // Зацикливание слайдера
        this.currentIndex = (this.currentIndex + 1) % this.totalImages;
        this.updateImage();
    }
    
    prevImage() {
        // Зацикливание слайдера
        this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.updateImage();
    }
    
    goToImage(index) {
        this.currentIndex = index;
        this.updateImage();
    }
}

// Инициализация слайдера при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
});
