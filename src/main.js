import "./style.css";

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => observer.observe(el));

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

function closeMenu() {
  mobileMenu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open menu");
}

function toggleMenu() {
  const isOpen = mobileMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", toggleMenu);

// Close menu when clicking a link
document.querySelectorAll(".mobile-link, .mobile-cta").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close menu on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
// Animated counters
const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || "";
      let current = 0;

      const increment = Math.max(1, Math.floor(target / 80));

      const update = () => {
        current += increment;

        if (current >= target) {
          el.textContent = `${target}${suffix}`;
          el.classList.add("done"); // triggers glow in CSS
        } else {
          el.textContent = `${current}${suffix}`;
          requestAnimationFrame(update);
        }
      };

      update();
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((c) => counterObserver.observe(c));
