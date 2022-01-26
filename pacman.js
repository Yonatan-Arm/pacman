"use strict";
const PACMAN = "🚶";

var gPacman;

function createPacman(board) {
  gPacman = {
    location: {
      i: 5,
      j: 7,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
  if (!gGame.isOn) return;
  // use getNextLocation(), nextCell
  var nextLocation = getNextLocation(ev);
  // console.log('nextLocation', nextLocation)
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // console.log('nextCell', nextCell)
  // return if cannot move
  if (nextCell === WALL) return;
  if(nextCell === CHERRY){
    gGame.score += 10;
    document.querySelector('h2 span').innerText = gGame.score;
  }
  // hitting a ghost?  call gameOver
  if (nextCell === GHOST) {
    if (gPacman.isSuper === true) {
      for (var i = 0; i < gGhosts.length; i++) {
        if (
          gGhosts[i].location.i === nextLocation.i &&
          gGhosts[i].location.j === nextLocation.j
        ) {
          var IndexRemoveGhost = i;
          gGhosts[IndexRemoveGhost].currCellContent=FOOD
          updateScore(1)
         var removedGhost= gGhosts.splice(IndexRemoveGhost, 1);
         removedGhost[0].currCellContent=EMPTY
          setTimeout(function() { gGhosts.push(removedGhost[0])}, 3000)
        }
      }
    } else {
      gameOver(false);
      return;
    }
  }

  if (nextCell === SUPERFOOD) {
    if (gPacman.isSuper === true) {
      return;
    } else {
      eatSuper();
    }
  }
  if (nextCell === FOOD) {
    updateScore(1);
  }

  // moving from corrent position:
  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // update the DOM
  renderCell(gPacman.location, EMPTY);

  // Move the pacman to new location
  // update the model
  gPacman.location = {
    i: nextLocation.i,
    j: nextLocation.j,
  };
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the DOM
  renderCell(gPacman.location, PACMAN);
}

function getNextLocation(keyboardEvent) {
  // console.log('keyboardEvent.code', keyboardEvent.code)
  // figure out nextLocation
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };

  switch (keyboardEvent.code) {
    case "ArrowUp":
      nextLocation.i--;
      break;
    case "ArrowDown":
      nextLocation.i++;
      break;
    case "ArrowLeft":
      nextLocation.j--;
      break;
    case "ArrowRight":
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}

function eatSuper() {
  gPacman.isSuper = true;
  setTimeout(function () {
    gPacman.isSuper = false;
  }, 5000);
}
