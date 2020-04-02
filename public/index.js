    'use strict'
    import './pages/index.css';

    import Api from './scripts/api.js';
    import CardList from './scripts/cardlist.js';
    import Card from './scripts/card.js';
    import PopupForm from './scripts/popup_form.js';
    import PopupImage from './scripts/popup_image.js';
    import UserInfo from './scripts/user_info.js';
    import Validation from './scripts/validation.js'

    // ---------------------------------- Свойства -----------------------------------------------------  //
    // Окно с формой новой карточки
    const newCardPopupProps = {
        id: 'new-card',
        title: 'Новое место',
        formName: 'new',
        firstFormFieldType: 'text',
        firstFormFieldName: 'name',
        secondFieldType: 'url',
        secondFieldName: 'link',
        firstFormFieldPlaceholder: 'Название',
        secondFormFieldPlaceholder: 'Ссылка на картинку',
        buttonName: 'submit',
        buttonText: '+',
        path: '/cards'
    }

    // Окно с формой редактирования профиля
    const editProfilePopupProps = {
        id: 'edit-profile',
        title: 'Редактирование профиля',
        formName: 'edit',
        firstFormFieldType: 'text',
        firstFormFieldName: 'username',
        secondFieldType: 'text',
        secondFieldName: 'userdesc',
        firstFormFieldPlaceholder: 'Имя',
        secondFormFieldPlaceholder: 'О себе',
        buttonName: 'submit',
        buttonText: 'Сохранить',
        path: '/users/me'
    }

    // Использование http/https в зависимости от режима сборки
const serverUrl =
NODE_ENV === "development"
  ? "http://praktikum.tk/cohort7"
  : "https://praktikum.tk/cohort7";

// Свойства API
const accessOptions = {
  url: serverUrl,
  headers: {
      authorization: "6d082133-b0ad-4109-8c98-309babe766d7",
      "Content-Type": "application/json"
  }
}

// ---------------------------------- Переменные -----------------------------------------------------  //

const addButton = document.querySelector(".user-info__button"); // кнопка открытия формы добавления карточки

const editButton = document.querySelector(".user-info__edit-button"); // кнопка открытия редактирования профиля

const placesList = document.querySelector(".places-list"); // блок для карточек

const userInfoBlock = document.querySelector(".user-info");

// ---------------------------------- Классы -----------------------------------------------------  //

const validation = new Validation(); // валидация

const api = new Api(accessOptions); // API

const userInfo = new UserInfo(userInfoBlock, api); // информация о пользователе 

const editProfilePopup = new PopupForm(editProfilePopupProps, validation, api); // форма редактирования профиля 

const newCardPopup = new PopupForm(newCardPopupProps, validation, api); // форма добавления карточки 

const cardListRender = new CardList(placesList, api); // рендер карточек 

// ---------------------------------- Коллбэки Классов ----------------------------------------------  //

// колбэк для метода addCard 
cardListRender.anotherClassCall((item) => {
    const card = new Card({
        name: item.name,
        link: item.link,
    });
    card.anotherClassCall(() => {
        const preview = new PopupImage(item.link);
        preview.open();
    })
    return card.render();
})

// колбэк добавления новой карточки в блок
newCardPopup.anotherClassCall((item) => {
    cardListRender.addCard(item);
})

// для загрузки страницы
const onLoad = () => {
    userInfo.getUserInfo("/users/me");
    cardListRender.renderList("/cards");
}

// ---------------------------------- Слушатели -----------------------------------------------------  //

addButton.addEventListener('click', () => newCardPopup.open()); // открытие формы добавления карточки
editButton.addEventListener('click', () => editProfilePopup.open()); // открытие формы редактирования профиля
window.addEventListener("load", onLoad()); // инициализация рендера