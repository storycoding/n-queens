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
  
  // Create new board

  // var obj1 that holds 
  // INNER FUNCTION - will recurse
    // for n
      // toggle piece at [0, i];
      // if (!board.hasAnyRooksConflicts())
        // innerfunction(n - 1);

    //3
  // for (var i = 0; i < n; i++) {
  
  //   //try one scenario
  //   for (var j =0; j < n-1; j++) {
      
  //     for (var k = 0; k < n-2; k++) {
        
  //     }
  //   }         
  // }

  // var recurse = function(n, count) {
  //   // add a solution
  //   if (n === 1) {
  //     return;
  //   }

  //   for (var i = 0; i < n; i++) {
  //     recurse(n-1, count);
  //   }
  // }

// [0][0][0]
// [0][0][0]
// [0][0][0]


// [1][0][0]  [0][1][0]  [0][0][1]



// [1][0][0]  [0][1][0]  [0][0][1]
// [0][1][0]  [1][0][0]  [1][0][0]

// [1][0][0]  [0][1][0]  [0][0][1]
// [0][1][0]  [1][0][0]  [1][0][0]
// [0][0][1]  [0][0][1]  [0][1][0]



// [1][0][0]  [0][1][0]  [0][0][1]
// [0][0][1]  [0][0][1]  [0][1][0]

// [1][0][0]  [0][1][0]  [0][0][1]
// [0][0][1]  [0][0][1]  [0][1][0]
// [0][1][0]  [1][0][0]  [1][0][0]



  var solution = 0; 

  var recurse = function(n) {
    if (n === 1) {
      solution ++;
      return;
    }

    for (var i = 0; i < n; i++) {
      recurse(n - 1);
    }
  };
  
  recurse(n);
  
  return solution;

};




// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
