// Создание карточки
class Card extends NewElement {
    constructor(props) {
        super();
        this._imageLink = props.link;
        this._imageName = props.name;
        this._remove = this._remove.bind(this);
    }

    // шаблон разметки для новой карточки
    get template() {
        return `
		<div class="place-card">
			<div class="place-card__image" style="background-image: url(${this._imageLink});">
				<button class="place-card__delete-icon"></button>
			</div>
			<div class="place-card__description">
				<h3 class="place-card__name">${this._imageName}</h3>
				<button class="place-card__like-icon"></button>
			</div>
		</div>
		`.trim()
    }

    // удаление карточки
    _remove() {
        this.removeEventList();
        this.element.remove();
    }

    // отметка лайк
    _like() {
        this.classList.toggle("place-card__like-icon_liked");
    }

    // установка слушателей
    setEventList() {
        this.element.querySelector('.place-card__delete-icon').addEventListener('click', this._remove);
        this.element.querySelector('.place-card__like-icon').addEventListener('click', this._like);
        this.element.querySelector('.place-card__image').addEventListener('click', this.initCallBack);
    }

    // удаление слушателей 
    removeEventList() {
        this.element.querySelector('.place-card__delete-icon').removeEventListener('click', this._remove);
        this.element.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
        this.element.querySelector('.place-card__image').removeEventListener('click', this.initCallBack);
    }

}