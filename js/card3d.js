class Card3d {
  constructor(...elements) {
    this.elements = elements.flat()
  }
}

const cards = new Card3d(document.querySelectorAll('#portfolio .projects'))
