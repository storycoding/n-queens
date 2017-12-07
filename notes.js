// We only ever have to test a queen on the first line
// because there will never be a situation where there isn't
// a queen on the first line.

//In order to reach N queens, there must be one queen on every
// single row/column

// All areas to test is based off of the L shape.

// N queens: what is the MAXIMUM many queens can we place in an n sized chessboard

// Path finding - each queen is represented by its attack range, that starts from a root and goes outwards until it hits the edges. If it hits another root, tries another slot.

// The possibilities of where to place a new one shrink every time we place a new one