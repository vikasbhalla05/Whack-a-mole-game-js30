const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole; // to not repeat a prev hole
let timeup = false; // complete runtime of the game

function randomTime(min, max){
  // generate a random time
  return Math.round(Math.random()*(max-min))+min;
}

function randomHole(holes){

  let idx = Math.floor(Math.random()*holes.length);
  let hole = holes[idx]; // generate a random hole

// check for the last hole
  if(lastHole === hole){
    console.log("same one");
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;

}

function molePeep(){

  // random time for the moles
  let time = randomTime(200, 1000);
  // random holes for the moles
  let hole = randomHole(holes);

  hole.classList.add('up'); // add class
  setTimeout(() => {
    hole.classList.remove('up'); // remove class
    if(!timeup) molePeep(); // run the function untill the runtime is over
  },time);

}

function bonk(e){
  // registering clicks on the moles
  if(e.isTrusted)
    scoreBoard.textContent++

}

function startGame(){

  scoreBoard.textContent = 0;
  timeup = false;
  molePeep();
  setTimeout(() => timeup = true, 10000); // changing the timeup bool on ending the run time

}

// click event for all the moles
moles.forEach(mole => mole.addEventListener('click', bonk))