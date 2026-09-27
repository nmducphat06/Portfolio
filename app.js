/* ============================================================
   app.js
   Plain vanilla JS. No dependencies, no build step.
   Sections:
   1. Mobile nav toggle
   2. Typing effect in the hero terminal
   3. Fade-in-on-scroll for sections
   4. Contact form (front-end only, no backend)
   5. Footer year
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. MOBILE NAV TOGGLE
     Clicking the hamburger opens/closes the nav links list.
     ---------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close the mobile menu after clicking a link (nice on small screens)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });


  /* ----------------------------------------------------------
     2. TYPING EFFECT
     Types the name out letter by letter in the terminal mock.
     Edit NAME_TO_TYPE below if you want to change the text.
     ---------------------------------------------------------- */
  const NAME_TO_TYPE = 'Nguyen Minh Duc';
  const typeTarget = document.getElementById('typeName');
  const liveCursor = document.getElementById('liveCursor');

  let charIndex = 0;

  function typeNextChar() {
    if (charIndex <= NAME_TO_TYPE.length) {
      typeTarget.textContent = NAME_TO_TYPE.slice(0, charIndex);
      charIndex++;
      setTimeout(typeNextChar, 90); // typing speed in ms per character
    } else {
      // Typing finished: stop the blinking cursor next to the last line
      // (the CSS animation keeps blinking, this just marks completion)
      liveCursor.classList.add('done');
    }
  }

  typeNextChar();


  /* ----------------------------------------------------------
     3. FADE-IN ON SCROLL
     Uses IntersectionObserver (built into modern browsers,
     no library needed) to add .is-visible when a section
     scrolls into view.
     ---------------------------------------------------------- */
  const fadeSections = document.querySelectorAll('.fade-section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // animate once, then stop watching
        }
      });
    },
    {
      threshold: 0.15, // trigger when ~15% of the section is visible
    }
  );

  fadeSections.forEach((section) => observer.observe(section));


  /* ----------------------------------------------------------
     4. CONTACT FORM (front-end only)
     There is no backend, so this just validates and shows a
     confirmation message. To wire this up to a real service
     later (e.g. Formspree, EmailJS), replace the code inside
     the submit handler with your own fetch() call.
     ---------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // stop the page from reloading

    const name = document.getElementById('name').value.trim();

    formStatus.textContent = `> message received. thanks, ${name || 'friend'} — I'll reply by email soon.`;

    contactForm.reset();
  });


  /* ----------------------------------------------------------
     5. FOOTER YEAR
     Keeps the copyright year correct without editing HTML.
     ---------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
