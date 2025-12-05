// ---------- Carousel logic (kept from your original) ----------
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

// Arrange the slides next to one another
let slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

// Move to target slide
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

// Update dots
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

// Click Left (Previous)
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;

  // Loop to end if at start
  if (!prevSlide) {
    const lastSlide = slides[slides.length - 1];
    const lastDot = dots[dots.length - 1];
    moveToSlide(track, currentSlide, lastSlide);
    updateDots(currentDot, lastDot);
  } else {
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
  }
});

// Click Right (Next)
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;

  // Loop to start if at end
  if (!nextSlide) {
    const firstSlide = slides[0];
    const firstDot = dots[0];
    moveToSlide(track, currentSlide, firstSlide);
    updateDots(currentDot, firstDot);
  } else {
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
  }
});

// Click Dots
dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');
  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');

  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
});

// Recalculate slide positions on resize (important when layout changes)
window.addEventListener('resize', () => {
  slideWidth = slides[0].getBoundingClientRect().width;
  slides.forEach(setSlidePosition);

  // ensure transform still points to active slide
  const currentSlide = track.querySelector('.current-slide');
  if (currentSlide) {
    track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
  }
});

// ---------- Smooth scrolling that accounts for fixed navbar ----------
(function enableNavAnchorsWithOffset() {
  // Select all internal nav links
  const navbar = document.getElementById('Fixed-Navbar');
  const navLinks = document.querySelectorAll('a.nav-link');

  // Get computed navbar height (including borders)
  const getNavHeight = () => {
    const rect = navbar.getBoundingClientRect();
    // use offsetHeight for total height
    return navbar.offsetHeight || rect.height || 0;
  };

  // Smooth scroll to element with offset so fixed navbar doesn't cover content
  function scrollToElementWithOffset(targetEl) {
    const navHeight = getNavHeight();
    // get the element top relative to document
    const elTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
    const targetY = Math.max(0, elTop - navHeight - 12); // 12px extra gap
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }

  navLinks.forEach(link => {
    // only handle internal links (href starts with #)
    const href = link.getAttribute('href') || '';
    if (!href.startsWith('#')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = href.slice(1);
      const targetEl = document.getElementById(id);
      if (!targetEl) return;

      scrollToElementWithOffset(targetEl);

      // update the URL hash without jumping
      history.replaceState(null, '', '#' + id);
    });
  });

  // If the page loads with a hash (direct link), scroll to it with offset
  window.addEventListener('load', () => {
    const hash = location.hash;
    if (hash) {
      const id = hash.slice(1);
      const targetEl = document.getElementById(id);
      if (targetEl) {
        // little timeout to allow layout/css to settle
        setTimeout(() => scrollToElementWithOffset(targetEl), 40);
      }
    }
  });
})();

