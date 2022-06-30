document.addEventListener("DOMContentLoaded", () => {
    // родительский эл-т портфолио, на котором все сиждется. Здесь начало магии с получением целевого эл-та, на котором произошло то или иное событие
    const mainWithBackground = document.querySelector(".header");
    // это массив фоновых рисунков
    const backgroundPictures = document.querySelectorAll(
        ".header__background-picture"
    );
    // это массив кнопок-линеек (по кол-ву эл-ов == массиву фотографий)
    const linksButtomBar = document.querySelectorAll(".nav-bottom-bar__link");
    // создание переменной с именем класса для визуализации вообще любого блока (см.применение в CSS)
    const visibleClass = "visible";
    // номер последнего эл-та в массиве портфолио
    const lastNumberArray = backgroundPictures.length - 1;
    // задание новых атрибутов в тэгах <a> эл-ов портфолио, которые задают их нумерацию
    let indexAttrButtomBar = 0;
    linksButtomBar.forEach((item) => {
        item.setAttribute("element-number", indexAttrButtomBar++);
    });

    // активация первой кнопки-линейки при загрузке страницы
    let indexArrayBackgroundPictures = 0;
    let srcValue = ""; // путь расположения рисунка фона на диске

    linksButtomBar[indexArrayBackgroundPictures].classList.add(visibleClass);

    // создание слушателей событий для каждой кнопки nav-bottom-bar__link после клика.
    // Далее идет сохранение номера кнопки nav-bottom-bar - через свойство target интерфейса Event: event.target.

    linksButtomBar.forEach((item) => {
        item.addEventListener("click", (event) => {
            indexArrayBackgroundPictures =
                event.target.getAttribute("element-number");
            moveBackground();
        });
    });

    setInterval(() => {
        moveBackground();
        indexArrayBackgroundPictures++;
        if (indexArrayBackgroundPictures == backgroundPictures.length) {
            indexArrayBackgroundPictures = 0;
        }
    }, 3000);

    // Б Л О К   Ф У Н К Ц И Й

    function moveBackground() {
        srcValue =
            backgroundPictures[indexArrayBackgroundPictures].getAttribute(
                "src"
            );
        // предварительная очистка свойства visible у кнопок-линеек
        linksButtomBar.forEach((item) => {
            item.classList.remove(visibleClass);
        });
        // формирование и установка нового адреса фона в свойствах headera в CSS
        mainWithBackground.style.background = `center / cover no-repeat url(${srcValue})`;
        // добавление visible кнопки-линейки
        linksButtomBar[indexArrayBackgroundPictures].classList.add(
            visibleClass
        );
    }
});
