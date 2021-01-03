import checkCardNumber from './checkCardNumber';
import getPaySysytem from './getPaySysyem';

class App {
  init() {
    this.button = document.querySelector('.validator-button');
    this.form = document.querySelector('.validator-form');
    this.input = document.querySelector('.validator-input');
    this.message = document.querySelector('.validator-message');
    this.picture = document.querySelector('.validator-pic');
    this.cardsURL = {
      mir: '../src/img/mir.png',
      diners: '../src/img/diners.png',
      jcb: '../src/img/jcb.png',
      ae: '../src/img/ae.png',
      visa: '../src/img/visa.png',
      maestro: '../src/img/maestro.png',
      mastercard: '../src/img/mastercard.png',
      discover: '../src/img/discover.png',
      union: '../src/img/union.png',
      uek: '../src/img/uek.png',
    };
    this.initListeners();
  }

  initListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSubmit();
    });

    this.input.addEventListener('input', (e) => {
      e.preventDefault();
      this.hideMessage();
      this.hideCardPicture();
    });

    this.input.addEventListener('focus', (e) => {
      e.preventDefault();
      this.hideMessage();
      this.hideCardPicture();
    });
  }

  onSubmit() {
    const text = this.input.value;
    const isValid = checkCardNumber(text);
    if (isValid) {
      this.showOkMessage();
      this.showCardPicture(text);
    } else {
      this.showErrorMessage();
    }
  }

  showOkMessage() {
    this.message.innerText = 'Номер верный';
    this.message.style.color = '#2C5F1C';
    this.message.style.height = `${this.message.scrollHeight}px`;
  }

  showErrorMessage() {
    this.message.innerText = 'Ошибка в номере';
    this.message.style.color = '#E63946';
    this.message.style.height = `${this.message.scrollHeight}px`;
  }

  hideMessage() {
    this.message.style.height = 0;
  }

  showCardPicture(text) {
    this.picture.style.backgroundImage = `Url('${this.cardsURL[getPaySysytem(text)]}')`;
  }

  hideCardPicture() {
    this.picture.style.backgroundImage = 'none';
  }
}

const app = new App();
app.init();
