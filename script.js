// =====================
// Theme Toggle
// =====================

(function(){
    const saved = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
})();

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);

    // Update canvas particle color immediately
    particleColor = next === "light" ? "#D97706" : "#00d4ff";
});

// =====================
// Profile Image Protection
// =====================

const profileImg = document.querySelector(".profile img");

if (profileImg) {
    // Disable right-click context menu
    profileImg.addEventListener("contextmenu", e => e.preventDefault());

    // Disable drag-and-drop
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

const words = [
    "سازنده فناوری و نرم‌افزار",
    "دانش‌آموز الکتروتکنیک",
    "توسعه‌دهنده با رویکرد مهندسی",
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
// Counter
// =====================

const counters = document.querySelectorAll(".counter");

counters.forEach(counter=>{

    const target = +counter.dataset.target;
    let count = 0;

    const updateCounter = ()=>{
        const increment = Math.ceil(target/60);
        count += increment;

        if(count >= target){
            counter.innerText = target;
            return;
        }

        counter.innerText = count;
        requestAnimationFrame(updateCounter);
    };

    updateCounter();
});

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
// Hamburger Menu — NEW
// =====================

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-label", isOpen ? "بستن منو" : "باز کردن منو");
});

// Close mobile menu when any link inside it is clicked
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        hamburger.classList.remove("is-open");
        hamburger.setAttribute("aria-label", "باز کردن منو");
    });
});

// Close mobile menu on outside click
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
                ${project.tags.map(tag => `
                <span class="tag">${tag}</span>
                `).join("")}
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

// Dynamic particle color based on active theme
let particleColor = document.documentElement.getAttribute("data-theme") === "light"
    ? "#D97706"
    : "#00d4ff";

for(let i=0; i<80; i++){
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random()*2,
        dx: (Math.random()-0.5) * 0.4,
        dy: (Math.random()-0.5) * 0.4
    });
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p=>{
        p.x += p.dx;
        p.y += p.dy;

        if(p.x < 0 || p.x > canvas.width){
            p.dx *= -1;
        }
        if(p.y < 0 || p.y > canvas.height){
            p.dy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
        ctx.fillStyle = particleColor;
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
