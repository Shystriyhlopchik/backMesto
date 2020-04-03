// Создание всплывающего окна с формами
class PopupForm extends Popup {
    constructor(props, validation, api) {
        super();
        this._popupId = props.id;
        this._title = props.title;
        this._formName = props.formName;
        this._firstFormFieldType = props.firstFormFieldType;
        this._firstFormFieldName = props.firstFormFieldName;
        this._firstFormFieldPlaceholder = props.firstFormFieldPlaceholder;
        this._secondFormFieldType = props.secondFieldType;
        this._secondFormFieldName = props.secondFieldName;
        this._secondFormFieldPlaceholder = props.secondFormFieldPlaceholder;
        this._buttonName = props.buttonName;
        this._buttonText = props.buttonText;
        this.path = props.path;
        this._validation = validation;
        this.api = api;

    }

    // шаблон разметки всплывающего окна с формой
    get template() {
        return `
          <div class="popup" id="${this._popupId}">
          <div class="popup__content">
            <img src="./images/close.svg" alt="" class="popup__close" />
            <h3 class="popup__title">${this._title}</h3>
            <form class="popup__form" name="${this._formName}">
              <input type="${this._firstFormFieldType}" name="${this._firstFormFieldName}" class="popup__input" placeholder="${this._firstFormFieldPlaceholder}" minlength="2" maxlength="20" autocomplete="off" required/>
              <span data-for-element="${this._firstFormFieldName}" class="form__error-message" id="error-${this._firstFormFieldName}"></span>
              <input type="${this._secondFormFieldType}" name="${this._secondFormFieldName}" class="popup__input" placeholder="${this._secondFormFieldPlaceholder}" autocomplete="off" required/>
              <span data-for-element="${this._secondFormFieldName}" class="form__error-message" id="error-${this._secondFormFieldName}"></span>
              <button type="submit" name="${this._buttonName}" class="button popup__button popup__button_type_en">${this._buttonText}</button>
            </form>
          </div>
      </div> `.trim();
    }

    // открытие формы
    open() {
        super.open();
        if (this._popupId === 'new-card') {
            this.element.querySelector('button').setAttribute('disabled', true);
            this.element.querySelector('button').classList.remove('popup__button_type_en');
        }

        if (this._popupId === 'edit-profile') {
            const secondField = this.getFormEl(this._secondFormFieldName);
            const firstField = this.getFormEl(this._firstFormFieldName);
            firstField.value = document.querySelector(".user-info__name").textContent;
            secondField.value = document.querySelector(".user-info__job").textContent;
            secondField.setAttribute('minlength', '2');
            secondField.setAttribute('maxlength', '20');
        }
    }

    // закрытие формы
    close() {
        super.close();
        this._validation.clearFields();
    }

    // отправка данных формы
    submit(path, event) {
        event.preventDefault();

        const fields = this.element.querySelector('form').elements;

        // редактирование профиля
        if (this._popupId === 'edit-profile') {
            this.api
                .updateInfo(path, fields)
                .then(res => {
                    document.querySelector(".user-info__name").textContent = res.name;
                    document.querySelector(".user-info__job").textContent = res.about;
                })
        }

        // создание новой карточки
        if (this._popupId === 'new-card') {
            this.api
                .postCard(path, fields)
                .then(res => {
                    const onFilled = {
                        name: res.name,
                        link: res.link
                    };
                    this.initCallBack(onFilled);
                })
        }
        this.close();
    }

    // установка слушателей 
    setEventList() {
        super.setEventList();
        this.getFormEl(this._buttonName)
            .addEventListener('click', () => {
                this.submit(this.path, event)
            });
        this.element.querySelector('form')
            .addEventListener('input', () => {
                this._validation.formInputHandler(event)
            });
    }

    // удаление слушаталей
    removeEventList() {
        super.removeEventList();
        this.getFormEl(this._buttonName)
            .removeEventListener('click', () => {
                this.submit(this.path, event)
            });
        this.element.querySelector('form')
            .removeEventListener('input', () => {
                this._validation.formInputHandler(event)
            });
    }

    // уточняем какая форма
    getFormEl(el) {
        return this.element.querySelector('form').elements[`${el}`];
    }
}