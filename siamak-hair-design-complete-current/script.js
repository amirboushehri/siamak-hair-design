const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const serviceSelect = document.querySelector("[data-service-select]");
const bookingForm = document.querySelector("[data-booking-form]");
const bookingNote = document.querySelector("[data-booking-note]");
const bookingSummary = document.querySelector("[data-booking-summary]");
const dayOptions = document.querySelector("[data-day-options]");
const timeOptions = document.querySelector("[data-time-options]");
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

const openingsByWeekday = {
  0: ["10:30 AM", "12:00 PM", "2:15 PM", "4:45 PM"],
  1: ["11:00 AM", "1:30 PM", "3:00 PM", "6:00 PM"],
  2: ["10:00 AM", "12:45 PM", "2:30 PM", "5:15 PM"],
  3: ["9:45 AM", "1:00 PM", "4:00 PM", "6:30 PM"],
  4: ["10:15 AM", "12:30 PM", "3:45 PM", "5:30 PM"],
  5: ["11:30 AM", "2:00 PM", "4:15 PM"],
  6: ["10:00 AM", "12:15 PM", "3:30 PM"],
};

const state = {
  date: "",
  dateKey: "",
  weekday: 0,
  time: "",
  lang: "en",
};

const chatCopy = {
  en: {
    welcome: "Hi, I can help with services, pricing, and booking an appointment.",
    placeholder: "Type a message...",
    prompts: {
      services: "We offer haircuts, colour, blondes, balayage, keratin, hair botox, extensions, and styling.",
      booking: "You can book from the appointment section. Choose a service, day, and available opening.",
      location: "The salon is based in Toronto. The exact address can be connected before launch.",
      fallback: "Thanks. A real AI receptionist can answer this more personally once connected.",
    },
  },
  fa: {
    welcome: "سلام، می‌توانم درباره خدمات، نوبت و موقعیت سالن کمک کنم.",
    placeholder: "پیام خود را بنویسید...",
    prompts: {
      services: "خدمات شامل کوتاهی، رنگ، بلوند، بالیاژ، کراتین، بوتاکس مو، اکستنشن و استایلینگ است.",
      booking: "برای گرفتن نوبت، از بخش رزرو خدمات، روز و ساعت مورد نظر را انتخاب کنید.",
      location: "سالن در تورنتو قرار دارد. آدرس دقیق قبل از راه‌اندازی اضافه می‌شود.",
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

function calendlyLink(date, time) {
  return `https://calendly.com/siamak-demo/${date.toLowerCase().replaceAll(" ", "-")}-${time.toLowerCase().replaceAll(":", "").replaceAll(" ", "")}`;
}

function getTorontoToday() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day), 12));
}

function dateDetails(date) {
  return {
    weekday: date.getUTCDay(),
    shortDay: new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" }).format(date),
    shortDate: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(date),
    fullDate: new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(date),
    key: date.toISOString().slice(0, 10),
  };
}

function renderDays() {
  dayOptions.innerHTML = "";
  const today = getTorontoToday();

  for (let offset = 0; offset < 7; offset += 1) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() + offset);
    const details = dateDetails(date);
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.date = details.fullDate;
    button.dataset.dateKey = details.key;
    button.dataset.weekday = String(details.weekday);
    button.innerHTML = `${details.shortDay}<span>${details.shortDate}</span>`;
    button.classList.toggle("active", offset === 0);
    button.addEventListener("click", () => {
      state.date = details.fullDate;
      state.dateKey = details.key;
      state.weekday = details.weekday;
      dayOptions.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
      renderOpenings();
    });
    dayOptions.append(button);

    if (offset === 0) {
      state.date = details.fullDate;
      state.dateKey = details.key;
      state.weekday = details.weekday;
    }
  }
}

function updateSummary() {
  bookingSummary.textContent = `Selected: ${serviceSelect.value} on ${state.date} at ${state.time}`;
}

function renderOpenings() {
  timeOptions.innerHTML = "";
  const openings = openingsByWeekday[state.weekday];
  openings.forEach((time, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = time;
    button.dataset.time = time;
    button.dataset.calendly = calendlyLink(state.dateKey, time);
    button.classList.toggle("active", index === 0);
    button.addEventListener("click", () => {
      state.time = time;
      timeOptions.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
      updateSummary();
    });
    timeOptions.append(button);
  });
  state.time = openings[0];
  updateSummary();
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
  const activeTime = timeOptions.querySelector(".active");
  bookingNote.textContent = `Appointment request received for ${serviceSelect.value} on ${state.date} at ${state.time}. Calendly placeholder: ${activeTime.dataset.calendly}`;
  bookingNote.hidden = false;
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

renderDays();
renderOpenings();
