const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const serviceSelect = document.querySelector("[data-service-select]");
const bookingForm = document.querySelector("[data-booking-form]");
const bookingSummary = document.querySelector("[data-booking-summary]");
const bookingLink = document.querySelector("[data-booking-link]");
const workSlider = document.querySelector("[data-work-slider]");
const workPrev = document.querySelector("[data-work-prev]");
const workNext = document.querySelector("[data-work-next]");

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

updateSummary();

(function () {
  "use strict";

  const SALON = {
    name: { en: "Siamak Hair Design", fa: "سیامک هیر دیزاین" },
    phone: "(416) 222-8090",
    phoneRaw: "+14162228090",
    address: "3292 Bayview Ave, North York, ON M2M 4J5",
    instagram: "https://www.instagram.com/siamakhairdesign.toronto/",
    maps: "https://www.google.com/maps/search/?api=1&query=3292%20Bayview%20Ave%2C%20North%20York%2C%20ON%20M2M%204J5",
    hours: {
      en: [["Monday", "Closed"], ["Tuesday", "10 a.m. - 6 p.m."], ["Wednesday", "10 a.m. - 6 p.m."], ["Thursday", "10 a.m. - 6 p.m."], ["Friday", "10 a.m. - 6 p.m."], ["Saturday", "9 a.m. - 6 p.m."], ["Sunday", "Closed"]],
      fa: [["شنبه", "۹ صبح تا ۶ عصر"], ["یکشنبه", "تعطیل"], ["دوشنبه", "تعطیل"], ["سه‌شنبه", "۱۰ صبح تا ۶ عصر"], ["چهارشنبه", "۱۰ صبح تا ۶ عصر"], ["پنجشنبه", "۱۰ صبح تا ۶ عصر"], ["جمعه", "۱۰ صبح تا ۶ عصر"]],
    },
    team: {
      en: [["Siamak", "Lead Hair Designer — polished cuts, color direction, calm consultations"], ["Arman", "Color Stylist — color refreshes, styling, clean everyday finishes"], ["Nima", "Treatments & Cuts — smoothing treatments, maintenance cuts, healthy-hair care"]],
      fa: [["سیامک", "طراح ارشد مو — کوتاهی تمیز، طراحی رنگ، مشاوره با حوصله"], ["آرمان", "استایلیست رنگ — رفرش رنگ، حالت‌دهی و فینیش روزمره"], ["نیما", "تریتمنت و کوتاهی — تریتمنت‌های صاف‌کننده، کوتاهی نگهدارنده، سلامت مو"]],
    },
  };

  const SERVICES = [
    { id: "wcbd", icon: "✂", price: 90, cal: calendlyByService["Women's Cut and Blow Dry"], en: { name: "Women's Cut & Blow Dry", desc: "Cut, shape, and finished blow dry" }, fa: { name: "کوتاهی و سشوار زنانه", desc: "کوتاهی، فرم‌دهی و سشوار نهایی" } },
    { id: "wbd", icon: "BD", price: 50, cal: calendlyByService["Women's Blow Dry"], en: { name: "Women's Blow Dry", desc: "Smooth salon finish" }, fa: { name: "سشوار زنانه", desc: "فینیش صاف و سالنی" } },
    { id: "mens", icon: "MC", price: 50, cal: calendlyByService["Men's Cut"], en: { name: "Men's Cut", desc: "Clean, tailored haircut" }, fa: { name: "کوتاهی مردانه", desc: "کوتاهی تمیز و دقیق" } },
    { id: "fullhl", icon: "HL", price: 250, cal: calendlyByService["Full Head Highlight"], en: { name: "Full Head Highlight", desc: "Brightness and dimension throughout" }, fa: { name: "هایلایت کامل", desc: "روشنایی و بُعد در کل مو" } },
    { id: "parthl", icon: "PH", price: 175, cal: calendlyByService["Partial Highlight"], en: { name: "Partial Highlight", desc: "Targeted brightness and refresh" }, fa: { name: "هایلایت موضعی", desc: "روشنایی هدفمند و رفرش" } },
    { id: "color", icon: "CO", price: 90, cal: calendlyByService.Color, en: { name: "Color", desc: "Fresh single-process color" }, fa: { name: "رنگ مو", desc: "رنگ تازه و یکدست" } },
    { id: "treat", icon: "TR", price: 40, cal: calendlyByService["Hair Treatment"], en: { name: "Hair Treatment", desc: "Care and refresh for healthier hair" }, fa: { name: "تریتمنت مو", desc: "مراقبت و رفرش برای موی سالم‌تر" } },
    { id: "perm", icon: "PM", price: 120, cal: calendlyByService.Perm, en: { name: "Perm", desc: "Shape, curl, and lasting movement" }, fa: { name: "فر مو", desc: "فرم، فر و حالت ماندگار" } },
    { id: "keratin", icon: "KT", price: 300, cal: calendlyByService["Keratin Treatment"], en: { name: "Keratin Treatment", desc: "Smooth, polished, frizz-free finish" }, fa: { name: "کراتین مو", desc: "فینیش صاف، براق و بدون وز" } },
    { id: "makeup", icon: "MU", price: 80, cal: calendlyByService["Make Up"], en: { name: "Make Up", desc: "Beauty makeup for special occasions" }, fa: { name: "میکاپ", desc: "آرایش مجلسی برای مناسبت‌ها" } },
    { id: "updo", icon: "UD", price: 120, cal: calendlyByService["Up Do"], en: { name: "Up Do", desc: "Elegant styling for events" }, fa: { name: "شینیون مجلسی", desc: "حالت‌دهی شیک برای مراسم" } },
  ];

  const byId = (id) => SERVICES.find((service) => service.id === id);
  const priceTxt = (service, lang) => (lang === "fa" ? `از ${service.price}$` : `From $${service.price}`);

  const T = {
    en: {
      placeholder: "Type your message...",
      launchTitle: "Book with Siamak",
      launchSub: "Concierge online",
      hName: SALON.name.en,
      hStatus: "Booking concierge · online",
      cred: "Powered by Siamak Hair Design · ",
      greeting: ["Welcome to <b>Siamak Hair Design</b> in Toronto.", "I'm Mina, your booking concierge. I can show services and prices, help you choose the right appointment, and open the correct booking link."],
      chips: ["View services & prices", "Book an appointment", "Which service is right for me?", "Hours & location"],
      bookNow: "Book now",
      pickService: "Lovely — which service would you like to book? Pick one below and I'll open Siamak's live calendar with real available times.",
      consultIntro: "Happy to help you choose. A quick question first:",
    },
    fa: {
      placeholder: "پیام خود را بنویسید...",
      launchTitle: "رزرو نوبت",
      launchSub: "پشتیبان آنلاین",
      hName: SALON.name.fa,
      hStatus: "دستیار رزرو · آنلاین",
      cred: "با افتخار سیامک هیر دیزاین · ",
      greeting: ["به <b>سیامک هیر دیزاین</b> در تورنتو خوش آمدید.", "من مینا هستم، دستیار رزرو شما. می‌تونم خدمات و قیمت‌ها رو توضیح بدم، در انتخاب سرویس مناسب کمک کنم و لینک رزرو درست رو باز کنم."],
      chips: ["مشاهده خدمات و قیمت‌ها", "رزرو نوبت", "چه سرویسی مناسب منه؟", "ساعت کاری و آدرس"],
      bookNow: "رزرو نوبت",
      pickService: "عالی — کدوم سرویس رو می‌خواید رزرو کنید؟ یکی رو از پایین انتخاب کنید تا تقویم زنده سیامک باز بشه.",
      consultIntro: "خوشحال می‌شم در انتخاب کمکتون کنم. اول یک سؤال کوتاه:",
    },
  };

  let lang = "en";
  let consult = { active: false };
  const panel = document.querySelector("#skPanel");
  const body = document.querySelector("#skBody");
  const chips = document.querySelector("#skChips");
  const text = document.querySelector("#skText");
  const send = document.querySelector("#skSend");
  const launcher = document.querySelector("#skLauncher");

  function normalize(value) {
    return (value || "").toLowerCase().trim();
  }

  function paraToHtml(value) {
    return value.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");
  }

  function scrollDown() {
    body.scrollTop = body.scrollHeight;
  }

  function addMsg(role, html) {
    const wrap = document.createElement("div");
    wrap.className = "sk-msg" + (role === "me" ? " me" : "");
    const avatar = role === "me" ? "" : '<div class="av">M</div>';
    wrap.innerHTML = `${avatar}<div class="sk-bub">${html}</div>`;
    body.appendChild(wrap);
    scrollDown();
  }

  function addCards(ids) {
    const wrap = document.createElement("div");
    wrap.className = "sk-cards";
    wrap.innerHTML = ids.map((id) => {
      const service = byId(id);
      if (!service) return "";
      return `<div class="sk-card">
        <div class="ci">${service.icon}</div>
        <div class="cc"><b>${service[lang].name}</b><span>${priceTxt(service, lang)} · ${service[lang].desc}</span></div>
        <a class="sk-book" href="${service.cal}" target="_blank" rel="noopener">${T[lang].bookNow}</a>
      </div>`;
    }).join("");
    body.appendChild(wrap);
    scrollDown();
  }

  let typingEl = null;
  function showTyping() {
    hideTyping();
    typingEl = document.createElement("div");
    typingEl.className = "sk-msg";
    typingEl.innerHTML = '<div class="av">M</div><div class="sk-typing"><span></span><span></span><span></span></div>';
    body.appendChild(typingEl);
    scrollDown();
  }

  function hideTyping() {
    if (typingEl) {
      typingEl.remove();
      typingEl = null;
    }
  }

  function renderChips(list) {
    chips.innerHTML = "";
    (list || []).forEach((label) => {
      const button = document.createElement("button");
      button.className = "sk-chip";
      button.textContent = label;
      button.addEventListener("click", () => handleUser(label));
      chips.appendChild(button);
    });
  }

  function matchService(raw) {
    const query = normalize(raw);
    const map = {
      wcbd: ["women cut", "womens cut", "woman cut", "cut and blow", "cut & blow", "کوتاهی زنانه", "کوتاهی و سشوار"],
      wbd: ["women blow", "womens blow", "blow dry", "blowdry", "سشوار"],
      mens: ["men", "mens cut", "man cut", "men's", "مردانه", "کوتاهی مرد", "آقایان"],
      fullhl: ["full head", "full highlight", "full hl", "فول هد", "هایلایت کامل"],
      parthl: ["partial", "part highlight", "پارشیال", "هایلایت موضعی", "هایلایت پارشیال"],
      color: ["color", "colour", "dye", "tint", "رنگ مو", "رنگ"],
      treat: ["treatment", "treat", "repair", "mask", "تریتمنت", "ترمیم"],
      perm: ["perm", "curl", "wave", "فر", "پرم"],
      keratin: ["keratin", "smoothing", "straighten", "brazilian", "کراتین", "صاف"],
      makeup: ["make up", "makeup", "make-up", "میکاپ", "آرایش", "گریم"],
      updo: ["up do", "updo", "up-do", "bridal", "wedding", "event hair", "شینیون", "عروس", "مجلسی"],
    };
    const hits = [];
    Object.keys(map).forEach((id) => {
      if (map[id].some((keyword) => query.includes(keyword))) hits.push(id);
    });
    if (query.includes("highlight") || query.includes("هایلایت")) {
      if (!hits.includes("fullhl")) hits.push("fullhl");
      if (!hits.includes("parthl")) hits.push("parthl");
    }
    return [...new Set(hits)];
  }

  function has(query, ...keywords) {
    return keywords.some((keyword) => query.includes(keyword));
  }

  function ruleReply(raw) {
    const query = normalize(raw);
    const t = T[lang];
    const fa = lang === "fa";
    const services = matchService(query);

    if (consult.active) return consultRoute(raw);

    if (has(query, "book", "appointment", "reserve", "schedule", "رزرو", "نوبت", "وقت")) {
      if (services.length === 1) {
        const service = byId(services[0]);
        return { text: [fa ? `برای <b>${service.fa.name}</b> (${priceTxt(service, lang)}) از دکمه زیر تقویم زنده سیامک رو باز کنید.` : `Perfect. For <b>${service.en.name}</b> (${priceTxt(service, lang)}), tap below to open Siamak's live calendar.`], cards: [service.id], chips: fa ? ["سرویس دیگه", "ساعت کاری", "آدرس سالن"] : ["A different service", "Opening hours", "Salon address"] };
      }
      return { text: [t.pickService], cards: services.length ? services : ["wcbd", "color", "fullhl", "keratin"], chips: fa ? ["همه خدمات", "کدوم مناسب منه؟"] : ["All services", "Which suits me?"] };
    }

    if (services.length) {
      return { text: [fa ? "بفرمایید جزئیات این سرویس‌ها. برای رزرو روی دکمه بزنید:" : "Here are those services. Tap any card to book:"], cards: services, chips: fa ? ["رزرو نوبت", "همه خدمات", "ساعت کاری"] : ["Book a time", "All services", "Opening hours"] };
    }

    if (has(query, "price", "pricing", "cost", "how much", "menu", "service", "services", "what kind", "what do you offer", "قیمت", "هزینه", "خدمات", "سرویس", "لیست")) {
      return { text: [fa ? "این‌ها خدمات سالن با قیمت شروع هستن. روی هر کدوم بزنید تا رزرو کنید:" : "Here is our service menu with starting prices. Tap any service to book it:"], cards: SERVICES.map((service) => service.id), chips: fa ? ["رزرو نوبت", "کدوم مناسب منه؟", "ساعت و آدرس"] : ["Book now", "Which suits me?", "Hours & location"] };
    }

    if (has(query, "hour", "open", "close", "time", "when", "today", "ساعت", "باز", "تعطیل", "کی", "امروز")) {
      const rows = SALON.hours[lang].map(([day, hours]) => `${day} — <b>${hours}</b>`).join("<br>");
      return { text: [(fa ? "ساعت کاری سالن:" : "Siamak Hair Design hours:") + "<br>" + rows], chips: fa ? ["رزرو نوبت", "آدرس سالن", "تماس تلفنی"] : ["Book an appointment", "Salon address", "Call the salon"] };
    }

    if (has(query, "where", "location", "address", "map", "direction", "park", "آدرس", "کجا", "نقشه", "مسیر", "پارکینگ")) {
      return { text: [fa ? `سالن ما اینجاست:<br><b>${SALON.address}</b>` : `You'll find us at:<br><b>${SALON.address}</b>`, `<a href="${SALON.maps}" target="_blank" rel="noopener">${fa ? "باز کردن در گوگل مپ" : "Open in Google Maps"}</a>`], chips: fa ? ["ساعت کاری", "رزرو نوبت", "تماس تلفنی"] : ["Opening hours", "Book an appointment", "Call the salon"] };
    }

    if (has(query, "phone", "call", "number", "contact", "instagram", "insta", "social", "تلفن", "تماس", "شماره", "اینستا", "پیج")) {
      return { text: [fa ? `📞 <a href="tel:${SALON.phoneRaw}">${SALON.phone}</a><br>📷 <a href="${SALON.instagram}" target="_blank" rel="noopener">اینستاگرام سالن</a>` : `📞 <a href="tel:${SALON.phoneRaw}">${SALON.phone}</a><br>📷 <a href="${SALON.instagram}" target="_blank" rel="noopener">Instagram</a>`], chips: fa ? ["رزرو نوبت", "ساعت کاری", "آدرس"] : ["Book an appointment", "Opening hours", "Address"] };
    }

    if (has(query, "who", "stylist", "team", "siamak", "arman", "nima", "staff", "کی", "استایلیست", "تیم", "سیامک", "آرمان", "نیما")) {
      const rows = SALON.team[lang].map(([name, role]) => `<b>${name}</b> — ${role}`).join("<br><br>");
      return { text: [(fa ? "تیم ما:" : "Meet the team:") + "<br>" + rows], chips: fa ? ["رزرو نوبت", "همه خدمات"] : ["Book an appointment", "See services"] };
    }

    if (has(query, "which", "recommend", "suit", "right for me", "help me choose", "advice", "not sure", "کدوم", "پیشنهاد", "مناسب", "کمک", "مطمئن نیستم")) {
      return consultStep1();
    }

    if (has(query, "hi", "hello", "hey", "سلام", "درود")) {
      return { text: [fa ? "سلام! می‌تونم خدمات و قیمت‌ها رو نشون بدم یا همین حالا نوبتتون رو رزرو کنم." : "Hi! I can show services and pricing, help you choose, or book you in right now."], chips: t.chips };
    }

    return { text: [fa ? "می‌تونم درباره خدمات، قیمت‌ها، ساعت کاری، آدرس، تیم و رزرو نوبت کمکتون کنم. از کدوم شروع کنیم؟" : "I can help with services, pricing, hours, location, the team, and booking your visit. Where shall we start?"], chips: t.chips };
  }

  function consultStep1() {
    consult = { active: true };
    const fa = lang === "fa";
    return { text: [T[lang].consultIntro, fa ? "امروز بیشتر دنبال چی هستید؟" : "What are you mostly after today?"], chips: fa ? ["کوتاهی / فرم", "رنگ یا هایلایت", "صافی / سلامت مو", "مدل مجلسی / آرایش"] : ["A cut / shape", "Color or highlights", "Smooth / healthy hair", "Event hair / makeup"] };
  }

  function consultRoute(raw) {
    const query = normalize(raw);
    const fa = lang === "fa";
    consult = { active: false };
    if (/(cut|shape|trim|کوتاهی|فرم)/.test(query)) return { text: [fa ? "برای کوتاهی و فرم، این گزینه‌ها عالی‌ان:" : "For a cut and shape, these are the best fits:"], cards: ["wcbd", "mens", "wbd"], chips: T[lang].chips };
    if (/(color|colour|highlight|رنگ|هایلایت)/.test(query)) return { text: [fa ? "برای رنگ و روشنایی، این‌ها رو پیشنهاد می‌کنم:" : "For color and brightness, I’d suggest these:"], cards: ["color", "parthl", "fullhl"], chips: T[lang].chips };
    if (/(smooth|healthy|frizz|keratin|صافی|سلامت|کراتین|تریتمنت)/.test(query)) return { text: [fa ? "برای موی صاف و سالم، این‌ها بهترین انتخاب‌ان:" : "For smooth, healthy hair, these are the best fit:"], cards: ["keratin", "treat"], chips: T[lang].chips };
    if (/(event|wedding|bridal|makeup|make up|updo|مجلسی|عروس|آرایش|شینیون|میکاپ)/.test(query)) return { text: [fa ? "برای ظاهر مجلسی، این‌ها مناسب‌ان:" : "For an event-ready look, these are ideal:"], cards: ["updo", "makeup", "wcbd"], chips: T[lang].chips };
    return ruleReply(raw);
  }

  function paint(reply) {
    (reply.text || []).forEach((paragraph) => addMsg("bot", paraToHtml(paragraph)));
    if (reply.cards && reply.cards.length) addCards(reply.cards);
    renderChips(reply.chips && reply.chips.length ? reply.chips : T[lang].chips);
  }

  async function handleUser(raw) {
    const message = (raw || "").trim();
    if (!message) return;
    addMsg("me", paraToHtml(message));
    renderChips([]);
    text.value = "";
    autosize();
    showTyping();
    await new Promise((resolve) => setTimeout(resolve, 260));
    hideTyping();
    paint(ruleReply(message));
  }

  function applyLang() {
    const t = T[lang];
    panel.setAttribute("dir", lang === "fa" ? "rtl" : "ltr");
    text.placeholder = t.placeholder;
    document.querySelector("#ltTitle").textContent = t.launchTitle;
    document.querySelector("#ltSub").textContent = t.launchSub;
    document.querySelector("#hName").textContent = t.hName;
    document.querySelector("#hStatus").textContent = t.hStatus;
    document.querySelector("#skCred").innerHTML = `${t.cred}<a href="tel:${SALON.phoneRaw}">${SALON.phone}</a>`;
    document.querySelector("#langEn").classList.toggle("active", lang === "en");
    document.querySelector("#langFa").classList.toggle("active", lang === "fa");
  }

  function setLang(nextLang) {
    if (nextLang === lang) return;
    lang = nextLang;
    applyLang();
    body.innerHTML = "";
    consult = { active: false };
    greet();
  }

  function greet() {
    T[lang].greeting.forEach((paragraph, index) => {
      setTimeout(() => {
        addMsg("bot", paragraph);
        if (index === T[lang].greeting.length - 1) renderChips(T[lang].chips);
      }, index * 250);
    });
  }

  function autosize() {
    text.style.height = "auto";
    text.style.height = `${Math.min(text.scrollHeight, 96)}px`;
    send.disabled = !text.value.trim();
  }

  function openPanel() {
    panel.classList.add("open");
    launcher.style.display = "none";
    setTimeout(() => text.focus(), 250);
    if (!body.childElementCount) greet();
  }

  function closePanel() {
    panel.classList.remove("open");
    launcher.style.display = "";
  }

  text.addEventListener("input", autosize);
  text.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleUser(text.value);
    }
  });
  send.addEventListener("click", () => handleUser(text.value));
  launcher.addEventListener("click", openPanel);
  document.querySelector("#skClose").addEventListener("click", closePanel);
  document.querySelector("#langEn").addEventListener("click", () => setLang("en"));
  document.querySelector("#langFa").addEventListener("click", () => setLang("fa"));

  send.disabled = true;
  applyLang();
})();
