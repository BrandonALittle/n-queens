/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  let board = new Board({n: n});
  var solution = undefined; //fixme

  var findFirstRooksSolution = function(board, startRow, endRow) {
    //if startRow === endRow return board
    if (startRow === endRow) {
      return board;
    }

    //for 0 to n
    for (let i = 0; i < endRow; i++) {
      //toggle piece at startRow and i
      board.togglePiece(i, startRow);
      //if no conflicts
      if (!board.hasAnyRooksConflicts()) {
        return findFirstRooksSolution(board, startRow + 1, endRow);
      }
      //untoggle piece atstartRow
      board.togglePiece(i, startRow);
    }
  };

  solution = findFirstRooksSolution(board, 0, n);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let board = new Board({n: n});
  let count = 0;

  let findFirstRooksSolution = function(board, startRow, endRow) {
  //if startRow === endRow return board
    if (startRow === endRow) {
      count++;
      return;
    }

    //for 0 to n
    for (let i = 0; i < endRow; i++) {
      //toggle piece at startRow and i
      board.togglePiece(i, startRow);
      //if no conflicts
      if (!board.hasAnyRooksConflicts()) {
        findFirstRooksSolution(board, startRow + 1, endRow);
      }
      //untoggle piece atstartRow
      board.togglePiece(i, startRow);
    }
  };
  findFirstRooksSolution(board, 0, n);

  console.log('Number of solutions for ' + n + ' rooks:', count);
  return count;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  let board = new Board({n: n});
  var solution = undefined; //fixme
  if (n === 0 || n === 2 || n === 3) {
    return board.rows();
  }

  var findFirstQueensSolution = function(board, startRow, endRow) {
    //if startRow === endRow return board
    if (startRow === endRow) {
      return board;
    }

    //for 0 to n
    for (let i = 0; i < endRow; i++) {
      //toggle piece at startRow and i
      board.togglePiece(i, startRow);
      //if no conflicts
      if (!board.hasAnyQueensConflicts()) {
        let result = findFirstQueensSolution(board, startRow + 1, endRow);
        if (result) {
          return result;
        }
      }
      //untoggle piece atstartRow
      board.togglePiece(i, startRow);
    }
  };

  solution = findFirstQueensSolution(board, 0, n);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  if (solution) {
    return solution.rows();
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  //var solutionCount = undefined; // declared solution counter
  let board = new Board({n: n});
  let count = 0;

  let findFirstQueensSolution = function(startRow) {
  //if startRow === endRow return board
    if (startRow === n) {
      count++;
      return;
    }

    //for 0 to n
    for (let i = 0; i < n; i++) {
      //toggle piece at startRow and i
      board.togglePiece(i, startRow);
      //if no conflicts
      if (!board.hasAnyQueensConflicts()) {
        findFirstQueensSolution(startRow + 1);
      }
      //untoggle piece atstartRow
      board.togglePiece(i, startRow);
    }
  };
  findFirstQueensSolution(0);

  //
  console.log('Number of solutions for ' + n + ' queens:', count);
  return count;
};
