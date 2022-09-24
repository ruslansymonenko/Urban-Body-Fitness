export function slider () {
    const previousSlideBtn = document.querySelector('.previous_slide');
    const nextSlideBtn = document.querySelector('.next_slide');
    const slides = document.querySelectorAll('.slide');
    const currentSlide = document.querySelector('.current_slide');

    let sliderIndex = 0;

    function activeSlide (index) {
        slides.forEach(slide => {
            slide.classList.remove('active_slide');
        })
        slides[index].classList.add('active_slide');
    }

    const nextSlide = () => {
        if (sliderIndex == slides.length - 1) {
            sliderIndex = 0;
            currentSlide.textContent = sliderIndex + 1;
            activeSlide(sliderIndex);
        } else {
            sliderIndex++;
            currentSlide.textContent = sliderIndex + 1;
            activeSlide(sliderIndex);
        }
    }

    const prevSlide = () => {
        if (sliderIndex == 0) {
            sliderIndex = slides.length - 1;
            currentSlide.textContent = sliderIndex + 1;
            activeSlide(sliderIndex);
        } else {
            sliderIndex--;
            currentSlide.textContent = sliderIndex + 1;
            activeSlide(sliderIndex);
        }
    }

    nextSlideBtn.addEventListener('click', () => {
        nextSlide();
    });
    previousSlideBtn.addEventListener('click', () => {
        prevSlide()
    })
}