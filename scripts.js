// scripts.js

/* ================================
   Preloader
================================ */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
});

/* ================================
   Responsive Navigation
================================ */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

/* ================================
   Back to Top Button
================================ */
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
        gsap.to('#back-to-top', { opacity: 1, duration: 0.5 });
    } else {
        gsap.to('#back-to-top', { opacity: 0, duration: 0.5, onComplete: () => {
            backToTopBtn.style.display = 'none';
        }});
    }
});

backToTopBtn.addEventListener('click', () => {
    gsap.to(window, { duration: 1, scrollTo: '#hero' });
});

/* ================================
   Initialize Particles.js
================================ */
// Enhanced Particles.js with 3D depth
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#ffffff" },
        "shape": {
            "type": ["circle", "triangle"],
            "stroke": { "width": 0, "color": "#000000" },
        },
        "opacity": { "value": 0.6, "random": false },
        "size": { "value": 4, "random": true },
        "line_linked": {
            "enable": true,
            "distance": 200,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 3,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": { "enable": true, "rotateX": 600, "rotateY": 1200 }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "repulse" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
        },
        "modes": {
            "repulse": { "distance": 150, "duration": 0.4 },
            "push": { "particles_nb": 5 }
        }
    },
    "retina_detect": true
});

/* ================================
   Smooth Scrolling with GSAP
================================ */
gsap.registerPlugin(ScrollToPlugin);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        gsap.to(window, { duration: 1, scrollTo: target });
    });
});

/* ================================
   Initialize Swiper.js for Projects Slider
================================ */
const swiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 800,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 1,
        },
        1024: {
            slidesPerView: 1.5,
        },
    }
});

/* ================================
   Initialize Lottie Animation
================================ */
const lottieAbout = lottie.loadAnimation({
    container: document.getElementById('lottie-about'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/animations/your-animation.json' // Replace with your Lottie JSON path
});

/* ================================
   Initialize Three.js 3D Model and Shapes
================================ */
let scene, camera, renderer3D, model;
let shapes = [];

function initThreeJS() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.5 / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer3D = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer3D.setSize(window.innerWidth * 0.5, window.innerHeight);
    document.getElementById('3d-model').appendChild(renderer3D.domElement);

    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Load 3D Model
    const loader = new THREE.GLTFLoader();
    loader.load('assets/models/your-model.glb', function(gltf) {
        model = gltf.scene;
        model.scale.set(2, 2, 2);
        scene.add(model);
    }, undefined, function(error) {
        console.error(error);
    });

    // Add 3D Shapes in Footer
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: false });
    for (let i = 0; i < 5; i++) {
        const torus = new THREE.Mesh(geometry, material);
        torus.position.set(Math.random() * 10 - 5, Math.random() * 5 - 2.5, Math.random() * 10 - 5);
        torus.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        scene.add(torus);
        shapes.push(torus);
    }

    // Handle Window Resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = (window.innerWidth * 0.5) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer3D.setSize(window.innerWidth * 0.5, window.innerHeight);
}

// Animation Loop
function animateThreeJS() {
    requestAnimationFrame(animateThreeJS);

    if (model) {
        model.rotation.y += 0.005;
        model.rotation.x += 0.002;
    }

    // Rotate additional shapes
    shapes.forEach(shape => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
    });

    renderer3D.render(scene, camera);
}

initThreeJS();
animateThreeJS();

/* ================================
   GSAP Animations for Hero Section
================================ */
gsap.from("#hero-content h1", { duration: 1, y: -50, opacity: 0, ease: "bounce.out" });
gsap.from("#hero-content p", { duration: 1, y: 50, opacity: 0, delay: 0.5 });
gsap.from(".btn", { duration: 1, scale: 0, opacity: 0, delay: 1, ease: "back.out(1.7)" });

/* ================================
   ScrollMagic for Scroll-Based Animations
================================ */
const controller = new ScrollMagic.Controller();

// Fade In Sections
document.querySelectorAll('section').forEach(section => {
    const tween = gsap.from(section, { duration: 1, opacity: 0, y: 50, ease: "power1.out" });
    new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(tween)
    .addTo(controller);
});

// Animate Progress Bars on Scroll
const progressBars = document.querySelectorAll('.progress-bar span');

progressBars.forEach(bar => {
    new ScrollMagic.Scene({
        triggerElement: bar,
        triggerHook: 0.9,
        reverse: false
    })
    .setTween(gsap.to(bar, { width: bar.style.width, duration: 1.5, ease: "power1.out" }))
    .addTo(controller);
});

/* ================================
   Initialize Testimonial Slider (Swiper.js)
================================ */
const testimonialSwiper = new Swiper('.testimonial-slider', {
    loop: true,
    speed: 800,
    autoplay: {
        delay: 8000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

/* ================================
   Modal Functionality for Projects with 3D Animation
================================ */
const modal = document.getElementById('project-modal');
const closeButton = document.querySelector('.close-button');
const viewProjectButtons = document.querySelectorAll('.view-project');

viewProjectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        gsap.from('.modal-content', { duration: 0.5, scale: 0.5, opacity: 0, ease: "back.out(1.7)" });
    });
});

closeButton.addEventListener('click', () => {
    gsap.to('.modal-content', { duration: 0.3, scale: 0.5, opacity: 0, ease: "back.in(1.7)", onComplete: () => {
        modal.style.display = 'none';
    }});
});

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        gsap.to('.modal-content', { duration: 0.3, scale: 0.5, opacity: 0, ease: "back.in(1.7)", onComplete: () => {
            modal.style.display = 'none';
        }});
    }
});

/* ================================
   Initialize ScrollReveal for Additional Animations
================================ */
// Optional: If you want to use ScrollReveal for more animations
/*
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    reset: false
});

sr.reveal('#about, #skills, #projects, #testimonials, #contact, #blog', {
    interval: 200
});
*/

/* ================================
   Form Submission Handling
================================ */
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation can be added here

    // Implement form submission logic (e.g., using AJAX or Formspree)
    // For demonstration, we'll use a simple alert
    alert('Thank you for your message! I will get back to you soon.');

    contactForm.reset();
});

/* ================================
   Microinteractions: Button Pulsing on Hover
================================ */
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.05, duration: 0.3 });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3 });
    });
});

/* ================================
   Dark Mode Toggle
================================ */
const darkModeToggle = document.getElementById('dark-mode-toggle');
const root = document.documentElement;

darkModeToggle.addEventListener('click', () => {
    root.classList.toggle('dark-mode');
    // Save preference to localStorage
    if (root.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Load theme preference on page load
window.addEventListener('load', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        root.classList.add('dark-mode');
    }
});

/* ================================
   Additional Three.js Enhancements
================================ */
// Example: OrbitControls for interactive 3D model rotation
// Note: Ensure OrbitControls is included via script tag or module
/*
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const controls = new OrbitControls(camera, renderer3D.domElement);
controls.enableDamping = true;

function animateThreeJS() {
    requestAnimationFrame(animateThreeJS);

    if (model) {
        model.rotation.y += 0.005;
    }

    shapes.forEach(shape => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
    });

    controls.update();
    renderer3D.render(scene, camera);
}
*/

/* ================================
   Performance Optimizations
================================ */
// Lazy Loading Images
const lazyImages = document.querySelectorAll('img.lazy');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
}, { rootMargin: '0px 0px 50px 0px' });

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

/* ================================
   Accessibility Enhancements
================================ */
// Ensure keyboard accessibility for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        gsap.to('.modal-content', { duration: 0.3, scale: 0.5, opacity: 0, ease: "back.in(1.7)", onComplete: () => {
            modal.style.display = 'none';
        }});
    }
});
