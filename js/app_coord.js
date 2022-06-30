console.log("Слайдер Выбор мебели Версия 2.0");
//const coordDemo = document.querySelector(".coord-demo"); // позже - удалить

let pictureBlock = document.querySelector(".model-selection__show-area"); // окно с картинками
let pictureBlockRect = pictureBlock.getBoundingClientRect(); // тек.координаты окна с картинками
let widthPictureBlock = pictureBlock.clientWidth; // тек.ширина окна с картинками
const stylePictureBlock = getComputedStyle(pictureBlock); // стили окна с картинками
let gapPictureBlock = parseInt(
    stylePictureBlock.getPropertyValue("column-gap")
); // внутренний гап
let widthModelItem = document.querySelector(
    ".model-selection__show-block"
).clientWidth; // тек. ширина блоков промотки = тек.ширина одной колонки

let showBlock = document.querySelectorAll(".model-selection__show-block");
const deleteClassShowBlock = "none-show-block";

const itemBarModels = document.querySelectorAll(".model-selection__item-bar");
const visibleItemBar = "visible-item-bar";
const hiddenItemBar = "hidden-item-bar";

// вычисляем кол-во столбцов (при условии что gap меньше ширины эл-та)
let numberOfColums = Math.trunc(widthPictureBlock / widthModelItem);

// объявляем массив с картинками
const ArrayPictures = document.querySelectorAll(
    ".model-selection__picture-item"
);
const maxLengthArray = ArrayPictures.length;
let indexArrayХ = 0;
let indexArrayY = 0;

let timeOutChangeWindow = true; // берем/отменяем тайм-аут на изменение параметров после ресайза экрана

rewriteElementsArray(); // первый раз заполняем 2-мерный массив show

checkNumItemBar(); // первый вызов контроля кол-ва кнопок навигации

/* Вычисление координат блока и др. параметров при изменении размеров окна, перезапись массива show */
window.addEventListener("resize", checkResizeWind);

pictureBlock.addEventListener("mousemove", function (event) {
    let relX = event.pageX - pictureBlockRect.left;
    let relY = event.pageY - pictureBlockRect.top;

    let cursorInBlock = Math.ceil((relX / widthPictureBlock) * numberOfColums);
    if (cursorInBlock == 0) {
        cursorInBlock = 1;
    }
    initItemBar(cursorInBlock);

    /*    coordDemo.textContent = `
        relX: ${relX}, absX: ${event.pageX}
        relY: ${relY}, absY: ${event.pageY}
        window: ${window.innerWidth}
        widthPictureBlock: ${widthPictureBlock}
        widthModelItem: ${widthModelItem}
        курсор в блоке № : ${cursorInBlock} 
        кол-во столб.: ${numberOfColums}
        `;*/
});

//  Б Л О К   Ф У Н К Ц И Й

function rewriteElementsArray() {
    showBlock.length = 0; // очистка предыдущего массива
    for (indexArrayY = 0; indexArrayY < numberOfColums; indexArrayY++) {
        for (
            indexArrayХ = indexArrayY;
            indexArrayХ < maxLengthArray;
            indexArrayХ += numberOfColums
        ) {
            showBlock[indexArrayY].append(ArrayPictures[indexArrayХ]);
        }
    }
}

function checkResizeWind() {
    if (timeOutChangeWindow) {
        timeOutChangeWindow = false; // начинаем цикл расчета новых параметров

        //БЛОК ПЕРЕОПРЕДЕЛЕНИЯ ПАРАМЕТРОВ ОКНА ПРОСМОТРА МОДЕЛЕЙ
        let oldwidthPictureBlock = widthPictureBlock; // предыдущий размер окна с картинками
        let oldNumberOfColums = numberOfColums;
        
        pictureBlockRect = pictureBlock.getBoundingClientRect();
        widthPictureBlock = pictureBlock.clientWidth;
        widthModelItem = document.querySelector(
            ".model-selection__show-block"
        ).clientWidth;
        numberOfColums = Math.trunc(widthPictureBlock / widthModelItem);

        // ПЕРЕЗАПИСЬ МАССИВА SHOW
        rewriteElementsArray();

        //БЛОК РЕГУЛИРОВАНИЯ КОЛ-ВА СТОЛБЦОВ ПОКАЗА
        if (oldwidthPictureBlock > widthPictureBlock) {
            // скрытие лишних блоков show (с конца)
            for (let i = oldNumberOfColums - 1; i < numberOfColums - 1; i--) {
                showBlock[i].classList.add(deleteClassShowBlock);
            }
        } else {
            // отображение скрытых блоков show
            for (let i = numberOfColums; i == 3; i++) {
                showBlock[i].classList.remove(deleteClassShowBlock);
            }
        }
        // скрытие/показ кнопок навигации окна картинок
        checkNumItemBar();
        timeOutChangeWindow = true; // расчеты параметров закончены
    }
}

function checkNumItemBar() {
    // предварительное удаление кнопок
    itemBarModels.forEach((item) => {
        item.classList.add(hiddenItemBar);
    });
    for (let i = 0; i < numberOfColums; i++) {
        itemBarModels[i].classList.remove(hiddenItemBar);
    }
    initItemBar(1); //всегда устанавливаем на первую
}

function initItemBar(cur) {
    // предварительная очистка свойства visible у кнопок
    itemBarModels.forEach((item) => {
        item.classList.remove(visibleItemBar);
    });
    // добавление visible кнопки
    itemBarModels[cur - 1].classList.add(visibleItemBar);
}
