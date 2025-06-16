const birthDate = new Date(2004, 7, 2);

function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
        age--;
    }

    return age;
}

function updateAgeInPage() {
    const ageElement = document.querySelector('[data-age]');
    if (ageElement) {
        ageElement.textContent = calculateAge(birthDate);
    }
}

document.addEventListener("DOMContentLoaded", updateAgeInPage);

const track = document.querySelector(".carousel__track");
const cards = Array.from(track.children);
const visibleCount = 3;
let index = 0;
let isTransitioning = false;

function updateVisibleCards() {
    const cards = Array.from(track.children);
    const skillsQtd = track.childElementCount - 1;
    
    if (index > skillsQtd) index = -1;
    else if (index < -1) index = skillsQtd - 1;

    cards.forEach((card, i) => {
        card.classList.remove("visible");
        if (i - 1 >= index && i <= index + visibleCount) {
            card.classList.add("visible");
        }
    });
}

updateVisibleCards();

document.querySelector(".carousel__btn.right").addEventListener("click", () => {
    if (isTransitioning) return;
    isTransitioning = true;

    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = "translateX(-20.5%)";

    index = 1;
    updateVisibleCards();

    setTimeout(() => {
        track.appendChild(track.firstElementChild);
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        isTransitioning = false;
    }, 500);
});

document.querySelector(".carousel__btn.left").addEventListener("click", () => {
    if (isTransitioning) return;
    isTransitioning = true;

    track.insertBefore(track.lastElementChild, track.firstElementChild);
    track.style.transition = "none";
    track.style.transform = "translateX(-20.5%)";

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            track.style.transition = "transform 0.5s ease-in-out";
            track.style.transform = "translateX(0)";
        });
    });

    index = 0;
    updateVisibleCards();

    setTimeout(() => {
        isTransitioning = false;
    }, 500);
});