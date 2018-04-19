'use strict';

// Array with objects, containing images
var buttonsArray = [{
  name: 'hand',
  img: 'images/cards/1.svg'
}, {
  name: 'turtle',
  img: 'images/cards/2.svg'
}, {
  name: 'drum',
  img: 'images/cards/3.svg'
}, {
  name: 'arrow',
  img: 'images/cards/4.svg'
}, {
  name: 'bird',
  img: 'images/cards/5.svg'
}, {
  name: 'circle',
  img: 'images/cards/6.svg'
}, {
  name: 'lizard',
  img: 'images/cards/7.svg'
}, {
  name: 'eagle',
  img: 'images/cards/8.svg'
}];

// Id "game" is targeted in HTML, that's the place where the game will be created
var game = document.getElementById('game');
// Section with cards class is added
var cards = document.createElement('section');
cards.setAttribute('class', 'cards');
game.appendChild(cards);

//@description: Function starting the game
document.body.onload = gameStart();

function gameStart() {
  // Dublicates buttonsArray and makes one full viariable with 8 pairs of buttons
  var fullButtonsArray = buttonsArray.concat(buttonsArray);

  // Shuffles the created array
  fullButtonsArray.sort(function () {
    return 0.5 - Math.random();
  });

  // Loopes over array and adds divs with classes "button", "front" and "button_image"
  fullButtonsArray.forEach(function (item) {
    //div with class button and data-name
    var button = document.createElement('div');
    button.classList.add('button');
    button.dataset.name = item.name;

    //div with class front
    var front = document.createElement('div');
    front.classList.add('front');

    //div with class button_image containing images
    var buttonImage = document.createElement('div');
    buttonImage.classList.add('button_image');
    buttonImage.style.backgroundImage = 'url(' + item.img + ')';

    //appends created divs in the right order
    cards.appendChild(button);
    button.appendChild(front);
    button.appendChild(buttonImage);
  });
}

// variables for score icons (stars)
var starOne = document.getElementById('starOne');
var starTwo = document.getElementById('starTwo');

//variables for moves counter function
var movesNumber = 0;
var moves = document.querySelector('.moves');

//@description: counts moves, starts timer and applies stars-rate
function moveCounter() {
  movesNumber++;
  moves.innerHTML = movesNumber;

  //if it is the first move - start timer
  if (movesNumber === 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }

  //three stars for 8 and less moves, two for 9-16, one for 17 and more
  if (movesNumber > 9 && movesNumber < 16) {
    starOne.style.opacity = '0';
  } else if (movesNumber > 17) {
    starTwo.style.opacity = '0';
  }
}

//variables needed for timer
var second = 0;
var minute = 0;
var hour = 0;
var timer = document.querySelector('.timer');
var interval = void 0;

//@description: adds timer
function startTimer() {
  interval = setInterval(function () {
    timer.innerHTML = hour + ':' + minute + ':' + second;
    second++;

    if (second == 60) {
      minute++;
      second = 0;
    }

    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

//variables needed for the event listener (for clicks count)
var clicksCount = 0;
var firstGuess = '';
var secondGuess = '';
var previousButton = null;
var correctMatch = 0;
var modal = document.getElementById('modal');

//@description: adds match class to the matching cards, counts correct matches, once there are 8 matches makes modal visible
var match = function match() {
  correctMatch++;
  console.log(correctMatch);
  if (correctMatch === 8) {
    clearInterval(interval);
    finalTime = timer.innerHTML;
    modal.classList.add('visible');

    var modalStarTwo = document.getElementById('modalStarTwo');
    var modalStarOne = document.getElementById('modalStarOne');

    if (movesNumber > 9 && movesNumber < 16) {
      modalStarOne.style.opacity = '0';
    } else if (movesNumber > 17) {
      modalStarTwo.style.opacity = '0';
      modalStarOne.style.opacity = '0';
    }
    document.getElementById('finalMove').innerHTML = movesNumber;
    document.getElementById('totalTime').innerHTML = finalTime;
  }

  //applies match class to the button
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (button) {
    button.classList.add('match');
  });

  //applies cursor-fixed class to the front
  var cursorFixed = document.querySelectorAll('.cursor');
  cursorFixed.forEach(function (button) {
    button.classList.add('cursor-fixed');
  });
};

//@description: removes selected class from the incorrect buttons
var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  clicksCount = 0;
  previousButton = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (button) {
    button.classList.remove('selected');
  });
  var cursor = document.querySelectorAll('.cursor');
  cursor.forEach(function (button) {
    button.classList.remove('cursor');
  });
};

/*@description: event listener is applied for the whole game section to wait
for clicks, assign selected classes and matches*/
game.addEventListener('click', function (event) {
  var clicked = event.target;
  //it will not count clicks on <section>, on already selected or buttons with match
  if (clicked.nodeName === 'SECTION' || clicked === previousButton || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (clicksCount < 2) {
    clicksCount++;
    //if one button is open, class selected is assigned
    if (clicksCount === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
      clicked.classList.add('cursor');
      //if two buttons are open class selected is assigned and one move is counted
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
      clicked.classList.add('cursor');
      moveCounter();
    }

    //if two selected buttons match, match class is applied, otherwise the guess is reset
    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, 1000);
      }
      setTimeout(resetGuesses, 1000);
    }
    previousButton = clicked;
  }
});

//@description: cleares everything and resets the game
function resetAll() {
  correctMatch = 0;
  firstGuess = '';
  secondGuess = '';
  clicksCount = 0;
  previousButton = null;
  starOne.style.opacity = '1';
  starTwo.style.opacity = '1';
  movesNumber = 0;
  moves.innerHTML = movesNumber;
  second = 0;
  minute = 0;
  hour = 0;
  timer.innerHTML = hour + ':' + minute + ':' + second;
  cards.innerHTML = "";
  gameStart();
};

//@description: at the end of the game, closes the modal and resets the game
function closeModal() {
  modal.classList.remove('visible');
  resetAll();
}