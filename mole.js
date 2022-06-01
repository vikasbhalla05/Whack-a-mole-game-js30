const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeup = false;

function randomTime(min, max){
  return Math.round(Math.random()*(max-min))+min;
}

function randomHole(holes){
  let idx = Math.floor(Math.random()*holes.length);
  let hole = holes[idx];

  if(lastHole === hole){
    console.log("same one");
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function molePeep(holes){

  let time = randomTime(500, 1200);
  let hole = randomHole(holes);

  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if(!timeup) molePeep(holes);
  },time);

  
}

function bonk(e){
  if(e.isTrusted)
    scoreBoard.textContent++
}

function startGame(){
  scoreBoard.textContent = 0;
  timeup = false;
  molePeep(holes);
  setTimeout(() => {
    startGame();
  }, 10000);

  timeup = true;

}

moles.forEach(mole => mole.addEventListener('click', bonk))