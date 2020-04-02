// Получение и отрисовка данных пользователя
'use strict'
import NewElement from './newElement.js';

export default class UserInfo extends NewElement {
    constructor(container, api) {
      super();
      this.name = container.querySelector(".user-info__name");
      this.about = container.querySelector(".user-info__job");
      this.avatar = container.querySelector(".user-info__photo");
      this.api = api;
    }
  
    getUserInfo(path) {
      this.api
        .get(path)
        .then(user => {
          this.name.textContent = user.name;
          this.about.textContent = user.about;
          this.avatar.style.backgroundImage = `url(${user.avatar})`;
        })
        .finally((data) => {
          console.log(data);
        })
    }
  }