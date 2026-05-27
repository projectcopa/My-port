/* =====================================
   Clean Portfolio JavaScript
   Features:
   - Loader
   - Typing animation
   - Sticky navbar
   - Mobile menu
   - Scroll progress
   - Scroll reveal
   - Skill progress animation
   - Project filtering
   - Contact form success
   - Light/Dark mode
   - Tilt card
   - Download CV text file
===================================== */

const loader = document.getElementById("loader");
const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const scrollProgress = document.getElementById("scrollProgress");
const scrollTopBtn = document.getElementById("scrollTop");
const typingText = document.getElementById("typingText");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const tiltCard = document.getElementById("tiltCard");
const downloadCV = document.getElementById("downloadCV");

/* Loader */
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 700);
});

/* Sticky header, scroll progress, scroll top */
function updateScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;
  header.classList.toggle("scrolled", scrollTop > 24);
  scrollTopBtn.classList.toggle("show", scrollTop > 520);
}

window.addEventListener("scroll", updateScrollUI);
updateScrollUI();

/* Mobile menu */
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  menuBtn.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuBtn.classList.remove("active");
  });
});

/* Typing animation */
const typingWords = [
  "Frontend Developer",
  "Creative Web Designer",
  "JavaScript Developer",
  "Responsive UI Builder"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = typingWords[wordIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingText.textContent = currentWord.slice(0, charIndex);

  let typingSpeed = isDeleting ? 55 : 95;

  if (!isDeleting && charIndex === currentWord.length) {
    typingSpeed = 1200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    typingSpeed = 250;
  }

  setTimeout(typeEffect, typingSpeed);
}

typeEffect();

/* Theme toggle */
const savedTheme = localStorage.getItem("clean-portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.textContent = isLight ? "🌙" : "☀";
  localStorage.setItem("clean-portfolio-theme", isLight ? "light" : "dark");
});

/* Scroll reveal */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");

      if (entry.target.classList.contains("skill-card")) {
        const progress = entry.target.dataset.progress;
        const progressBar = entry.target.querySelector(".progress span");
        progressBar.style.width = `${progress}%`;
      }

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

/* Counter animation */
const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  const duration = 1200;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    counter.textContent = Math.floor(ease * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

/* Project filter */
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const category = card.dataset.category;

      if (selectedFilter === "all" || category === selectedFilter) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

/* Contact form */
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formMessage.textContent = "Message sent successfully!";
  contactForm.reset();

  setTimeout(() => {
    formMessage.textContent = "";
  }, 3500);
});

/* Tilt profile card */
tiltCard.addEventListener("mousemove", (event) => {
  const rect = tiltCard.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const rotateX = ((y / rect.height) - 0.5) * -10;
  const rotateY = ((x / rect.width) - 0.5) * 10;

  tiltCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
});

tiltCard.addEventListener("mouseleave", () => {
  tiltCard.style.transform = "";
});

/* Scroll top */
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* Download CV */
downloadCV.addEventListener("click", () => {
  const cvText = `
Clean Portfolio - Frontend Developer CV

Name: Your Name
Role: Frontend Developer / Web Developer

Skills:
- HTML5
- CSS3
- JavaScript
- React.js
- Tailwind CSS
- Bootstrap
- GitHub
- Responsive Design
- UI/UX Design
- API Integration

Profile:
I build premium, responsive, animated, and user-friendly websites using clean frontend technologies and modern UI design systems.

Projects:
1. AI Resume Builder
2. Smart Service Dashboard
3. Image Resizer Tool
4. Tourism Information Website
5. Dark Portfolio Concept

Contact:
Email: hello@example.com
Phone: +91 00000 00000
  `.trim();

  const blob = new Blob([cvText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "Clean-Portfolio-CV.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
});
