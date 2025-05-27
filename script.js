document.addEventListener('DOMContentLoaded', () => {
    // ===============================
    // Mobile Menu Toggle
    // ===============================
    const nav = document.querySelector('nav');
    let menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        nav.appendChild(menuToggle);
    }
    const navLinks = document.querySelector('.links ul');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.links') && !event.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // ===============================
    // Smooth Scrolling for Anchor Links
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===============================
    // Navbar Scroll Effect
    // ===============================
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ===============================
    // Portfolio Filter Buttons
    // ===============================
    document.querySelectorAll('.portfolio button').forEach(btn => {
        btn.addEventListener('click', function () {
            const active = document.querySelector('.bt5-active');
            if (active) active.classList.remove('bt5-active');
            this.classList.add('bt5-active');
            // Add actual filtering logic here if needed
        });
    });

    // ===============================
    // Contact Button Handler
    // ===============================
   

    // ===============================
    // Timeline Entry Animation
    // ===============================
    const entryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.entry').forEach(el => entryObserver.observe(el));

    // ===============================
    // Scroll-triggered Animations (for .entry and .scroll-animate)
    // ===============================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.entry, .scroll-animate').forEach(el => scrollObserver.observe(el));

    // ===============================
    // Hire Section Observer (with child animation)
    // ===============================
    const hireObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
                entry.target.classList.add('visible');
                const completed = entry.target.querySelectorAll('.completed');
                completed.forEach((el, index) => {
                    setTimeout(() => el.classList.add('visible'), 250 * index);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px 0px'
    });
    document.querySelectorAll('.hire').forEach(el => hireObserver.observe(el));

    // ===============================
    // 1. Subscribe Form Submission
    // ===============================
    const subscribeForm = document.querySelector(".subscribe-form");
    subscribeForm?.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = subscribeForm.querySelector("input[type='email']").value;
        if (validateEmail(email)) {
            alert("Thank you for subscribing!");
            subscribeForm.reset();
        } else {
            alert("Please enter a valid email address.");
        }
    });

    // ===============================
    // 2. Project Idea Form Submission
    // ===============================
    const projectForm = document.querySelector(".project-form");
    projectForm?.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = projectForm.querySelector("input[type='email']").value;
        if (validateEmail(email)) {
            alert("We’ve received your project idea. We'll get back to you soon!");
            projectForm.reset();
        } else {
            alert("Please enter a valid email address.");
        }
    });

    // ===============================
    // Utility: Email Validator
    // ===============================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }
});

// Add to script.js
document.addEventListener('DOMContentLoaded', () => {
  const backToTopButton = document.getElementById('back-to-top');
  
  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  // Smooth scroll to top
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// Modal Handling
const modal = document.getElementById("contactModal");
const span = document.getElementsByClassName("close")[0];

// Open modal from any "Hire Me" button
document.querySelectorAll(' .bt1').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });
});

// Close modal
span.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
  if (event.target == modal) modal.style.display = "none";
}

// Close with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") modal.style.display = "none";
});

// Calendly Integration
const calendlyModal = document.getElementById('calendlyModal');
const closeCalendly = document.querySelector('.close-calendly');

// Open Calendly
document.getElementById('bookCallBtn').addEventListener('click', function(e) {
  e.preventDefault();
  calendlyModal.style.display = 'block';
  
  // Load Calendly script dynamically
  if (!document.getElementById('calendly-js')) {
    const script = document.createElement('script');
    script.id = 'calendly-js';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    document.body.appendChild(script);
  }
});

// Close handlers
closeCalendly.onclick = () => calendlyModal.style.display = 'none';
window.onclick = (e) => {
  if (e.target == calendlyModal) calendlyModal.style.display = 'none';
}

// Close with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') calendlyModal.style.display = 'none';
});

// Optional: Post-booking redirect
window.addEventListener('message', function(e) {
  if (e.data.event === 'calendly.event_scheduled') {
    // Trigger post-booking action
    calendlyModal.style.display = 'none';
    alert('Booking confirmed! 🎉 We\'ll send a calendar invite shortly.');
  }
});
