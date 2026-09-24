// Resposta "da API" digitada no card do hero
const response = [
  ["{", "p"],
  ['\n  "nome": ', "k"], ['"Renan Hideki"', "s"], [",", "p"],
  ['\n  "cargo": ', "k"], ['"Full-Stack Developer"', "s"], [",", "p"],
  ['\n  "local": ', "k"], ['"Santos, SP"', "s"], [",", "p"],
  ['\n  "curso": ', "k"], ['"Sistemas de Informação"', "s"], [",", "p"],
  ['\n  "stack": ', "k"], ["[", "p"],
  ['"C#"', "s"], [", ", "p"], ['"Java"', "s"], [", ", "p"],
  ['"SQL"', "s"], [", ", "p"], ['"n8n"', "s"], ["]", "p"], [",", "p"],
  ['\n  "aprendendo": ', "k"], ['"AWS"', "s"], [",", "p"],
  ['\n  "disponivel": ', "k"], ["true", "s"],
  ["\n}", "p"],
];

const body = document.getElementById("res-body");
const code = document.getElementById("res-code");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderAll() {
  body.innerHTML = response
    .map(([text, cls]) => `<span class="${cls}">${escapeHtml(text)}</span>`)
    .join("");
  code.textContent = "200 OK";
  code.classList.add("ok");
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function typeResponse() {
  let part = 0;
  let char = 0;
  const caret = document.createElement("span");
  caret.className = "caret";
  let current = null;

  code.textContent = "200 OK";
  code.classList.add("ok");
  body.appendChild(caret);

  function step() {
    if (part >= response.length) return;
    const [text, cls] = response[part];
    if (char === 0) {
      current = document.createElement("span");
      current.className = cls;
      body.insertBefore(current, caret);
    }
    current.textContent += text[char];
    char++;
    if (char >= text.length) {
      part++;
      char = 0;
    }
    setTimeout(step, text[char - 1] === "\n" ? 90 : 18);
  }
  step();
}

if (reduceMotion) {
  renderAll();
} else {
  // simula a latência da requisição antes de responder
  setTimeout(typeResponse, 700);
}

// Aparecer as seções ao rolar
const revealEls = document.querySelectorAll(".section-title, .about, .stack-group, .project, .contact-card, .contact-lead");
revealEls.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Destacar o link do menu da seção atual
const navLinks = document.querySelectorAll(".nav nav a");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("section[id]").forEach((s) => sectionObserver.observe(s));

document.getElementById("year").textContent = new Date().getFullYear();
