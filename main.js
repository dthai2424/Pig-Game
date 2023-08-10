"use strict";
const player1DisplayCurrent = document.querySelector(".player1-current-point");
const player2DisplayCurrent = document.querySelector(".player2-current-point");
const player1DisplayTotal = document.querySelector(".player1-total-point");
const player2DisplayTotal = document.querySelector(".player2-total-point");
let turnStart = true;
let turn = 1;
let player1Point = 0;
let player2Point = 0;
let lastDice = 0;
const playerWin = function (totalPoint, player) {
  if (totalPoint >= 100) {
    document.querySelector(
      ".turn-display"
    ).textContent = `Player ${player} win`;
    if (player == 1) {
      document.querySelector(`#${"player" + 1}`).classList.add("player1Win");
      document.querySelector(`#${"player" + 2}`).classList.add("hidden-main");
    } else {
      document.querySelector(`#${"player" + 2}`).classList.add("player2Win");
      document.querySelector(`#${"player" + 1}`).classList.add("hidden-main");
    }
    document.querySelector(".btn-roll-dice").disabled = true;
    document.querySelector(".btn-hold").disabled = true;
    document.querySelector(`.${"dice" + lastDice}`).classList.add("hidden");
    return true;
  }
  return false;
};
const player1 = {
  totalPoint: 0,
  currentPoint: 0,
  rollDice: function () {
    let dice = Math.floor(Math.random() * 6) + 1;
    rollDiceAnimation(dice);
    if (turnStart == true) {
      player1DisplayCurrent.textContent = dice;
    } else if (dice === 1) {
      this.currentPoint = 0;
      setTimeout(function () {
        player2Turn(false);
        turn = 2;
        player1DisplayCurrent.textContent = 0;
      }, 200);
    } else {
      this.currentPoint += dice;
      player1DisplayCurrent.textContent = this.currentPoint;
    }
    lastDice = dice;
    return dice;
  },
  hold: function () {
    player1DisplayCurrent.textContent = 0;
    this.totalPoint += this.currentPoint;
    this.currentPoint = 0;

    player1DisplayTotal.textContent = this.totalPoint;

    turn = 2;
  },
};
const player2 = {
  totalPoint: 0,
  currentPoint: 0,
  rollDice: function () {
    let dice = Math.floor(Math.random() * 6) + 1;
    rollDiceAnimation(dice);
    if (turnStart) {
      player2DisplayCurrent.textContent = dice;
    } else if (dice === 1) {
      this.currentPoint = 0;
      setTimeout(function () {
        player1Turn(false);

        turn = 1;
        player2DisplayCurrent.textContent = 0;
      }, 200);
    } else {
      this.currentPoint += dice;
      player2DisplayCurrent.textContent = this.currentPoint;
    }
    lastDice = dice;
    return dice;
  },
  hold: function () {
    player2DisplayCurrent.textContent = 0;
    this.totalPoint += this.currentPoint;
    this.currentPoint = 0;
    player2DisplayTotal.textContent = this.totalPoint;

    turn = 1;
  },
};
// Turn Annoucement
const turnDisplayAnnoucement = function () {
  setTimeout(function () {
    let annouce = document.querySelector(".turn-display");
    if (turn == 1) {
      annouce.textContent = "Player 1 turn😎";
    } else {
      annouce.textContent = "Player 2 turn😃";
    }
  }, 250);
};
//Overlay add and remove
const player1Add_RemoveOverlay = function (add) {
  if (add) {
    document.querySelector("#player1").classList.add("overlay-player");
  } else {
    document.querySelector("#player1").classList.remove("overlay-player");
  }
};

const player2Add_RemoveOverlay = function (add) {
  if (add) {
    document.querySelector("#player2").classList.add("overlay-player");
  } else {
    document.querySelector("#player2").classList.remove("overlay-player");
  }
};

//Onload and newgame
document.querySelector(".overlay").classList.remove("hidden");
const newGame = function () {
  turnStart = true;
  player1Point = 0;
  player2Point = 0;
  turn = 1;
  document.querySelector("#player1").classList.remove("hidden-main");
  document.querySelector("#player2").classList.remove("hidden-main");
  document.querySelector("#player1").classList.remove("player1Win");
  document.querySelector("#player2").classList.remove("player2Win");
  document.querySelector(`.${"dice" + lastDice}`).classList.add("hidden");
  document.querySelector("body").style.opacity = 0.7;
  setTimeout(() => {
    player1Add_RemoveOverlay(false);
    player2Add_RemoveOverlay(false);
    player1DisplayCurrent.textContent = 0;
    player1DisplayTotal.textContent = 0;
    player2DisplayCurrent.textContent = 0;
    player2DisplayTotal.textContent = 0;
    newLoad();
    document.querySelector("body").style.opacity = 1;

    document.querySelector(`.${"dice" + 0}`).classList.remove("hidden");
    document.querySelector(".turn-display").textContent =
      "Player with most point go first";
    document.querySelector(".overlay").classList.add("hidden");
  }, 1000);

  player1.currentPoint = 0;
  player1.totalPoint = 0;

  player2.currentPoint = 0;
  player2.totalPoint = 0;

  lastDice = 0;
};
document.querySelector(".btn-new-game").addEventListener("click", newGame);
function newLoad() {
  document.querySelector(".notification").classList.remove("hidden");
  document.querySelector(".btn-hold").disabled = true;
  document.querySelector(".btn-roll-dice").disabled = true;
  setTimeout(function () {
    turnDisplayAnnoucement();
    document.querySelector(".btn-roll-dice").disabled = false;
    document.querySelector(".notification").classList.add("hidden");
    player2Add_RemoveOverlay(true);
  }, 3000);
}
//decide who to go first on newgame and onload
let decideFirst = function () {
  turn = player1Point > player2Point ? 1 : 2;
  turnStart = false;

  setTimeout(() => {
    document.querySelector(".btn-roll-dice").disabled = true;
    player1Add_RemoveOverlay(true);
    player2Add_RemoveOverlay(true);
  }, 100);

  setTimeout(function () {
    const decide =
      turn == 1
        ? player1Add_RemoveOverlay(false)
        : player2Add_RemoveOverlay(false);
    document.querySelector(".btn-roll-dice").disabled = false;
    player1DisplayCurrent.textContent = 0;
    player2DisplayCurrent.textContent = 0;
    turnDisplayAnnoucement();
  }, 2000);
};

// Roll dice animation
let rollDiceAnimation = function (dice) {
  document.querySelector(`.${"dice" + dice}`).classList.add("rotate");

  setTimeout(() => {
    document.querySelector(`.${"dice" + dice}`).classList.remove("rotate");
  }, 400);

  document.querySelector(`.${"dice" + lastDice}`).classList.add("hidden");
  document.querySelector(`.${"dice" + dice}`).classList.remove("hidden");
};

let player1Turn = function (roll) {
  document.querySelector(".btn-roll-dice").disabled = true;
  setTimeout(() => {
    document.querySelector(".btn-roll-dice").disabled = false;
  }, 750);
  setTimeout(() => {
    player1Add_RemoveOverlay(false);
    player2Add_RemoveOverlay(true);
  }, 50);
  roll = roll == false ? 0 : player1.rollDice();
  console.log(`player1:${player1.currentPoint}`);
  turnDisplayAnnoucement();
  return roll;
};
let player2Turn = function (roll) {
  document.querySelector(".btn-roll-dice").disabled = true;
  setTimeout(() => {
    document.querySelector(".btn-roll-dice").disabled = false;
  }, 750);
  setTimeout(function () {
    player2Add_RemoveOverlay(false);
    player1Add_RemoveOverlay(true);
  }, 50);
  roll = roll == false ? 0 : player2.rollDice();
  console.log(`player2:${player2.currentPoint}`);
  turnDisplayAnnoucement();
  return roll;
};

document.querySelector(".btn-roll-dice").addEventListener("click", function () {
  // turnDisplayAnnoucement;
  if (turnStart) {
    switch (turn) {
      case 1:
        player1Point = player1Turn(true);
        turn = 2;
        setTimeout(function () {
          player1Add_RemoveOverlay(true);
          player2Add_RemoveOverlay(false);
        }, 50);

        break;
      case 2:
        player2Point = player2Turn(true);
        turn = 1;
        setTimeout(function () {
          document.querySelector(".btn-roll-dice").disabled = true;
        }, 800);

        setTimeout(function () {
          document.querySelector(".turn-display").textContent = "Processing...";
        }, 250);
        if (player1Point === player2Point) {
          setTimeout(() => {
            document.querySelector(".turn-display").textContent =
              "Points are equal😮";
          }, 300);
          setTimeout(() => {
            document.querySelector(".turn-display").textContent =
              "Let's roll again";
          }, 3000);
          setTimeout(() => {
            newGame();
          }, 5000);

          break;
        }
        decideFirst();

        break;
    }
  } else {
    document.querySelector(".btn-hold").disabled = false;
    switch (turn) {
      case 1:
        player1Turn(true);
        break;
      case 2:
        player2Turn(true);
        break;
    }
  }
});
document.querySelector(".btn-hold").addEventListener("click", function () {
  switch (turn) {
    case 1:
      player1.hold();
      if (playerWin(player1.totalPoint, 1)) {
        return;
      } else player2Turn(false);
      break;
    case 2:
      player2.hold();
      if (playerWin(player2.totalPoint, 2)) return;
      else player1Turn(false);
      break;
  }
});
document.querySelector("footer").addEventListener("click", function () {
  document.querySelector(".gamerules").classList.remove("hidden");
  document.querySelector(".overlay").classList.remove("hidden");
});
const closeRules=function(){
  document.querySelector(".gamerules").classList.add("hidden");
  document.querySelector(".overlay").classList.add("hidden");
};
document.querySelector(".btn-close").addEventListener("click", closeRules);
document.querySelector(".overlay").addEventListener("click", closeRules);
document.addEventListener('keydown',function(event){
  if(event.key==="Escape"){
    if(!document.querySelector('.gamerules').classList.contains('hidden')){
      closeRules();
    }
  }
})

