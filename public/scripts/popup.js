//Родительский класс для создания всплывающих окон
'use strict'
import NewElement from './newElement.js';

export default class Popup extends NewElement {
  constructor() {
    super();
  }

  //-------------открытие окна-----------------
  open() {
    this.container.appendChild(this.render());
    this.element.classList.add('popup_is-opened');
  }

  //-------------закрытие окна-----------------
  close() {
    this.element.classList.remove('popup_is-opened');
    this.removeEventList();
    this.element.remove();
  }

  //----------установка слушателей-------------
  setEventList() {
    this.element.querySelector('.popup__close')
      .addEventListener("click", () => this.close());
  }

  //----------удаление слушателей--------------
  removeEventList() {
    this.element.querySelector('.popup__close')
      .removeEventListener("click", () => this.close());
  }
}