let currentSlide = 0;
const moviesPerSlide = 3; // Show 3 movies at a time
const movieCards = document.querySelectorAll('.movie-card');
const sliderWrapper = document.querySelector('.slider-wrapper');
const totalMovies = movieCards.length;
const totalSlides = Math.ceil(totalMovies / moviesPerSlide);

// Function to update the slider position
function updateSliderPosition() {
    sliderWrapper.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
}

// Move to the previous slide
function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSliderPosition();
    }
}

// Move to the next slide
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSliderPosition();
    }
}

