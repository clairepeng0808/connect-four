function changeColor(row, col, color) {
  // console.log("color changed");
  return table
    .eq(row)
    .find("td")
    .eq(col)
    .find("button")
    .css("background-color", color);
}

function returnColor(row, col) {
  // console.log("color returned");
  return table
    .eq(row)
    .find("td")
    .eq(col)
    .find("button")
    .css("background-color");
}

function checkBottom(col) {
  for (var row = 5; row >= 0; row--) {
    var colorReport = returnColor(row, col);
    // console.log(colorReport);
    if (colorReport === "rgb(255, 255, 250)") {
      return row;
    }
  }
}

function colorMatchCheck(one, two, three, four) {
  return (
    one === two &&
    one === three &&
    one === four &&
    one !== "rgb(255, 255, 250)" &&
    one !== undefined
  );
}

// Check for Horizontal Wins
function horizontalWinCheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row, col + 1),
          returnColor(row, col + 2),
          returnColor(row, col + 3)
        )
      ) {
        console.log("horiz");
        return true;
      } else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row + 1, col),
          returnColor(row + 2, col),
          returnColor(row + 3, col)
        )
      ) {
        console.log("vertical");
        return true;
      } else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row + 1, col + 1),
          returnColor(row + 2, col + 2),
          returnColor(row + 3, col + 3)
        )
      ) {
        console.log("diag");
        return true;
      } else if (
        colorMatchCheck(
          returnColor(row, col),
          returnColor(row - 1, col + 1),
          returnColor(row - 2, col + 2),
          returnColor(row - 3, col + 3)
        )
      ) {
        console.log("diag");
        return true;
      } else {
        continue;
      }
    }
  }
}

function endGame(player) {
  $("#message").fadeOut("fast");
  $("#endgame").text(
    player + " has won! Please refresh the browser to restart the game!"
  );
}

playerOne = prompt("Player one, please enter your name: you will be Blue.");
playerTwo = prompt("Player two, please enter your name: you will be Red.");

var blue = "#5390d9";
var red = "#ff595e";
var color = blue;
var turn = playerOne;
var table = $("table tr");
var game_on = true;

$(".board button").on("click", function () {
  if (game_on === true) {
    var col = $(this).closest("td").index();
    var bottom = checkBottom(col);
    changeColor(bottom, col, color);

    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
      endGame(turn);
      game_on = false;
    }

    if (turn === playerOne) {
      turn = playerTwo;
      color = red;
      $("#message").text(playerTwo + ", it's your turn!");
    } else {
      turn = playerOne;
      color = blue;
      $("#message").text(playerOne + " it's your turn!");
    }
  }
});
