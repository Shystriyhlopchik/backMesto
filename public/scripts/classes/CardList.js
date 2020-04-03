// Создание листа карточек и добавление новой
class CardList extends NewElement {
    constructor(container, api) {
        super();
        this.container = container;
        this.api = api;
    }

    // добавление новой карточки
    addCard(item) {
        this.container.appendChild(this.initCallBack(item));
    }

    // добавление в блок всех карточек из массива
    renderList(path) {
        this.api
            .get(path)
            .then((cards) => {
                cards.forEach(item => {
                    this.addCard(item);
                })
            })
            .finally((data) => {
                console.log(data);
            })
    }
}