// =========================================
// SLOW BREW COFFEE - MAIN JAVASCRIPT
// =========================================


// =========================================
// MOBILE NAVIGATION
// =========================================

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("active");
  });

  const navLinks = nav.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      nav.classList.remove("active");
    });
  });
}


// =========================================
// CLOSE MOBILE MENU WITH ESCAPE KEY
// =========================================

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    menuToggle?.classList.remove("active");
    nav?.classList.remove("active");
  }
});


// =========================================
// CURRENT YEAR
// =========================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// =========================================
// NEWSLETTER FORM
// =========================================

const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmail = document.getElementById("newsletter-email");

if (newsletterForm && newsletterEmail) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = newsletterEmail.value.trim();

    if (!email) {
      return;
    }

    openNewsletterModal(email);

    newsletterForm.reset();
  });
}


// =========================================
// NEWSLETTER CONFIRMATION MODAL
// =========================================

function openNewsletterModal(email) {
  const existingModal =
    document.querySelector(".newsletter-modal");

  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");

  modal.className = "newsletter-modal";

  modal.innerHTML = `
    <div class="newsletter-modal-backdrop"></div>

    <div
      class="newsletter-modal-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-modal-title"
    >
      <button
        class="newsletter-modal-close"
        aria-label="Close confirmation"
      >
        &times;
      </button>

      <div class="newsletter-modal-icon">
        ☕
      </div>

      <p class="newsletter-modal-tag">
        Welcome to Slow Brew
      </p>

      <h2 id="newsletter-modal-title">
        You're on the list.
      </h2>

      <p>
        We'll send coffee news, new drink drops, and café updates to
        <strong>${escapeHTML(email)}</strong>.
      </p>

      <button class="btn btn-primary newsletter-modal-button">
        Sounds Good
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  requestAnimationFrame(() => {
    modal.classList.add("active");
  });

  document.body.style.overflow = "hidden";

  const closeButton =
    modal.querySelector(".newsletter-modal-close");

  const confirmButton =
    modal.querySelector(".newsletter-modal-button");

  const backdrop =
    modal.querySelector(".newsletter-modal-backdrop");

  closeButton?.focus();

  closeButton?.addEventListener(
    "click",
    closeNewsletterModal
  );

  confirmButton?.addEventListener(
    "click",
    closeNewsletterModal
  );

  backdrop?.addEventListener(
    "click",
    closeNewsletterModal
  );

  function closeNewsletterModal() {
    modal.classList.remove("active");

    document.body.style.overflow = "";

    setTimeout(() => {
      modal.remove();
    }, 300);
  }

  function handleModalEscape(event) {
    if (event.key === "Escape") {
      closeNewsletterModal();

      document.removeEventListener(
        "keydown",
        handleModalEscape
      );
    }
  }

  document.addEventListener(
    "keydown",
    handleModalEscape
  );
}


// =========================================
// BASIC HTML ESCAPING
// =========================================

function escapeHTML(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// =========================================
// HEADER SCROLL EFFECT
// =========================================

const header = document.querySelector(".header");

function updateHeader() {
  if (!header) {
    return;
  }

  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener(
  "scroll",
  updateHeader
);

updateHeader();


// =========================================
// SCROLL REVEAL
// =========================================

const revealElements =
  document.querySelectorAll(
    ".intro-grid, .drink-card, .experience-image, .experience-content, .mood-card, .visit-content, .hours-card, .newsletter-content"
  );

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
  const revealObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            revealObserver.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


// =========================================
// CONTACT FORM
// =========================================

const contactForm =
  document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      const firstName =
        document
          .getElementById("first-name")
          ?.value.trim() || "there";

      openContactModal(firstName);

      contactForm.reset();
    }
  );
}


// =========================================
// CONTACT CONFIRMATION MODAL
// =========================================

function openContactModal(firstName) {
  const oldModal =
    document.querySelector(".contact-modal");

  if (oldModal) {
    oldModal.remove();
  }

  const modal =
    document.createElement("div");

  modal.className =
    "newsletter-modal contact-modal";

  modal.innerHTML = `
    <div class="newsletter-modal-backdrop"></div>

    <div
      class="newsletter-modal-card"
      role="dialog"
      aria-modal="true"
    >
      <button
        class="newsletter-modal-close contact-modal-close"
        aria-label="Close confirmation"
      >
        &times;
      </button>

      <div class="newsletter-modal-icon">
        ☕
      </div>

      <p class="newsletter-modal-tag">
        Message Received
      </p>

      <h2>
        Thanks, ${escapeHTML(firstName)}.
      </h2>

      <p>
        Your message has been sent to the Slow Brew team.
        We'll get back to you soon.
      </p>

      <button
        class="btn btn-primary contact-modal-button"
      >
        Back to Slow Brew
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  requestAnimationFrame(() => {
    modal.classList.add("active");
  });

  document.body.style.overflow = "hidden";

  const closeButton =
    modal.querySelector(
      ".contact-modal-close"
    );

  const confirmButton =
    modal.querySelector(
      ".contact-modal-button"
    );

  const backdrop =
    modal.querySelector(
      ".newsletter-modal-backdrop"
    );

  function closeContactModal() {
    modal.classList.remove("active");

    document.body.style.overflow = "";

    setTimeout(() => {
      modal.remove();
    }, 300);
  }

  closeButton?.addEventListener(
    "click",
    closeContactModal
  );

  confirmButton?.addEventListener(
    "click",
    closeContactModal
  );

  backdrop?.addEventListener(
    "click",
    closeContactModal
  );
}


// =========================================
// FAQ ACCORDION
// =========================================

const faqItems =
  document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question =
    item.querySelector(".faq-question");

  const answer =
    item.querySelector(".faq-answer");

  question?.addEventListener(
    "click",
    () => {
      const isActive =
        item.classList.contains("active");

      faqItems.forEach(
        (otherItem) => {
          otherItem.classList.remove(
            "active"
          );

          const otherAnswer =
            otherItem.querySelector(
              ".faq-answer"
            );

          if (otherAnswer) {
            otherAnswer.style.maxHeight =
              null;
          }
        }
      );

      if (!isActive) {
        item.classList.add("active");

        if (answer) {
          answer.style.maxHeight =
            answer.scrollHeight + "px";
        }
      }
    }
  );
});


// =========================================
// ORDER BUTTONS
// =========================================

const orderButtons =
  document.querySelectorAll(".nav-button");

orderButtons.forEach((button) => {
  button.addEventListener(
    "click",
    (event) => {
      event.preventDefault();

      openOrderModal();
    }
  );
});


// =========================================
// ORDER MODAL
// =========================================

function openOrderModal(selectedDrink = "") {
  const existingModal =
    document.querySelector(".order-modal");

  if (existingModal) {
    existingModal.remove();
  }

  const modal =
    document.createElement("div");

  modal.className = "order-modal";

  modal.innerHTML = `
    <div class="order-modal-backdrop"></div>

    <div
      class="order-modal-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
    >

      <button
        class="order-modal-close"
        aria-label="Close order form"
      >
        &times;
      </button>

      <div class="order-modal-header">

        <p class="section-tag">
          Slow Brew To Go
        </p>

        <h2 id="order-modal-title">
          What sounds good?
        </h2>

        <p>
          Build your drink just the way you like it,
          and we'll get it started.
        </p>

      </div>


      <form id="coffee-order-form">

        <div class="order-form-group">

          <label for="order-drink">
            Choose Your Drink
          </label>

          <select id="order-drink" required>

            <option value="" disabled selected>
              Select a drink
            </option>

            <option value="Caramel Cloud Latte">
              Caramel Cloud Latte
            </option>

            <option value="Vanilla Cream Cold Brew">
              Vanilla Cream Cold Brew
            </option>

            <option value="Dark Chocolate Mocha">
              Dark Chocolate Mocha
            </option>

            <option value="Cinnamon Honey Latte">
              Cinnamon Honey Latte
            </option>

            <option value="Cappuccino">
              Cappuccino
            </option>

            <option value="Matcha Latte">
              Matcha Latte
            </option>

            <option value="Chai Latte">
              Chai Latte
            </option>

          </select>

        </div>


        <div class="order-form-group">

          <label>
            Size
          </label>

          <div class="order-option-grid order-size-options">

            <label class="order-choice">

              <input
                type="radio"
                name="order-size"
                value="Small"
              />

              <span>
                Small
                <small>12 oz</small>
              </span>

            </label>


            <label class="order-choice">

              <input
                type="radio"
                name="order-size"
                value="Medium"
                checked
              />

              <span>
                Medium
                <small>16 oz</small>
              </span>

            </label>


            <label class="order-choice">

              <input
                type="radio"
                name="order-size"
                value="Large"
              />

              <span>
                Large
                <small>20 oz</small>
              </span>

            </label>

          </div>

        </div>


        <div class="order-form-group">

          <label for="order-milk">
            Milk
          </label>

          <select id="order-milk">

            <option value="Whole Milk">
              Whole Milk
            </option>

            <option value="Oat Milk">
              Oat Milk
            </option>

            <option value="Almond Milk">
              Almond Milk
            </option>

            <option value="Coconut Milk">
              Coconut Milk
            </option>

            <option value="No Milk">
              No Milk
            </option>

          </select>

        </div>


        <div class="order-form-group">

          <label>
            How Do You Want It?
          </label>

          <div class="order-option-grid order-temp-options">

            <label class="order-choice">

              <input
                type="radio"
                name="order-temp"
                value="Hot"
                checked
              />

              <span>
                Hot ☕
              </span>

            </label>


            <label class="order-choice">

              <input
                type="radio"
                name="order-temp"
                value="Iced"
              />

              <span>
                Iced 🧊
              </span>

            </label>

          </div>

        </div>


        <div class="order-extra">

          <label class="order-checkbox">

            <input
              type="checkbox"
              id="extra-shot"
            />

            <span class="order-checkbox-box">
            </span>

            <div>

              <strong>
                Add an Extra Shot
              </strong>

              <small>
                Some mornings require backup.
              </small>

            </div>

          </label>

        </div>


        <div class="order-form-group">

          <label for="order-name">
            Name For The Order
          </label>

          <input
            type="text"
            id="order-name"
            placeholder="Your name"
            required
          />

        </div>


        <button
          type="submit"
          class="btn btn-primary order-submit"
        >
          Place Order
        </button>

      </form>

    </div>
  `;

  document.body.appendChild(modal);

  const drinkSelect =
    modal.querySelector("#order-drink");

  if (selectedDrink && drinkSelect) {
    drinkSelect.value = selectedDrink;
  }

  requestAnimationFrame(() => {
    modal.classList.add("active");
  });

  document.body.style.overflow =
    "hidden";


  const closeButton =
    modal.querySelector(
      ".order-modal-close"
    );

  const backdrop =
    modal.querySelector(
      ".order-modal-backdrop"
    );

  const orderForm =
    modal.querySelector(
      "#coffee-order-form"
    );


  function closeOrderModal() {
    modal.classList.remove("active");

    document.body.style.overflow = "";

    setTimeout(() => {
      modal.remove();
    }, 300);
  }


  closeButton?.addEventListener(
    "click",
    closeOrderModal
  );

  backdrop?.addEventListener(
    "click",
    closeOrderModal
  );


  orderForm?.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();

      const drink =
        modal.querySelector(
          "#order-drink"
        )?.value || "";

      const milk =
        modal.querySelector(
          "#order-milk"
        )?.value || "";

      const name =
        modal.querySelector(
          "#order-name"
        )?.value.trim() || "";

      const size =
        modal.querySelector(
          'input[name="order-size"]:checked'
        )?.value || "";

      const temperature =
        modal.querySelector(
          'input[name="order-temp"]:checked'
        )?.value || "";

      const extraShot =
        modal.querySelector(
          "#extra-shot"
        )?.checked || false;


      showOrderConfirmation({
        drink,
        milk,
        name,
        size,
        temperature,
        extraShot,
      });
    }
  );


  function handleOrderEscape(event) {
    if (event.key === "Escape") {
      closeOrderModal();

      document.removeEventListener(
        "keydown",
        handleOrderEscape
      );
    }
  }

  document.addEventListener(
    "keydown",
    handleOrderEscape
  );
}


// =========================================
// ORDER CONFIRMATION
// =========================================

function showOrderConfirmation(order) {
  const modal =
    document.querySelector(
      ".order-modal"
    );

  if (!modal) {
    return;
  }

  const card =
    modal.querySelector(
      ".order-modal-card"
    );

  if (!card) {
    return;
  }

  const shotText =
    order.extraShot
      ? " • Extra Shot"
      : "";

  card.innerHTML = `
    <button
      class="order-modal-close final-order-close"
      aria-label="Close order confirmation"
    >
      &times;
    </button>

    <div class="order-confirmation">

      <div class="order-success-icon">
        ☕
      </div>

      <p class="section-tag">
        Order Received
      </p>

      <h2>
        Good choice, ${escapeHTML(order.name)}.
      </h2>

      <p class="order-confirmation-copy">
        Your order has been sent to the Slow Brew baristas.
      </p>


      <div class="order-summary">

        <div>
          <span>Drink</span>

          <strong>
            ${escapeHTML(order.drink)}
          </strong>
        </div>

        <div>
          <span>Size</span>

          <strong>
            ${escapeHTML(order.size)}
          </strong>
        </div>

        <div>
          <span>Style</span>

          <strong>
            ${escapeHTML(order.temperature)}
          </strong>
        </div>

        <div>
          <span>Milk</span>

          <strong>
            ${escapeHTML(order.milk)}
            ${shotText}
          </strong>
        </div>

      </div>


      <p class="order-ready-message">
        It'll be ready in about
        <strong>8–10 minutes.</strong>
      </p>


      <button
        class="btn btn-primary finish-order-button"
      >
        Sounds Good
      </button>

    </div>
  `;

  const finishButton =
    card.querySelector(
      ".finish-order-button"
    );

  const closeButton =
    card.querySelector(
      ".final-order-close"
    );


  function finishOrder() {
    modal.classList.remove("active");

    document.body.style.overflow = "";

    setTimeout(() => {
      modal.remove();
    }, 300);
  }


  finishButton?.addEventListener(
    "click",
    finishOrder
  );

  closeButton?.addEventListener(
    "click",
    finishOrder
  );
}
// =========================================
// HOMEPAGE DRINK CARD QUICK ORDER
// =========================================

const drinkCards = document.querySelectorAll(".drink-card");

drinkCards.forEach((card) => {
  card.style.cursor = "pointer";

  card.addEventListener("click", () => {
    const drinkName =
      card.querySelector(".drink-title-row h3")
        ?.textContent.trim();

    if (!drinkName) {
      return;
    }

    openOrderModal(drinkName);
  });
});