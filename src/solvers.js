/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

window.makeMatrix = function(n, boardInstance) {
  var matrix = [];
  
  for (var i = 0; i < n; i++) {
    matrix.push(boardInstance.get(i));
  }

  return matrix;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution;

  var board = new Board({'n': n});

  for (var i = 0; i < n; i++) {
    board.togglePiece(i, i);
  }
  
  solution = makeMatrix(n, board);
  
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solution = 0; 

  var solutionCounter = function(n) {
    if (n === 1) {
      solution ++;
      return;
    }

    for (var i = 0; i < n; i++) {
      solutionCounter(n - 1);
    }
  };
  
  solutionCounter(n);
  
  return solution;

};

//STRATEGY:

 //try an L
        // if destination of L = undefined
          // continue
        // else if destination = 1
          // continue
        // else if destination = 0
          // collision test
            // if true
              // continue
            //if false
              //branch it
              // toggle the destination (turn it into 1)
              // find solution on that branch




// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  //how to make 8 different L's in an 2d array
  var L = [[1, 2], [2, 1], [2, -1], [1, -2], [-2, -1], [-1, -2], [-2, 1], [-1, 2]];

  //takes in a location tuple, returns the result of adding L[i] to that tuple
  var lMaker = function(originTuple, i) {
    var destination = [];

    destination[0] = originTuple[0] + L[i][0];
    destination[1] = originTuple[1] + L[i][1];
  
    return destination;
  };



  //var initiation
  var solution; // the array that is created at the end

  var board = new Board({'n': n}); // our starting point
  var queenCount = 0;
  var history = []; // where we keep track of where we placed our queens in the current branch


  
 


  //// Main Recursive Function ////
  var findSolution = function(currentQueen, nextMoveTuple) {  

    //stores the next move (tuple)
    var possibleMoves = [];

    // If this is the first Queen
    if (queenCount === 0) {
      board.togglePiece(currentQueen[0], currentQueen[1]);
      queenCount++;

    // If the current branch is not the very first branch place a queen down at the next move...
    } else if (queenCount < n && queenCount > 0) {
      board.togglePiece(nextMoveTuple[0], nextMoveTuple[1]);
      queenCount++;

      // if current queen is colliding with any of the previous queens
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(nextMoveTuple[0], nextMoveTuple[1]);
        queenCount--;
        return;
      }

      // last queen becomes the next move tuple
      currentQueen = nextMoveTuple;


    } else if (queenCount = n) {
      return true;
    }



    //// Calculate and save all possible valid moves ////
    for (var j = 0; j < 8; j++) {
      var destination = lMaker(currentQueen, j);
      
      if ((destination[0] >= n || destination[0] < 0) ||
           destination[1] >= n || destination[1] < 0) {
        continue;

      } else if (destination[0] === currentQueen[0] && destination[1] === currentQueen[1]) {
        continue;

      } else {
        possibleMoves.push(destination);
      }
    }

    for (var k = 0; k < possibleMoves.length; k++) {
      // This is where the DECISION BRANCHING happens :)
      findSolution(currentQueen, possibleMoves[k]);
    }
    
    return false;     
  };

/////// This iterates the possible roots of our Decision Tree /////// the beginning of our function
  for (var i = 0; i < n; i++) { // consider n to be length of first row


    //resets the queen counter / start all over again from index +1
    queenCount = 0;

    //if solution flags to true
    if (findSolution([0, i])) {
      break;
    }
    
    //untoggle the queen at the previous ith position
    board.togglePiece(0, i - 1);
    
  }

  //transforms the edited board into an array
  solution = makeMatrix(n, board);  

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));

  return solution;
};





var test = window.findNQueensSolution(4);
console.log(test);


/*
function is breaking for 3 main reason:
  it will turn off other queens that are already on the board

  our break function is not working properly

  the first queen isn't untoggled after the first iteration
*/



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  //there should be one instance of history per branch
  //if that branch is a valid solution, it should get pushed as the solution array, whichever comes first


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

























