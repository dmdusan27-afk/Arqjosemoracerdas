// ============================
// SCRIPT UNIFICADO: PRELOADER, AOS, PARALLAX, MENÚ MÓVIL,
// GALERÍA + CARRUSEL PORTAFOLIO + SCROLL SUAVE
// ============================

document.addEventListener('DOMContentLoaded', function () {

  // ============================
  // PRELOADER + ACTIVACIÓN CAD
  // ============================
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
      if (preloader) {
        preloader.classList.add("preloader-hide");
        setTimeout(() => {
          preloader.style.display = "none";
        }, 600);
      }
      document.body.classList.add("cad-ready");
    }, 1600);
  });

  // ============================
  // AOS ANIMATIONS
  // ============================
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80
    });
  }

  // ============================
  // PARALLAX SUAVE
  // ============================
  const parallaxImg = document.querySelector(".portada-img");
  if (parallaxImg) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const movement = scrollY * 0.10;
      parallaxImg.style.transform = `translateY(${movement}px)`;
    });
  }

  // ============================
  // MENÚ MÓVIL ARQUITECTÓNICO
  // ============================
  const toggle = document.querySelector('.menu-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (toggle && navMobile) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navMobile.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-mobile a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }

  // ============================
  // SCROLL SUAVE UNIVERSAL
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      e.preventDefault();

      window.scrollTo({
        top: target.offsetTop - 80, // Compensa el header fijo
        behavior: "smooth"
      });
    });
  });

  // ============================
  // DATOS DE PROYECTOS (GALERÍA)
  // ============================
  const proyectos = {
    1: {
      title: "Residenciales",
      href: "/proyectos/residenciales",
      images: ["images/residenciales/1.jpg", "images/residenciales/2.jpg"]
    },
    2: {
      title: "Comerciales",
      href: "/proyectos/comerciales",
      images: ["images/comerciales/1.jpg", "images/comerciales/2.jpg"]
    },
    3: {
      title: "Institucionales",
      href: "/proyectos/institucionales",
      images: ["images/institucionales/1.jpg", "images/institucionales/2.jpg"]
    }
  };

  // ============================
  // ELEMENTOS DEL MODAL
  // ============================
  const modal = document.getElementById('modal-galeria');
  const carousel = document.getElementById('carousel');
  const modalTitle = document.getElementById('modal-title');
  const modalDetalle = document.getElementById('modal-detalle');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');

  function getProyecto(key) {
    if (!key) return null;
    if (proyectos[key]) return proyectos[key];
    const num = parseInt(key, 10);
    if (!isNaN(num) && proyectos[num]) return proyectos[num];
    return null;
  }

  // ============================
  // BOTONES "VER GALERÍA"
  // ============================
  const verBtns = document.querySelectorAll('.ver-galeria');
  verBtns.forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.open));
  });

  // ============================
  // ABRIR MODAL
  // ============================
  function openModal(key) {
    const p = getProyecto(key);
    if (!p) return;

    modal.setAttribute('aria-hidden', 'false');
    modalTitle.textContent = p.title;
    modalDetalle.href = p.href;

    carousel.innerHTML = "";
    p.images.forEach((src, i) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${p.title} imagen ${i + 1}`;
      img.style.display = "none";
      carousel.appendChild(img);
    });

    carousel.dataset.index = "0";
    updateCarouselVisibility();

    modal.querySelector(".modal-close").focus();
  }

  function updateCarouselVisibility() {
    const imgs = carousel.querySelectorAll("img");
    const idx = parseInt(carousel.dataset.index);
    imgs.forEach((img, i) => {
      img.style.display = i === idx ? "block" : "none";
    });
  }

  // ============================
  // CONTROLES DEL MODAL
  // ============================
  if (btnPrev && btnNext) {
    btnPrev.addEventListener("click", () => {
      const imgs = carousel.querySelectorAll("img");
      let idx = parseInt(carousel.dataset.index);
      idx = (idx - 1 + imgs.length) % imgs.length;
      carousel.dataset.index = idx;
      updateCarouselVisibility();
    });

    btnNext.addEventListener("click", () => {
      const imgs = carousel.querySelectorAll("img");
      let idx = parseInt(carousel.dataset.index);
      idx = (idx + 1) % imgs.length;
      carousel.dataset.index = idx;
      updateCarouselVisibility();
    });
  }

  // ============================
  // CERRAR MODAL
  // ============================
  document.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    carousel.innerHTML = "";
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });

  // ============================
  // CARRUSEL PORTAFOLIO
  // ============================
  const portTrack = document.querySelector('.portafolio-track');
  const portSlides = document.querySelectorAll('.portafolio-slide');
  let portIndex = 0;

  const nextPort = document.getElementById('next-port');
  const prevPort = document.getElementById('prev-port');

  if (nextPort && prevPort && portTrack) {
    nextPort.onclick = () => {
      portIndex = (portIndex + 1) % portSlides.length;
      portTrack.style.transform = `translateX(-${portIndex * 100}%)`;
    };

    prevPort.onclick = () => {
      portIndex = (portIndex - 1 + portSlides.length) % portSlides.length;
      portTrack.style.transform = `translateX(-${portIndex * 100}%)`;
    };
  }

  // AUTOPLAY DEL CARRUSEL PORTAFOLIO
  if (portTrack && portSlides.length > 1) {
    setInterval(() => {
      portIndex = (portIndex + 1) % portSlides.length;
      portTrack.style.transform = `translateX(-${portIndex * 100}%)`;
    }, 4000);
  }
// ============================
// MENÚ HAMBURGUESA (HTML ACTUAL)
// ============================
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Cerrar menú al hacer clic en un enlace
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
}

}); // cierre de DOMContentLoaded
