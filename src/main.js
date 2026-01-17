import "./style.css";

// ===== Year in footer =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Counter Animation =====
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-target')) || 100;
  let current = 0;
  const increment = target / 50; // Animate over ~50 frames
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
};

// Trigger counter when element comes into view
const counterElement = document.querySelector('.counter-number');
if (counterElement) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counterObserver.observe(counterElement);
}

// ===== Parallax Scrolling =====
window.addEventListener('scroll', () => {
  const companiesSection = document.querySelector('.companies');
  if (companiesSection) {
    const scrollPosition = window.pageYOffset;
    const sectionPosition = companiesSection.offsetTop;
    const distance = scrollPosition - sectionPosition;
    
    if (distance > -window.innerHeight && distance < companiesSection.offsetHeight) {
      companiesSection.style.backgroundPosition = `center ${distance * 0.5}px`;
    }
  }
});

// ===== Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  // Close menu after clicking a link
  mobileMenu.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.matches("a")) {
      mobileMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      // Close all submenus
      const mobileTriggers = document.querySelectorAll('.mobile-trigger');
      mobileTriggers.forEach(trigger => {
        trigger.classList.remove('open');
        trigger.nextElementSibling.classList.remove('open');
      });
    }
  });
}

// ===== Mobile dropdowns =====
const mobileTriggers = document.querySelectorAll('.mobile-trigger');
mobileTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const submenu = trigger.nextElementSibling;
    const open = submenu.classList.toggle('open');
    trigger.classList.toggle('open', open);
  });
});

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => io.observe(el));

// ===== Staggered Fade-in Animation =====
const staggerItems = document.querySelectorAll('.stagger-item');
const staggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
        entry.target.classList.add('animate');
      }
    });
  },
  { threshold: 0.1 }
);

staggerItems.forEach((el) => staggerObserver.observe(el));

// ===== Scale-up Animation =====
const scaleUpItems = document.querySelectorAll('.scale-up-item');
const scaleUpObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
        entry.target.classList.add('animate');
      }
    });
  },
  { threshold: 0.15 }
);

scaleUpItems.forEach((el) => scaleUpObserver.observe(el));

// ===== Parallax Text Animation =====
const parallaxTexts = document.querySelectorAll('.parallax-text');
if (parallaxTexts.length > 0) {
  window.addEventListener('scroll', () => {
    parallaxTexts.forEach((element) => {
      const scrollPosition = window.pageYOffset;
      const elementPosition = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax when element is in viewport
      if (scrollPosition + windowHeight > elementPosition && scrollPosition < elementPosition + elementHeight) {
        const offset = (scrollPosition - elementPosition) * 0.3;
        element.style.transform = `translateY(${offset}px)`;
      }
    });
  });
}

// ===== Map overlay scroll animation =====
const mapWrapper = document.querySelector('.company-image-wrapper');
if (mapWrapper) {
  const mapObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
          entry.target.classList.add('visible');
          mapObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  mapObserver.observe(mapWrapper);
}

// ===== Stats counter animation =====
function animateCount(el) {
  const target = Number(el.getAttribute("data-count") || "0");
  const suffix = el.getAttribute("data-suffix") || "";
  const duration = 900;
  const start = performance.now();

  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.round(target * eased);
    el.textContent = `${value}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
    else el.classList.add("done");
  }

  requestAnimationFrame(tick);
}

const statNums = document.querySelectorAll(".stat strong[data-count]");
const statsIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (!el.dataset.animated) {
        el.dataset.animated = "true";
        animateCount(el);
      }
    });
  },
  { threshold: 0.35 }
);

statNums.forEach((el) => statsIO.observe(el));

// ===== Modal helpers =====
function openModal(modalId, topic) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  // Set topic if provided
  const topicSelect = document.getElementById("driverTopic");
  if (topicSelect && topic) topicSelect.value = topic;

  // Focus first input
  const focusable = modal.querySelector("input, select, textarea, button");
  if (focusable) focusable.focus();

  // Prevent body scroll
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

// Open buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open-modal]");
  if (btn) {
    const modalId = btn.getAttribute("data-open-modal");
    const topic = btn.getAttribute("data-topic") || "";
    openModal(modalId, topic);
    return;
  }

  const closeBtn = e.target.closest("[data-close-modal]");
  if (closeBtn) {
    const modalId = closeBtn.getAttribute("data-close-modal");
    closeModal(modalId);
  }
});

// Esc closes modal
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const open = document.querySelector(".modal.is-open");
  if (open) closeModal(open.id);
});

// ===== Gallery lightbox =====
function createLightbox() {
  if (document.querySelector('.lightbox')) return document.querySelector('.lightbox');

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('aria-hidden', 'true');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.type = 'button';
  closeBtn.textContent = 'Close';

  const content = document.createElement('div');
  content.className = 'lightbox-content';

  lb.appendChild(content);
  lb.appendChild(closeBtn);
  document.body.appendChild(lb);

  // Close handlers
  closeBtn.addEventListener('click', () => closeLightbox(lb));
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox(lb);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox(lb);
  });

  return lb;
}

function openLightbox(node) {
  const lb = createLightbox();
  const content = lb.querySelector('.lightbox-content');
  content.innerHTML = '';

  if (node.tagName === 'IMG') {
    const img = document.createElement('img');
    img.src = node.src;
    img.alt = node.alt || '';
    content.appendChild(img);
  } else if (node.tagName === 'VIDEO') {
    const vid = document.createElement('video');
    vid.controls = true;
    vid.src = node.querySelector('source') ? node.querySelector('source').src : node.currentSrc || node.src;
    vid.autoplay = true;
    content.appendChild(vid);
  }

  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
}

function closeLightbox(lb) {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  const content = lb.querySelector('.lightbox-content');
  content.innerHTML = '';
}

document.addEventListener('click', (e) => {
  const img = e.target.closest('.gallery-grid img');
  if (img) {
    openLightbox(img);
    return;
  }

  const video = e.target.closest('.gallery-grid video');
  if (video) {
    openLightbox(video);
    return;
  }
});

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Form Validation & Feedback =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    
    if (input.checkValidity()) {
      // Show success feedback (you can enhance this with a toast notification)
      const btn = newsletterForm.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = '✓ Subscribed!';
      btn.style.background = 'linear-gradient(135deg, #4cd353, #72d4ff)';
      
      // Reset after 2 seconds
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        input.value = '';
      }, 2000);
    }
  });
}
