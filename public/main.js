const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-4-line"
  );
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-4-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__container .section__header", {
  ...scrollRevealOption,
});

const swiper = new Swiper(".swiper", {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    depth: 0,
    modifier: 1,
    scale: 0.9,
    stretch: 0,
  },
});

ScrollReveal().reveal(".service__container .section__subheader", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".service__container .section__header", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".service__row:nth-child(2n-1) img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".service__row:nth-child(2n) img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".service__details h4", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".service__details p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".service__btn", {
  ...scrollRevealOption,
  delay: 1500,
});




const instagram = document.querySelector(".instagram__images");

const instagramContent = Array.from(instagram.children);

instagramContent.forEach((item) => {
  const duplicateNode = item.cloneNode(true);
  duplicateNode.setAttribute("aria-hidden", true);
  instagram.appendChild(duplicateNode);
});




 function contactWhatsApp() {
    const phoneNumber = "2347012906655"; 
    const message = encodeURIComponent(
      "Hello, I’m interested in ordering from TeesByScorpio."
    );

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
  }


/* =========================
   ADD TO CART (WITH SIZE)
========================= */

function addToCart(productId) {
  const sizeSelect = document.getElementById(`size-${productId}`);
  const selectedSize = sizeSelect.value;

  if (!selectedSize) {
    alert("Please select a size");
    return;
  }

  const product = window.products.find(p => p.id === productId);
  if (!product) return;

  const phone = "2347012906655";

  const message = encodeURIComponent(
    `Hello 👋

I want to order the following T-shirt:

Product: ${product.name}
Size: ${selectedSize}
Price: ₦${product.price}

Delivery Location:`
  );

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}


window.products = [];




async function loadTshirts() {
  try {
    const res = await fetch("/tshirts.json");
    if (!res.ok) throw new Error("Failed to fetch tshirts.json");

    const tshirts = await res.json();
    window.products = tshirts;

    const container = document.getElementById("tshirt-container");
    container.innerHTML = "";

    tshirts.forEach(t => {
      if (!t.in_stock) return;

      const sizeOptions = t.sizes
        .map(s => `<option value="${s}">${s}</option>`)
        .join("");

      container.innerHTML += `
        <div class="swiper-slide product-slide">
          <div class="product-card">
            <img src="${t.image}" alt="${t.name}" class="product-image" />

            <h4>${t.name}</h4>
            <p>₦${t.price}</p>

            <select id="size-${t.id}" class="size-select">
              <option value="">Select size</option>
              ${sizeOptions}
            </select>

            <button
              class="add-to-cart"
              onclick="addToCart('${t.id}')"
            >
              Add to Cart
            </button>
          </div>
        </div>
      `;
    });

    new Swiper(".swiper", {
      loop: true,
      spaceBetween: 20,
      breakpoints: {
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });

  } catch (err) {
    console.error("Error loading T-shirts:", err);
  }
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", loadTshirts);

window.addToCart = addToCart;
window.contactWhatsApp = contactWhatsApp;
