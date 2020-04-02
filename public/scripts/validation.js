export default class Validation {

    constructor() {
        this.firstFormField = null;
        this.secondFormField = null;
    }

    //-------------проверка условий валидации-----------------
    isValid(elementToCheck) {
        const errorElement = document.querySelector(`#error-${elementToCheck.name}`);
        if (!elementToCheck.validity.valid) {
            if (
                elementToCheck.value.length <=
                    Number(elementToCheck.getAttribute("minlength")) ||
                elementToCheck.value.length >=
                    Number(elementToCheck.getAttribute("maxlength"))
            ) {
                if (elementToCheck.validity.valueMissing) {
                    errorElement.textContent = "Это обязательное поле";
                } else {
                    errorElement.textContent = "Длина должна быть от 2 до 20 символов";
                }
                if (elementToCheck.validity.typeMismatch) {
                    errorElement.textContent = "Здесь должна быть ссылка";
                }
            }
            return false;
        } else {
            errorElement.textContent = "";
            return true;
        }
    }

    //-----проверка успеха валидации и контроль кнопки отправки данных----------
    formInputHandler(event) {
        const validRes = this.isValid(document
            .querySelector('form').elements[`${event.target.name}`]);
        if (event.target.name === 'name') {
            this.firstFormField = validRes;
        }
        if (event.target.name === 'link') {
            this.secondFormField = validRes;
        }
        if (event.target.name === 'username') {
            this.secondFormField = true;
            this.firstFormField = validRes;
        }
        if (event.target.name === 'userdesc') {
            this.firstFormField = true;
            this.secondFormField = validRes;
        }
        if (this.firstFormField && this.secondFormField) {
            this.enableButton(event);
        } else {
            this.disableButton(event);
        }
    }

    //-----очистка полей при отправке данных или закрытии формы ----
    clearFields() {
        this.firstFormField = null;
        this.secondFormField = null;
    }

    //----функция для отключения кнопки submit в обеих формах----
    disableButton() {
        const button = event.currentTarget.querySelector("button");
        button.setAttribute("disabled", true);
        button.classList.remove("popup__button_type_en");
    }

    //----функция для включения кнопки submit в обеих формах----
    enableButton() {
        const button = event.currentTarget.querySelector("button");
        button.removeAttribute("disabled");
        button.classList.add("popup__button_type_en");
    }
}