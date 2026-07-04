// ── Page loader ──────────────────────────────────────────────
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("page-loader").classList.add("hidden");
    document.getElementById("page-loader").addEventListener(
      "transitionend",
      () => {
        document.getElementById("page-loader").style.display = "none";
      },
      { once: true },
    );
  }, 1700);
});

// ── Custom cursor ────────────────────────────────────────────
const dot = document.getElementById("cursor-dot");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
function animateCursor() {
  dot.style.left = mx + "px";
  dot.style.top = my + "px";
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animateCursor);
}
if (window.innerWidth > 768) {
  animateCursor();
} else {
  dot.style.display = "none";
  ring.style.display = "none";
}

document
  .querySelectorAll("a,button,.service-card,.project-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.width = "54px";
      ring.style.height = "54px";
      ring.style.borderColor = "var(--orange)";
      dot.style.transform = "translate(-50%,-50%) scale(1.8)";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(249,115,22,.5)";
      dot.style.transform = "translate(-50%,-50%) scale(1)";
    });
  });

// ── Scroll progress bar ──────────────────────────────────────
const bar = document.getElementById("progress-bar");
window.addEventListener("scroll", () => {
  const pct =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = pct + "%";
});

// ── Navbar ───────────────────────────────────────────────────
const navbar = document.getElementById("navbar");
const hamburgerLines = document.querySelectorAll(".hamburger-line");
let menuOpen = false;

function updateNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
    hamburgerLines.forEach((l) =>
      l.classList.replace("bg-white", "bg-gray-800"),
    );
  } else {
    navbar.classList.remove("scrolled");
    if (!menuOpen)
      hamburgerLines.forEach((l) => {
        l.classList.remove("bg-gray-800");
        l.classList.add("bg-white");
      });
  }
}
window.addEventListener("scroll", updateNavbar);
updateNavbar();

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute("id");
  });
  navLinks.forEach((l) => {
    l.classList.toggle("active", l.getAttribute("href") === "#" + current);
  });
});

// ── Mobile menu ──────────────────────────────────────────────
const mobileMenu = document.getElementById("mobile-menu");
document.getElementById("menu-toggle").addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("open", menuOpen);
  // Animate hamburger
  const [l1, l2, l3] = hamburgerLines;
  if (menuOpen) {
    l1.style.transform = "translateY(8px) rotate(45deg)";
    l2.style.opacity = "0";
    l3.style.transform = "translateY(-8px) rotate(-45deg)";
    hamburgerLines.forEach((l) => {
      l.classList.remove("bg-gray-800");
      l.classList.add("bg-white");
    });
  } else {
    l1.style.transform = l2.style.opacity = l3.style.transform = "";
    l2.style.opacity = "1";
    if (window.scrollY > 60)
      hamburgerLines.forEach((l) => {
        l.classList.replace("bg-white", "bg-gray-800");
      });
  }
});
document.querySelectorAll(".mobile-nav-link").forEach((l) => {
  l.addEventListener("click", () => {
    menuOpen = false;
    mobileMenu.classList.remove("open");
    [hamburgerLines[0], hamburgerLines[2]].forEach(
      (l) => (l.style.transform = ""),
    );
    hamburgerLines[1].style.opacity = "1";
    if (window.scrollY > 60)
      hamburgerLines.forEach((l) => {
        l.classList.replace("bg-white", "bg-gray-800");
      });
  });
});

// ── Scroll reveal ────────────────────────────────────────────
const revealEls = document.querySelectorAll("[data-reveal]");
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => revealObs.observe(el));

// ── Hero Image Slider ────────────────────────────────────────
const sliderItems = document.querySelectorAll(".hero-slider-item");
const sliderDots = document.querySelectorAll(".slider-dot");
let currentSlide = 0;
const totalSlides = sliderItems.length;
let sliderInterval;

function showSlide(index) {
  // Normalize index
  currentSlide = (index + totalSlides) % totalSlides;

  // Update slides
  sliderItems.forEach((item, i) => {
    item.classList.toggle("active", i === currentSlide);
  });

  // Update dots
  sliderDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Dot click handler
sliderDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    resetSliderInterval();
  });
});

// Auto-rotate slider
function startSliderInterval() {
  sliderInterval = setInterval(nextSlide, 5000);
}

function resetSliderInterval() {
  clearInterval(sliderInterval);
  startSliderInterval();
}

// Start slider
startSliderInterval();

// Optional: pause on hover
const heroBg = document.querySelector(".hero-bg");
heroBg.addEventListener("mouseenter", () => {
  clearInterval(sliderInterval);
});
heroBg.addEventListener("mouseleave", () => {
  startSliderInterval();
});

// ── Typewriter ───────────────────────────────────────────────
const words = ["Infrastruktur", "Masa Depan", "Standar Tinggi", "Bersama Anda"];
let wi = 0,
  ci = 0,
  deleting = false;
const twEl = document.getElementById("typewriter");
function typeWriter() {
  const word = words[wi];
  if (!deleting) {
    twEl.textContent = word.substring(0, ci + 1);
    ci++;
    if (ci === word.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    twEl.textContent = word.substring(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      wi = (wi + 1) % words.length;
    }
  }
  setTimeout(typeWriter, deleting ? 60 : 100);
}
setTimeout(typeWriter, 2000);

// ── Floating particles ───────────────────────────────────────
const pContainer = document.getElementById("particles-container");
for (let i = 0; i < 18; i++) {
  const p = document.createElement("div");
  p.className = "particle";
  const size = Math.random() * 5 + 2;
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random() * 100}%;
    animation-duration:${Math.random() * 12 + 8}s;
    animation-delay:${Math.random() * 10}s;
  `;
  pContainer.appendChild(p);
}

// ── Animated counter ────────────────────────────────────────
const counters = document.querySelectorAll(".count-el");
let counted = false;
const counterObs = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      counters.forEach((el) => {
        const target = +el.dataset.target;
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const suffix = el.parentElement
          .querySelector("div:last-child")
          .textContent.includes("%")
          ? "+"
          : "+";
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target + (target === 98 ? "%" : "+");
            clearInterval(timer);
          } else
            el.textContent = Math.floor(current) + (target === 98 ? "%" : "+");
        }, 16);
      });
    }
  },
  { threshold: 0.4 },
);
if (counters[0]) counterObs.observe(counters[0].closest("section"));

// ── Project filter ───────────────────────────────────────────
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    const filter = this.dataset.filter;
    document
      .querySelectorAll("#project-grid [data-category]")
      .forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.style.transition = "all .4s ease";
        card.style.opacity = show ? "1" : "0";
        card.style.transform = show ? "scale(1)" : "scale(.95)";
        card.style.pointerEvents = show ? "auto" : "none";
      });
  });
});

// ── Project lightbox ─────────────────────────────────────────
const lightbox = document.getElementById("lightbox");
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.getElementById("lightbox-img").src = card.dataset.img || "";
    document.getElementById("lightbox-title").textContent =
      card.dataset.title || "";
    document.getElementById("lightbox-desc").textContent =
      card.dataset.desc || "";
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});
document
  .getElementById("lightbox-close")
  .addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

// ── Product carousel controls ───────────────────────────────
const productCarousel = document.getElementById("product-carousel");
document.querySelectorAll(".carousel-control").forEach((btn) => {
  btn.addEventListener("click", () => {
    const direction = btn.dataset.direction;
    const scrollAmount = productCarousel.clientWidth * 0.88;
    productCarousel.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  });
});

// ── FAQ accordion ────────────────────────────────────────────
document.querySelectorAll(".faq-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const item = this.closest(".faq-item");
    const content = item.querySelector(".faq-content");
    const isOpen = item.classList.contains("active");
    // Close all
    document.querySelectorAll(".faq-item").forEach((i) => {
      i.classList.remove("active");
      i.querySelector(".faq-content").classList.remove("open");
    });
    // Open clicked
    if (!isOpen) {
      item.classList.add("active");
      content.classList.add("open");
    }
  });
});

// ── Contact form ─────────────────────────────────────────────
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = this.querySelector(".btn-submit");
    btn.innerHTML =
      '<i class="fas fa-spinner fa-spin text-sm"></i> Mengirim...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check text-sm"></i> Terkirim!';
      btn.style.background = "#22c55e";
      showToast("✅", "Pesan berhasil dikirim!");
      this.reset();
      setTimeout(() => {
        btn.innerHTML =
          '<i class="fas fa-paper-plane text-sm"></i> Kirim Pesan';
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });

// Ripple effect on submit button
document.querySelector(".btn-submit").addEventListener("click", function (e) {
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  const rect = this.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${
    e.clientX - rect.left - size / 2
  }px;top:${e.clientY - rect.top - size / 2}px`;
  this.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// ── Toast ────────────────────────────────────────────────────
function showToast(icon, msg) {
  const t = document.getElementById("toast");
  t.querySelector(".toast-icon").textContent = icon;
  document.getElementById("toast-msg").textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 4000);
}

// ── Back to top ──────────────────────────────────────────────
const backTop = document.getElementById("back-top");
window.addEventListener("scroll", () =>
  backTop.classList.toggle("visible", window.scrollY > 400),
);
backTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

// ── 3D Tilt on service cards ─────────────────────────────────
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -(y / rect.height) * 8;
    const ry = (x / rect.width) * 8;
    this.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px)`;
  });
  card.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});

// ── Smooth scroll ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Submit Form/Contact Person

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = this.querySelector('input[type="text"]').value;

    const telepon = this.querySelector('input[type="tel"]').value;

    const email = this.querySelector('input[type="email"]').value;

    const layanan = this.querySelector("select").value;

    const pesan = this.querySelector("textarea").value;

    const subject = encodeURIComponent(
      "Pesan Baru Website CV. Laras Gemilang Teknika",
    );

    const body = encodeURIComponent(`
Nama : ${nama}

Telepon : ${telepon}

Email : ${email}

Layanan : ${layanan}

Pesan :
${pesan}
    `);

    window.location.href = `mailto:nopiantono282@gmail.com?subject=${subject}&body=${body}`;
  });
