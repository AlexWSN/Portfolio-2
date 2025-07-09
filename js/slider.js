document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main section");

  // setează vizibil prima secțiune
  if (sections.length) {
    sections[0].classList.add("visible");
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.6,
    }
  );

  sections.forEach((section) => observer.observe(section));
});
document.addEventListener("DOMContentLoaded", () => {
  const btnPaintings = document.querySelector("button:nth-of-type(1)");
  const btnModels = document.querySelector("button:nth-of-type(2)");

  const paintingsGallery = document.getElementById("paintings-gallery");
  const modelsGallery = document.getElementById("models-gallery");

  // Afișează doar galeria picturi la început
  paintingsGallery.hidden = false;
  modelsGallery.hidden = true;

  btnPaintings.addEventListener("click", () => {
    paintingsGallery.hidden = false;
    modelsGallery.hidden = true;
    updateImages();
  });

  btnModels.addEventListener("click", () => {
    modelsGallery.hidden = false;
    paintingsGallery.hidden = true;
    updateImages();
  });

  const closeButtons = document.querySelectorAll(".close-gallery");

  btnPaintings.addEventListener("click", () => {
    paintingsGallery.hidden = false;
    modelsGallery.hidden = true;
    updateImages();
  });

  btnModels.addEventListener("click", () => {
    modelsGallery.hidden = false;
    paintingsGallery.hidden = true;
    updateImages();
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const parent = e.target.closest("div");
      parent.hidden = true;
    });
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  let currentIndex = -1;
  let visibleImages = [];

  function updateImages() {
    visibleImages = [
      ...document.querySelectorAll("#paintings-gallery:not([hidden]) img"),
      ...document.querySelectorAll("#models-gallery:not([hidden]) img"),
    ];
    visibleImages.forEach((img, index) => {
      img.addEventListener("click", () => openLightbox(index));
      img.style.cursor = "pointer";
    });
  }

  function openLightbox(index) {
    currentIndex = index;
    const img = visibleImages[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "";
    lightbox.classList.remove("hidden");
  }

  window.closeLightbox = function () {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
    currentIndex = -1;
  };

  window.prevImage = function () {
    if (visibleImages.length === 0) return;
    currentIndex =
      (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    openLightbox(currentIndex);
  };

  window.nextImage = function () {
    if (visibleImages.length === 0) return;
    currentIndex = (currentIndex + 1) % visibleImages.length;
    openLightbox(currentIndex);
  };

  // Închide lightbox când faci click pe fundal
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Navigare cu tastele
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  });

  // Inițializare
  updateImages();
});
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll("#carousel .slide");
  const leftBtn = document.querySelector("#carousel .nav-button.left");
  const rightBtn = document.querySelector("#carousel .nav-button.right");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeLightboxBtn = document.getElementById("closeLightbox");

  let currentIndex = 0;

  function updateSlides() {
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === currentIndex);
    });
  }

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
  }

  // Navigare cu butoane
  rightBtn.addEventListener("click", showNextSlide);
  leftBtn.addEventListener("click", showPrevSlide);

  // Click pe slide activ pentru lightbox
  slides.forEach((slide, idx) => {
    slide.addEventListener("click", () => {
      console.log("Slide clicked, active?", slide.classList.contains("active"));
      if (!slide.classList.contains("active")) return; 
      const img = slide.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "";
      lightbox.classList.add("visible");
    });
  });

  // Inchide lightbox
  closeLightboxBtn.addEventListener("click", () => {
    lightbox.classList.remove("visible");
    lightboxImg.src = "";
  });

  // Click pe fundal lightbox pentru inchidere
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("visible");
      lightboxImg.src = "";
    }
  });

  // Navigare cu tastele in lightbox
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("visible")) return;

    if (e.key === "Escape") {
      lightbox.classList.remove("visible");
      lightboxImg.src = "";
    }
  });

  // Initializare carousel
  updateSlides();
});const lightboxCertificates = document.getElementById("lightbox-certificates");
const lightboxImgCertificates = document.getElementById("lightboxImgCertificates");
const closeLightboxBtnCertificates = document.getElementById("closeLightboxCertificates");

// Ex: la click pe imagine din Certificates
slides.forEach((slide) => {
  slide.addEventListener("click", () => {
    if (!slide.classList.contains("active")) return;
    const img = slide.querySelector("img");
    lightboxImgCertificates.src = img.src;
    lightboxImgCertificates.alt = img.alt || "";
    lightboxCertificates.classList.add("visible");
    document.body.style.overflow = 'hidden';
  });
});

closeLightboxBtnCertificates.addEventListener("click", () => {
  lightboxCertificates.classList.remove("visible");
  lightboxImgCertificates.src = "";
  document.body.style.overflow = '';
});

lightboxCertificates.addEventListener("click", (e) => {
  if (e.target === lightboxCertificates) {
    lightboxCertificates.classList.remove("visible");
    lightboxImgCertificates.src = "";
    document.body.style.overflow = '';
  }
});
