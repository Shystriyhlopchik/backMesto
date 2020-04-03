// popup всплывающей фотки
class PopupImage extends Popup {
  constructor(imgUrl) {
    super();
    this._imgUrl = imgUrl;
  }

  // разметка для popup
  get template() {
    return `
      <div class="popup" id="photo-popup">
        <div class="popup__photo">
          <img src="./images/close.svg" alt="" class="popup__close" />
          <img src="${this._imgUrl}" alt="" class="popup__img" />
        </img>
      </div>
    </div> `.trim();
  }
}