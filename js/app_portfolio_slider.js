// СЛАЙДЕР
console.log("Портфолио слайдер Версия 2.0");
// корневая оболочка слайдера
const maxNumSlides = 4; // макс.кол-во слайдов в окне
const sliderPortfolio = document.querySelector(".portfolio-slider");

// это контейнер, в котором массив с портфолио
const portfolioContainer = document.querySelector(".portfolio-content");

// МАССИВ С ПОРТФОЛИО и его параметры
const portfolioArray = document.querySelectorAll(".portfolio-content__item");
const portfolioLength = portfolioArray.length; // длина массива с портфолио

let stylePortfolioArray = getComputedStyle(portfolioArray[0]); // стили одного слайда
// мин.ширина одного слайда
const minWidthSlide = parseInt(
    stylePortfolioArray.getPropertyValue("min-width")
);

// правый отступ слайда
const marginRightSlide = parseInt(
    stylePortfolioArray.getPropertyValue("margin-right")
);

// ОБЪЯВЛЕНИЕ ОСНОВНЫХ ПЕРЕМЕННЫХ

let timeOutChangSizeWindow = true; // берем/отменяем тайм-аут на изменение параметров после ресайза экрана

// тек.ширина слайдера в пикселях
let widthSliderPortfolio = 0;
// тек.кол-во доступных секций в слайдере
let slidesToShow = 0;
// кол-во слайдов за пределами окна просмотра
let numHiddenSlides = 0;
let deltaAddWidthSlide = 0; // дельта к ширине каждого слайда
// тек.ширина одного эл-та портфолио
let slideWidth = 0;
// шаг слайдера при прокрутке
let stepSlider = 0;
let positionPortfolioContainer = 0; // тек. положение контейнера с массивом слайдов внутри слайдера (для кнопок управления)
let lastShowNumberArray = 0; // конеч.положение контейнера с массивом слайдов внутри слайдера (для кнопок управления)
let countStepsInPortfolioSlaider = 0; //кол-во шагов сделанное в слайдере (учитывая направление)

// КНОПKИ УПРАВЛЕНИЯ
const buttonPrev = document.querySelector(".button-slider__prev");

const buttonNext = document.querySelector(".button-slider__next");

initParam();
checkButtons();
initSlider();

window.addEventListener("resize", checkResize); // пересчет параметров

//  Б Л О К   Ф У Н К Ц И Й

function initParam() {
    stylePortfolioArray = getComputedStyle(portfolioArray[0]);
    // ширина окна слайдера
    widthSliderPortfolio = sliderPortfolio.clientWidth;
    // тек.кол-во доступных секций в слайдере
    slidesToShow = Math.trunc(
        (widthSliderPortfolio + marginRightSlide) /
            (minWidthSlide + marginRightSlide)
    );
    if (slidesToShow == 0) {
        slidesToShow = 1;
    }
    // кол-во секций за пределами окна просмотра
    numHiddenSlides = maxNumSlides - slidesToShow;
    deltaAddWidthSlide =
        (widthSliderPortfolio +
            marginRightSlide -
            slidesToShow * (minWidthSlide + marginRightSlide)) /
        slidesToShow; // дельта к ширине каждого слайда
    // тек.ширина одного эл-та портфолио
    slideWidth = minWidthSlide + deltaAddWidthSlide; // тек.ширина одного слайда

    // ЦИКЛ установки каждому э-ту портфолио ширины в соотв. с размерами окна

    portfolioArray.forEach((item) => {
        item.style.width = `${slideWidth}px`;
    });

    // шаг слайдера при прокрутке
    stepSlider = slideWidth + marginRightSlide;
    positionPortfolioContainer = 0; // тек. положение контейнера с массивом слайдов внутри слайдера (для кнопок управления)
    lastShowNumberArray = portfolioLength - slidesToShow; // конеч.положение контейнера с массивом слайдов внутри слайдера (для кнопок управления)

    /* Контрольная панель */
/*    console.log("тек ширина слайдера:" + widthSliderPortfolio);
    console.log("мин ширина слайда:" + minWidthSlide);
   
    console.log(
        "тек ширина слайда:" + slideWidth,
        "  (" + stylePortfolioArray.getPropertyValue("width") + ")"
    );
    console.log("правый маржин:" + marginRightSlide);
    console.log("шаг слайда:" + stepSlider);

    console.log("кол-во слайдов в слайдере: " + slidesToShow);
    console.log("кол-во слайдов за пределами слайдера: " + numHiddenSlides);
    console.log("дельта: " + deltaAddWidthSlide);*/
}

function checkResize() {
    if (timeOutChangSizeWindow) {
        timeOutChangSizeWindow = false; // начинаем цикл расчета новых параметров
        initParam();
        // переразмещение контейнера со слайдами относит.слайдера
        countStepsInPortfolioSlaider = 0;
        portfolioContainer.style.transform = `translate(${countStepsInPortfolioSlaider}px)`;

        // скрытие/показ кнопок навигации
        checkButtons();

        timeOutChangSizeWindow = true; // расчеты параметров закончены
    }
}

// контроль за порядковым номером выбранного эл-та портфолио для визуализации кнопок/стрелок перемещения по слайдеру
function checkButtons() {
    // управляем видимостью кнопки Prev
    if (positionPortfolioContainer == 0) {
        buttonPrev.setAttribute("disabled", true);
        buttonNext.removeAttribute("disabled");
    } else {
        buttonPrev.removeAttribute("disabled");
        buttonNext.removeAttribute("disabled");
    }

    if (positionPortfolioContainer == lastShowNumberArray) {
        buttonNext.setAttribute("disabled", true);
    }
}

function initSlider() {
    buttonPrev.addEventListener("click", () => {
        // значением является функция которая указана в {}
        positionPortfolioContainer--;
        countStepsInPortfolioSlaider++;
        portfolioContainer.style.transform = `translate(${
            stepSlider * countStepsInPortfolioSlaider
        }px)`;
        checkButtons();
    });

    buttonNext.addEventListener("click", () => {
        positionPortfolioContainer++;
        countStepsInPortfolioSlaider--;
        portfolioContainer.style.transform = `translate(${
            stepSlider * countStepsInPortfolioSlaider
        }px)`;
        checkButtons();
    });
}
