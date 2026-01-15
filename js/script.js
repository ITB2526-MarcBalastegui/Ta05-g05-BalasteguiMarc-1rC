document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     FUNCIONALITAT 1: MENÚ LATERAL I OVERLAY
     ===================================================== */
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu-lateral");
  const overlay = document.querySelector(".menu-overlay");
  const body = document.body;

  function toggleMenu() {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");

    if (overlay) {
      overlay.classList.toggle("visible");
    }

    // Bloquejar scroll quan el menú està obert
    body.classList.toggle("menu-visible");
  }

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  // Tancar menú en clicar fora
  if (overlay) {
    overlay.addEventListener("click", () => {
      if (menu.classList.contains("active")) {
        toggleMenu();
      }
    });
  }

  /* =====================================================
     FUNCIONALITAT 2: ANIMACIONS (IntersectionObserver)
     ===================================================== */
  const elementsAnimats = document.querySelectorAll(".project-card, .featured-card, .projecte-bloc");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsAnimats.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(element);
  });

  /* =====================================================
     FUNCIONALITAT 3: BOTÓ "PUJAR A DALT"
     ===================================================== */
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = "↑";
  scrollTopBtn.id = "scrollTopBtn";
  scrollTopBtn.title = "Tornar a dalt";

  Object.assign(scrollTopBtn.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "none",
    padding: "10px 15px",
    fontSize: "18px",
    backgroundColor: "#ffcc00",
    color: "#000",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: "1000",
    boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
    transition: "opacity 0.3s"
  });

  document.body.appendChild(scrollTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});