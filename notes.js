// We only ever have to test a queen on the first line
// because there will never be a situation where there isn't
// a queen on the first line.

//In order to reach N queens, there must be one queen on every
// single row/column

// All areas to test is based off of the L shape.

// N queens: what is the MAXIMUM many queens can we place in an n sized chessboard

// Path finding - each queen is represented by its attack range, that starts from a root and goes outwards until it hits the edges. If it hits another root, tries another slot.

// The possibilities of where to place a new one shrink every time we place a new one

// N queens: what is the MAXIMUM many queens can we place in an n sized chessboard

// Path finding - each queen is represented by its attack range, that starts from a root and goes outwards until it hits the edges. If it hits another root, tries another slot.

// The possibilities of where to place a new one shrink every time we place a new one

// The L pattern is the key.

// Store the occupied target areas so you can skip them on every iteration

// [q][  ][  ][  ]
// [  ][  ][q][  ] 
// [  ][  ][  ][  ]
// [  ][q][  ][  ]

// [  ][q][  ][  ]
// [  ][  ][  ][q] 
// [q][  ][  ][  ]
// [  ][  ][q][  ]


// Decision tree problems

// r = rook
// n = length / width of board
// p = number of plays

// [r ][  ][  ]
// [  ][  ][  ]
// [  ][  ][  ]

// How many slots are left after placing each piece?
// n * n - p = possible placements at this time

// [r ][  ][  ]
// [  ][r ][  ]
// [  ][  ][  ]

// How many slots are still valid after placing the second piece? - less
// 1 - why? - because we’ve already figured out which we can’t use

// This is called a tree because we are excluding all the options we’ve discovered to be false

// isAvailable: whether or not a space is iterable

// //do not check any of the tiles whose isAvaiable === false

// Things to try out:
// pathMaker() - by placing a unit, creates its attack ranges + changes the isAvailable of those

// Store the options in an array of indexes, and decrease it every time a new unit is placed


// How do we avoid reiterating through nodes that are already flagged as unsafe? (Aiming linear time)


// Idea 1: an array of safe indexes

var safePlaces =[
  [A,1],[A,2],[A,3],
  [B,1],[B,2],[B,3],
  [C,1],[C,2],[C,3]
];

// Use safePlaces as map for what to look up next .

// Every time that a node is set to !isSafe
//  - remove its reference from safePlaces

// pathFinder() - looks for available places


// MINIMAL VIABLE PRODUCT
//  feel free to use a naive approach, and learn the pros and cons as we proceed


// DEFINING THE IDEAL DATA STRUCTURE:
//  find out what are the operations we’ll be doing throughout the algorithm
//  determine their time complexity
//  readjust data structure to minimize time complexity


// Facts:

// BoardView.js is a part of the visualizer - use it

// IGNORE THE COMPLEXITY OF BACKBONE - it uses pseudoclassical, that’s all you need to know

// N13 will start crashing everything - figure out how not to..

// MINIMAL VIABLE PRODUCT - resist premature optimization

// Objectives on the slides!


// Fun thought 1 - rotating the chessboard!
// Fun thought 2 - does the solution fit a tweet? :D





// Output: how does my visual representation translate into a data structure?


// GRAPH:

// What are the properties of each chess node?

chessNode = {
  index: [x, y], // position…might not be the quickest
  isSafe: true, // turns false if a unit is targeting it
  wasQueen: false // turns true if any unit has been there before
}

// Constructor:

Var ChessNode = function(x,y) {
  this.index = x,y,
  this.isSafe = true,
  this.wasQueen = false,

  // connecting it with other nodes
  this.top = undefined,
  this.right = undefined,
  this.bot = undefined,
  this.left = undefined,

  //corners
  this.topRight = undefined,    //this.top.right  ||  //this.right.top
  this.botRight = undefined,    //this.top.right  ||  //this.right.top
  this.botLeft = undefined,   //this.bot.left   ||  //this.left.bot
  this.botRight = undefined,    //this.bot.right  ||  //this.right.bot

  //might come in handy, since this is what queen’s can’t move to 8 variants

  this.TTL = undefined,   //this.top.top.left
  this.TTR = undefined,   //this.top.top.right
  this.RRT = undefined,   //this.right.right.top
  this.RRB = undefined,   //this.right.right.bot
  this.BBR = undefined,   //this.bot.bot.right
  this.BBL = undefined,   //this.bot.bot.left
  this.LLB = undefined,   //this.left.left.bot
  this.LLT= undefined,    //this.left.left.top
}

//all corners need to be assigned after all the nodes in the board are created

ChessNode.prototype.addCorners = function() {
  
  // take borders into account, to avoid breaking at undefined
  
  this.topRight = this.top.right;
  this.botRight = this.top.right;
  this.botLeft = this.bot.left;
  this.botRight = this.bot.right;

  //making the L (queen-safe) pattern
  this.TTL = this.top.top.left;
  this.TTR = this.top.top.right;
  this.RRT = this.right.right.top;
  this.RRB = this.right.right.bot;
  this.BBR = this.bot.bot.right;
  this.BBL = this.bot.bot.left;
  this.LLB = this.left.left.bot;
  this.LLT = this.left.left.top
};


//array of arrays
[  0  1   2   3
0[00][01][02][03]
1[10][11][12][13]
2[20][Q ][22][23]
3[30][31][32][33]
]

// currentNode = array.get(2)[1]
// var r = 2
// var c = 1

// L FORMULA
// r += 1
// c+= 2

//destination of L = array.get(3)[3] - constant time

// helper function for extracting possible tiles

//deciding where the queen is
var queenLocationIndex = [r,c];

//getting the queen
array.get(r)[c];

//defining the threats
function threaten(queenLocationIndex) {
  var safePlaces = [];

  //use the L formula
  var nextAvailableRow = queenLocationIndex[0] +1;
  var nextAvailableColumn = queenLocationIndex[1] +2;

  //makes the tuple
  var tuple = [nextAvailableRow,nextAvailableColumn];

  //stores the tuple
  safePlaces.push(tuple);

  //return the full array
  return safePlaces;
}

//accessing a specific coordinate
array.get(r)[c];

//assuming queen is at [0,1]

//only one queen per line

//only need to check 1 line, the rest is rotation


//traversing it like a graph...