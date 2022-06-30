// Реакция на клик на гамбургер: вариант через добавл/удал класса
// класс прописываем в CSS

const burgerClick = document.querySelector("#idBurgerIcon"); // положили бургер-иконку в константу
const burgerItem = document.querySelectorAll(".burger-icon__item"); // массив с кнопками
const mainMenu = document.querySelector(".nav-top-bar"); // положили главное меню в константу
let visibleClass = "menu_visible"; // заводим переменную для имени нового класса и помещаем в нее название класса, для управления визуализацией бокового меню (см. CSS)

burgerClick.addEventListener("click", () => {
    //    if (mainMenuGrid.style.opacity == 0) {
    if (mainMenu.classList.contains("menu_visible")) {
        console.log(
            "Есть визибл-класс уже?: " +
                mainMenu.classList.contains("menu_visible")
        );
        // удаляем новый класс из элемента Главное меню, чтобы его скрыть
        mainMenu.classList.remove(visibleClass);
        // перекрашиваем бургер в темный цвет
        burgerItem.forEach((element) => {
            element.style.background = "#353535";
        });
    } else {
        console.log(
            "Еще нет визибл-класса?: " +
                mainMenu.classList.contains("menu_visible")
        );
        // добавляем новый класс к элементу Главное меню, чтобы его отобразить - см. CSS перед первым описанием nav-top-bar
        mainMenu.classList.add(visibleClass);
            // перекрашиваем бургер в белый цвет
            burgerItem.forEach((element) => {
                element.style.background = "#ffff";
            });
    }
});
