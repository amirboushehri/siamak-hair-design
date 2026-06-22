const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const serviceSelect = document.querySelector("[data-service-select]");
const bookingForm = document.querySelector("[data-booking-form]");
const bookingNote = document.querySelector("[data-booking-note]");
const bookingSummary = document.querySelector("[data-booking-summary]");
const bookingLink = document.querySelector("[data-booking-link]");
const workSlider = document.querySelector("[data-work-slider]");
const workPrev = document.querySelector("[data-work-prev]");
const workNext = document.querySelector("[data-work-next]");
const chatPanel = document.querySelector("[data-chat-panel]");
const chatToggles = document.querySelectorAll("[data-chat-toggle]");
const chatMessages = document.querySelector("[data-chat-messages]");
const chatForm = document.querySelector("[data-chat-form]");
const chatInput = chatForm.querySelector("input");
const chatPrompts = document.querySelector("[data-chat-prompts]");
const languageButtons = document.querySelectorAll("[data-lang]");

const calendlyByService = {
  "Women's Cut and Blow Dry": "https://calendly.com/siamaktoronto/30min",
  "Women's Blow Dry": "https://calendly.com/siamaktoronto/women-s-cut-and-blow-dry-clone",
  "Men's Cut": "https://calendly.com/siamaktoronto/women-s-blow-dry-clone",
  "Full Head Highlight": "https://calendly.com/siamaktoronto/men-s-cut-clone",
  "Partial Highlight": "https://calendly.com/siamaktoronto/full-head-highlight-clone",
  Color: "https://calendly.com/siamaktoronto/partial-highlight-clone",
  "Hair Treatment": "https://calendly.com/siamaktoronto/color-clone",
  Perm: "https://calendly.com/siamaktoronto/hair-treatment-clone",
  "Keratin Treatment": "https://calendly.com/siamaktoronto/perm-clone",
  "Make Up": "https://calendly.com/siamaktoronto/keratin-treatment-clone",
  "Up Do": "https://calendly.com/siamaktoronto/make-up-clone",
};

const servicePrices = {
  "Women's Cut and Blow Dry": "From $90 and up",
  "Women's Blow Dry": "From $50 and up",
  "Men's Cut": "From $50 and up",
  "Full Head Highlight": "From $250 and up",
  "Partial Highlight": "From $175 and up",
  Color: "From $90 and up",
  "Hair Treatment": "From $40 and up",
  Perm: "From $120 and up",
  "Keratin Treatment": "From $300 and up",
  "Make Up": "From $80 and up",
  "Up Do": "From $120 and up",
};

const state = {
  lang: "en",
};

const chatCopy = {
  en: {
    welcome: "Hi, I can help with services, pricing, and booking an appointment.",
    placeholder: "Type a message...",
    prompts: {
      services: "Services include women's cut and blow dry, women's blow dry, men's cut, highlights, color, hair treatment, perm, keratin, make up, and up do styling.",
      booking: "Choose a service from the booking section, then Calendly will show the real available days and times.",
      location: "Siamak Hair Design is at 3292 Bayview Ave. Unit 103, Toronto, ON M2M 4J5.",
      fallback: "Thanks. A real AI receptionist can answer this more personally once connected.",
    },
  },
  fa: {
    welcome: "سلام، می‌توانم درباره خدمات، نوبت و موقعیت سالن کمک کنم.",
    placeholder: "پیام خود را بنویسید...",
    prompts: {
      services: "خدمات شامل کوتاهی و براشینگ بانوان، براشینگ، کوتاهی آقایان، هایلایت، رنگ، درمان مو، فر، کراتین، میکاپ و شینیون است.",
      booking: "برای گرفتن نوبت، از بخش رزرو یک خدمت را انتخاب کنید. سپس Calendly روزها و ساعت‌های آزاد را نشان می‌دهد.",
      location: "آدرس سالن: 3292 Bayview Ave. Unit 103, Toronto, ON M2M 4J5.",
      fallback: "ممنون. وقتی دستیار هوش مصنوعی واقعی وصل شود، پاسخ دقیق‌تر می‌دهد.",
    },
  },
};

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

document.querySelectorAll("[data-service-link]").forEach((link) => {
  link.addEventListener("click", () => {
    serviceSelect.value = link.dataset.serviceLink;
    updateSummary();
  });
});

function calendlyLink(service) {
  return calendlyByService[service] || "https://calendly.com/siamaktoronto";
}

function updateSummary() {
  const price = servicePrices[serviceSelect.value];
  const link = calendlyLink(serviceSelect.value);
  bookingSummary.textContent = `${serviceSelect.value} — ${price}`;
  bookingLink.href = link;
  bookingLink.setAttribute("aria-label", `Book ${serviceSelect.value} on Calendly`);
}

serviceSelect.addEventListener("change", updateSummary);

workPrev.addEventListener("click", () => {
  workSlider.scrollBy({ left: -360, behavior: "smooth" });
});

workNext.addEventListener("click", () => {
  workSlider.scrollBy({ left: 360, behavior: "smooth" });
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  window.location.href = calendlyLink(serviceSelect.value);
});

function addMessage(text, type = "bot") {
  const message = document.createElement("p");
  message.className = type === "user" ? "user-message" : "bot-message";
  message.textContent = text;
  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setLanguage(lang) {
  state.lang = lang;
  languageButtons.forEach((button) => button.classList.toggle("active", button.dataset.lang === lang));
  chatInput.placeholder = chatCopy[lang].placeholder;
  chatMessages.innerHTML = "";
  addMessage(chatCopy[lang].welcome);
}

chatToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    chatPanel.hidden = !chatPanel.hidden;
  });
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

chatPrompts.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    addMessage(button.textContent, "user");
    addMessage(chatCopy[state.lang].prompts[button.dataset.prompt]);
  });
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  addMessage(message, "user");
  addMessage(chatCopy[state.lang].prompts.fallback);
  chatInput.value = "";
});

updateSummary();
