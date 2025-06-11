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

function updateVisibleCards() {
    cards.forEach((card, i) => {
        card.classList.remove("visible");
        if (i - 1 >= index && i <= index + visibleCount) {
            card.classList.add("visible");
        }
    });
}

function loopSlide(direction) {
    if (direction === "next") {
        const first = cards.shift();
        cards.push(first);
        track.appendChild(first);
    } else {
        const last = cards.pop();
        cards.unshift(last);
        track.insertBefore(last, track.firstChild);
    }
    updateVisibleCards();
}

document.querySelector(".carousel__btn.right").addEventListener("click", () => {
    loopSlide("next");
});

document.querySelector(".carousel__btn.left").addEventListener("click", () => {
    loopSlide("prev");
});

updateVisibleCards();