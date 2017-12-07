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



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;

  var board = new Board({'n': n});
  var queenCount = 0;
  
  var L = [[1, 2], [2, 1], [2, -1], [1, -2], [-2, -1], [-1, -2], [-2, 1], [-1, 2]];

  var lMaker = function(originTuple, i) {
    var destination = [];

    destination[0] = originTuple[0] + L[i][0];
    destination[1] = originTuple[1] + L[i][1];
  
    return destination;
  };


  //// Main Recursive Function ////
  var findSolution = function(depth, lastQueen, nextMoveTuple) {

    for (var i = depth; i < n; i++) { // consider n to be length of first row
      var lastQueen = lastQueen || [0, i];

      var possibleMoves = [];

      // If this is the first Queen
      if (queenCount === 0) {
        board.togglePiece(lastQueen[0], lastQueen[1]);
        queenCount++;

      } else if (queenCount <= n && queenCount > 0) {
        board.togglePiece(nextMoveTuple[0], nextMoveTuple[1]);
        queenCount++;

        // if Collision
        if (board.hasAnyQueensConflicts()) {
          board.togglePiece(nextMoveTuple[0], nextMoveTuple[1]);
          queenCount--;
          return;
        }

        // lastQueen = [newMoveTuple]
        lastQueen = nextMoveTuple;

      } else if (queenCount > n) {
        return true;
      }

      //// Calculate and save all possible valid moves ////
      for (var j = 0; j < 8; j++) {
        var destination = lMaker(lastQueen, j);
        
        if ((destination[0] >= n || destination[0] < 0) ||
             destination[1] >= n || destination[1] < 0) {
          continue;
        } else if (destination[0] === lastQueen[0] && destination[1] === lastQueen[1]) {
          continue;
        } else {
          possibleMoves.push(destination);
        }
      }
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


      for (var k = 0; k < possibleMoves.length; k++) {
        // This is where the DECISION BRANCHING happens :)
        findSolution(depth + 1, lastQueen, possibleMoves[k]);
      }

  // push the coordinate tuple to possibleMoves
      // for amount of solutions available
        // findSolution(currentQueenTuple, nextMoveTuple)
    }
    
    
    return false;     
  };

  findSolution(0);

  solution = makeMatrix(n, board);  


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

var test = window.findNQueensSolution(4);
console.log(test);


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

























