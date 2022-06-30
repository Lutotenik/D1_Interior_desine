// Реакция на клик на logo (верхний и нижний)

const logoLink = document.querySelectorAll(".logo-link__outside-pig");
const logoLinkUp = logoLink[0];
const logoLinkDown = logoLink[1];

const circlePig = document.querySelectorAll(".logo-link__inside-pig"); // внутр. кружок, появляется/пропадает при клике на logo
const circlePigUp = circlePig[0];
const circlePigDown = circlePig[1];

const visibleClassLogo = "circle-visible"; // для управления визуализацией кружка (см. CSS)

// Т.к. у нас два типовых логотипа и два внутр.кружка, заводим слушателя на каждый
logoLinkUp.addEventListener("click", performOnClickUp);
logoLinkDown.addEventListener("click", performOnClickDown);

circlePigUp.addEventListener("click", performOnClickUp);
circlePigDown.addEventListener("click", performOnClickDown);

function performOnClickUp() {
    if (circlePigUp.classList.contains(visibleClassLogo)) {
        circlePigUp.classList.remove(visibleClassLogo);
        console.log("удалил верхний кружок в performOnClickUp");
    } else {
        circlePigUp.classList.add(visibleClassLogo);
        console.log("добавил верхний кружок в performOnClickUp");
        if (circlePigDown.classList.contains(visibleClassLogo)) {
            circlePigDown.classList.remove(visibleClassLogo);
        }
    }
}

function performOnClickDown() {
    if (circlePigDown.classList.contains(visibleClassLogo)) {
        circlePigDown.classList.remove(visibleClassLogo);
        console.log("удалил нижний кружок в performOnClickDown");
    } else {
        circlePigDown.classList.add(visibleClassLogo);
        console.log("добавил нижний кружок в performOnClickDownы");
        if (circlePigUp.classList.contains(visibleClassLogo)) {
            circlePigUp.classList.remove(visibleClassLogo);
        }
    }
}
