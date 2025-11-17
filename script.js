/** @format */

// target date: 26 Jan 2025 17:00 local time
const target = new Date("2025-01-26T17:00:00");

function pad(n) {
    return String(n).padStart(2, "0");
}
function updateCountdown() {
    const now = new Date();
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);
    const secs = Math.floor(diff / 1000);
    document.getElementById("days").textContent = pad(days);
    document.getElementById("hours").textContent = pad(hours);
    document.getElementById("mins").textContent = pad(mins);
    document.getElementById("secs").textContent = pad(secs);
}
setInterval(updateCountdown, 1000);
updateCountdown();

// GSAP entrance animations
window.addEventListener("load", () => {
    if (window.gsap) {
        const tl = gsap.timeline();
        tl.from(".logo", { y: -20, opacity: 0, duration: 0.6 })
            .from(
                ".title span",
                { y: 30, opacity: 0, stagger: 0.12, duration: 0.8 },
                "-=.3"
            )
            .from(".subtitle", { y: 10, opacity: 0, duration: 0.6 }, "-=.4")
            .from(
                ".countdown div",
                { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 },
                "-=.3"
            )
            .from(
                ".cta .btn",
                { scale: 0.96, opacity: 0, stagger: 0.08, duration: 0.4 },
                "-=.3"
            );
    }
});

// Simple RSVP persistence
const form = document.getElementById("rsvpForm");
const nameInput = document.getElementById("name");
const attend = document.getElementById("attend");
const note = document.getElementById("note");
const message = document.getElementById("formMessage");

function loadSaved() {
    try {
        const saved = JSON.parse(localStorage.getItem("rsvp"));
        if (saved) {
            nameInput.value = saved.name || "";
            attend.value = saved.attend || "";
            note.value = saved.note || "";
            message.textContent =
                "Найдено ранее отправленное подтверждение (локально).";
        }
    } catch (e) {}
}
loadSaved();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!nameInput.value || !attend.value) {
        message.textContent = "Введите имя и выберите ответ.";
        return;
    }
    const payload = {
        name: nameInput.value.trim(),
        attend: attend.value,
        note: note.value.trim(),
        ts: Date.now(),
    };
    localStorage.setItem("rsvp", JSON.stringify(payload));
    message.textContent = "Спасибо! Ваш ответ сохранён (локально).";
    // Если нужен сервер — замените этот участок на fetch POST к вашему API.
});
document.getElementById("clear").addEventListener("click", () => {
    localStorage.removeItem("rsvp");
    nameInput.value = attend.value = note.value = "";
    message.textContent = "Форма очищена.";
});
