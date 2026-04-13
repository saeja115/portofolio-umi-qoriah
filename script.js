// Script for smooth scrolling

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling

document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Handle form data
    console.log('Form submitted');
});

// Parallax effect

window.addEventListener('scroll', function () {
    let scrollPosition = window.pageYOffset;
    document.querySelector('.parallax').style.backgroundPositionY = -(scrollPosition * 0.5) + 'px';
});

// Scroll animations using Intersection Observer

const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0,
    rootMargin: '0 0 -100px 0'
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('fade-in-active');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
