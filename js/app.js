let cardList = Array.from(document.getElementsByClassName('card'));
let restart = document.getElementsByClassName('restart').item(0);
let moves = document.getElementsByClassName('moves').item(0);
let scorePanel = document.getElementsByClassName('score-panel').item(0);
let stars = Array.from(document.getElementsByClassName('stars').item(0).children);
let timer = document.getElementById("timer");

let matches = 1;
let open = cardList[12];
let show = null;
let start = null;

function restartFn() {
  matches = 0;
  moves.innerHTML = "0";
  restart.innerHTML = '<i class="fa fa-repeat"></i>';
  timer.innerHTML = "00:00";
  open = null;
  show = null;
  start = null;
  stars.forEach((star) => {
    star.children[0].classList.remove("fa-star-o")
    star.children[0].classList.add("fa-star")
  });
  cardList.forEach((card) => {
    card.classList.remove("match", "open", "show");
  });
  for (var i = 0; i < cardList.length; i++) {
    var r = Math.floor(Math.random() * i);
    var i2 = cardList[i].children[0].classList[1];
    var r2 = cardList[r].children[0].classList[1];
    cardList[i].children[0].classList.remove(i2);
    cardList[r].children[0].classList.remove(r2);
    cardList[i].children[0].classList.add(r2);
    cardList[r].children[0].classList.add(i2);
  }
}

function clickerFn() {
  if (show || open === this) return;
  if (this.classList.contains("match")) return;
  if (this.children[0].classList.contains("open")) return;
  if (!start) start = new Date().getTime();

  let m = parseInt(moves.innerHTML);
  moves.innerHTML = (++m).toString();

  if (!open) {
    open = this;
    this.classList.add("open", "show");
  } else if (this.children[0].classList[1] === open.children[0].classList[1]) {
    this.classList.toggle("match", "open", "show");
    open.classList.toggle("match", "open", "show");
    open = null;
    ++matches;
    if (matches === 4) {
      stars[2].children[0].classList.remove("fa-star");
      stars[2].children[0].classList.add("fa-star-o");
    }
    if (matches === 8) {
      stars[1].children[0].classList.remove("fa-star");
      stars[1].children[0].classList.add("fa-star-o");
      restart.innerHTML = 'You won! Play again?<i class="fa fa-repeat"></i>';
    }
  } else {
    this.classList.add("open", "show");
    show = this;
    setTimeout(myTimer, 500);
  }
}

function myTimer() {
  open.classList.remove("open", "show");
  show.classList.remove("open", "show");
  open = null;
  show = null;
}

setInterval(function () {
  if (!start || matches === 8) return;
  var elapsed = new Date().getTime() - start;
  var minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60)) + 100;
  var seconds = Math.floor((elapsed % (1000 * 60)) / 1000) + 100;
  timer.innerHTML = minutes.toString().substr(1) + ":" + seconds.toString().substr(1);
}, 500);

for (var i = 0; i < cardList.length; i++) {
  cardList[i].onclick = clickerFn;
}
restart.onclick = restartFn;
