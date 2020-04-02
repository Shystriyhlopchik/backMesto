'use strict'
//--------------Создание элементов на странице---------
export default class NewElement {
    constructor() {
        this.element = null;
        this.container = document.querySelector('.root');
        this.initCallBack = this.initCallBack.bind(this);
    }

    //--------------создание разметки------------------
    create(markup) {
        const createNewTag = document.createElement('div');
        createNewTag.insertAdjacentHTML('beforeend', markup);
        return createNewTag.firstChild;
    }

    //-------------добавление разметки в документ------
    render() {
        this.element = this.create(this.template);
        this.setEventList();
        return this.element;
    }

    //-------------метод для вызова колбэка------------
    anotherClassCall(fn) {
        this._callBack = fn;
    }

    //-------------проверка колбэка на вшивость и вызов
    initCallBack(item) {
        return typeof this._callBack === 'function' && this._callBack(item);
    }
}
