// Global variables to track
let currentPlayer = 0;
const marks = ['x' ,'o'];

// General functions
// check if all values in an array are the same; returns Boolean
const allSame = (arr) => arr.filter((e => e != '')).length > 0 ? arr.every(elem => arr[0] == elem) : false;
// return an array of texts for the selection
const getLineText = ($selector) => $selector.map(function() { return $(this).text(); }).get();
// execute status change if there is a winner
const checkWinner = (lineMoves) => {
  if (allSame(lineMoves)) {
    $('.square').off('click');
    const winningPlayerMark = marks[(currentPlayer + 1) % 2].toUpperCase();
    alert(`${winningPlayerMark} player won!`);
  }
};

// Event handlers
// adds either x's or o's on the board
const addMark = (event) => {
  const $selectedSquare = $(event.currentTarget);
  const mark = marks[currentPlayer];
  if ($selectedSquare.text() == '') {
    $selectedSquare.addClass(mark);
    $selectedSquare.text(mark);
    currentPlayer = (currentPlayer + 1) % 2;
  }
};

// winning move checkers
const checkRow = () => {
  const $currentRow = $(event.currentTarget).parent().children();
  const rowMoves = getLineText($currentRow);
  checkWinner(rowMoves);
};
const checkCol = () => {
  const regex = new RegExp('left|middle|right');
  const colClass = $(event.currentTarget).attr('class').match(regex)[0];
  const $currentCol = $(`.${colClass}`);
  const colMoves = getLineText($currentCol);
  checkWinner(colMoves);
};
const checkSlash = () => {
  const regex = new RegExp('slash');
  const slashClass = String($(event.currentTarget).attr('class').match(regex));
  if (slashClass == 'slash') {
    const slashMoves = getLineText($('.slash'));
    checkWinner(slashMoves);
  }
};
const checkBackslash = () => {
  const regex = new RegExp('back');
  const backslashClass = String($(event.currentTarget).attr('class').match(regex));
  if (backslashClass == 'back') {
    const backslashMoves = getLineText($('.back'));
    checkWinner(backslashMoves);
  }
};


$(() => {
  // Event listeners
  $('.square').on('click', addMark);
  $('.square').on('click', checkRow);
  $('.square').on('click', checkCol);
  $('.square').on('click', checkSlash);
  $('.square').on('click', checkBackslash);
});
