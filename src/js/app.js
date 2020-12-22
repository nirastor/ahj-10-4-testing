class App {
  init() {
    this.button = document.querySelector('.validator-button');
    this.form = document.querySelector('.validator-form');
    this.input = document.querySelector('.validator-input');
    this.message = document.querySelector('.validator-message');
    this.picture = document.querySelector('.validator-pic');
    this.cardsURL = {
      2: './src/img/mir.png',
      30: './src/img/diners.png',
      36: './src/img/diners.png',
      38: './src/img/diners.png',
      31: './src/img/jsb.png',
      35: './src/img/jsb.png',
      34: './src/img/ae.png',
      37: './src/img/ae.png',
      4: '../src/img/visa.png',
      50: './src/img/maestro.png',
      56: './src/img/maestro.png',
      57: './src/img/maestro.png',
      58: './src/img/maestro.png',
      51: './src/img/mastercard.png',
      52: './src/img/mastercard.png',
      53: './src/img/mastercard.png',
      54: './src/img/mastercard.png',
      55: './src/img/mastercard.png',
      60: './src/img/discover.png',
      62: './src/img/union.png',
      63: './src/img/maestro.png',
      67: './src/img/maestro.png',
      7: './src/img/uek.png',
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
    const isValid = App.checkCardNumber(text);
    if (isValid) {
      this.showOkMessage();
      this.showCardPicture(text);
    } else {
      this.showErrorMessage();
    }
  }

  static checkCardNumber(text) {
    const hasLetters = text.match(/[^\d\s]/i);
    if (hasLetters) {
      return false;
    }

    const digits = text.replace(/\s/g, '').split('').map((item) => Number(item));
    if (digits.length < 13) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < digits.length; i += 1) {
      let digit = digits[i];
      if ((digits.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }

    return sum % 10 === 0;
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
    const noSpacedText = text.replace(/\s/g, '');
    let cardSystemCode = noSpacedText.charAt(0);
    if (cardSystemCode === '3' || cardSystemCode === '5' || cardSystemCode === '6') {
      cardSystemCode += noSpacedText.charAt(1);
    }
    this.picture.style.backgroundImage = `Url('${this.cardsURL[cardSystemCode]}')`;
  }

  hideCardPicture() {
    this.picture.style.backgroundImage = 'none';
  }
}

const app = new App();
app.init();
