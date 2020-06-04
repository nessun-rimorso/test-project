// скрытие/раскрытия кнопок по клику

const menuItems = Array.from(document.querySelectorAll('.options__item'));
const menuList = document.querySelector('.options__list');

menuList.addEventListener('click', clickMenuItem);

function clickMenuItem(event) {
    let { target: el } = event;
    if (el.classList.contains('options__title')) {
        const menuItem = el.closest('.options__item');
        menuItem.classList.toggle('options__item--active');
        const othersItems = menuItems.filter((item) => item !== menuItem);
        othersItems.forEach((item) => item.classList.remove('options__item--active'));
    }
}

// кнопка очистки input

const form = document.getElementById('form');

form.addEventListener('click', cleanInput);

function cleanInput(event) {
    const { target } = event;
    const button = target.closest('.input__btn-clean');
    if (button) {
        // event.preventDefault();
        console.log(button);
        const inputContainer = button.closest('.form__input');
        const input = inputContainer.querySelector('input');
        const { value: valueInput } = input;
        if (valueInput.length !== 0) input.value = '';
    }
}
