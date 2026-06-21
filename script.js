// =====================
// Theme Toggle (Light / Dark)
// =====================

(function () {
    const root = document.documentElement;
    const toggleBtns = [
        document.getElementById("theme-toggle"),
        document.getElementById("theme-toggle-mobile")
    ].filter(Boolean);
    const mobileLabel = document.querySelector(".theme-toggle-label");

    function getStoredTheme() {
        try {
            return localStorage.getItem("theme");
        } catch (e) {
            return null;
        }
    }

    function storeTheme(theme) {
        try {
            localStorage.setItem("theme", theme);
        } catch (e) {
            /* localStorage unavailable — theme just won't persist across reloads */
        }
    }

    function applyTheme(theme) {
        if (theme === "light") {
            root.setAttribute("data-theme", "light");
        } else {
            root.removeAttribute("data-theme");
        }

        toggleBtns.forEach(btn => {
            btn.setAttribute(
                "aria-label",
                theme === "light" ? "تغییر به حالت تاریک" : "تغییر به حالت روشن"
            );
        });

        if (mobileLabel) {
            mobileLabel.textContent = theme === "light" ? "حالت تاریک" : "حالت روشن";
        }
    }

    // Determine initial theme: stored preference > system preference > dark default
    const stored = getStoredTheme();
    const prefersLight =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches;

    const initialTheme = stored || (prefersLight ? "light" : "dark");
    applyTheme(initialTheme);

    toggleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const isLight = root.getAttribute("data-theme") === "light";
            const next = isLight ? "dark" : "light";
            applyTheme(next);
            storeTheme(next);
        });
    });
})();

// =====================
// Profile Image Protection
// =====================

const profileImg = document.querySelector(".hero-avatar");

if (profileImg) {
    profileImg.addEventListener("contextmenu", e => e.preventDefault());
    profileImg.addEventListener("dragstart", e => e.preventDefault());
}

// =====================
// AOS
// =====================

AOS.init({
    duration: 800,
    once: true
});

// =====================
// Typing Effect
// =====================

const typingText = document.getElementById("typing-text");

// REMOVED: "سازنده فناوری و نرم‌افزار" and "توسعه‌دهنده با رویکرد مهندسی"
const words = [
    "دانش‌آموز الکتروتکنیک",
    "AI-Assisted Developer",
    "در حال ساخت ایده‌های کاربردی"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    const currentWord = words[wordIndex];

    if(!deleting){
        typingText.textContent = currentWord.substring(0, charIndex++);
    }else{
        typingText.textContent = currentWord.substring(0, charIndex--);
    }

    let speed = deleting ? 50 : 100;

    if(!deleting && charIndex > currentWord.length){
        deleting = true;
        speed = 1500;
    }

    if(deleting && charIndex < 0){
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 300;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

// =====================
// Custom Cursor
// =====================

const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");

const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    cursor.style.display = "none";
    ring.style.display = "none";
} else {
    document.addEventListener("mousemove", e => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

        ring.style.left = e.clientX + "px";
        ring.style.top = e.clientY + "px";
    });
}

// =====================
// Hamburger Menu
// =====================

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-label", isOpen ? "بستن منو" : "باز کردن منو");
});

mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        hamburger.classList.remove("is-open");
        hamburger.setAttribute("aria-label", "باز کردن منو");
    });
});

document.addEventListener("click", e => {
    if (
        mobileMenu.classList.contains("is-open") &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
    ) {
        mobileMenu.classList.remove("is-open");
        hamburger.classList.remove("is-open");
        hamburger.setAttribute("aria-label", "باز کردن منو");
    }
});

// =====================
// Projects
// =====================

const projects = [
    {
        title: "WindingViz",
        description: "ابزار بصری‌سازی و نمایش سیم‌پیچی موتورهای الکتریکی",
        icon: "⚡",
        github: "https://github.com/AmirhosseinR9/WindingViz",
        tags: ["Python", "Electrical"]
    },
    {
        title: "Sales Dashboard",
        description: "داشبورد تحلیل فروش و نمایش داده‌ها",
        icon: "📊",
        github: "https://github.com/AmirhosseinR9/SalesDashboard",
        tags: ["Python", "Dashboard"]
    }
];

const projectContainer = document.getElementById("projects-container");

projects.forEach((project, i) => {
    projectContainer.innerHTML += `
    <a href="${project.github}"
       target="_blank"
       class="project-card"
       data-aos="fade-up"
       data-aos-delay="${i * 120}">
        <div class="project-image">
            ${project.icon}
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
        </div>
    </a>
    `;
});

// =====================
// Canvas Background
// =====================

const canvas = document.getElementById("canvas-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

for(let i = 0; i < 80; i++){
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4
    });
}

function getParticleColor(){
    return getComputedStyle(document.documentElement)
        .getPropertyValue("--particle-color")
        .trim() || "#00d4ff";
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particleColor = getParticleColor();

    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if(p.x < 0 || p.x > canvas.width)  p.dx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
