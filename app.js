// Array with objects, containing images
const buttonsArray = [
  {
    name: 'hand',
    img: '1.svg',
  },
  {
    name: 'turtle',
    img: '1.svg',
  },
  {
    name: 'drum',
    img: '1.svg',
  },
  {
    name: 'arrow',
    img: '1.svg',
  },
  {
    name: 'bird',
    img: '1.svg',
  },
  {
    name: 'circle',
    img: '1.svg',
  },
  {
    name: 'lizard',
    img: '1.svg',
  },
  {
    name: 'eagle',
    img: '1.svg',
  }
];

// Id "game" is targeted in HTML, that's the place where the game will be created
const game = document.getElementById('game');
// Section with cards class is added
const cards = document.createElement('section');
cards.setAttribute('class', 'cards');
game.appendChild(cards);

//@description: Function starting the game
document.body.onload = gameStart();

function gameStart() {
  // Loopes over array and adds divs with classes "button", "front" and "button_image"
  buttonsArray.forEach(item => {
    //div with class button and data-name
    const button = document.createElement('div');
    button.classList.add('button');
    button.dataset.name = item.name;

    //div with class front
    const front = document.createElement('div');
    front.classList.add('front')

    //div with class button_image containing images
    const buttonImage = document.createElement('div');
    buttonImage.classList.add('button_image');
    buttonImage.style.backgroundImage = `url(${item.img})`;

    //appends created divs in the right order
    cards.appendChild(button);
    button.appendChild(front);
    button.appendChild(buttonImage);
  });
}
