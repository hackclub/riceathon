function setupCarousel() {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".carousel img");
  const totalSlides = slides.length;

  function moveSlide(direction) {
    currentSlide += direction;

    if (currentSlide < 0) {
      currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }

    updateCarouselPosition();
  }

  function updateCarouselPosition() {
    const carousel = document.querySelector(".carousel");
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
  }
  return { moveSlide };
}
