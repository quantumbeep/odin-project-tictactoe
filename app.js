//player factory
const playerFactory = (firstName, lastName, birthDate) => {
  const getPlayerData = () => `${firstName} ${lastName}`;
  const getAge = () => {
    const today = new Date();
    const birthDate = new Date(birthDate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const dateGap = today.getMonth() - birthDate.getMonth();
    if (
      dateGap < 0 ||
      (dateGap === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const setTurn = () => {
    return (isActiveTurn = !isActiveTurn);
  };
  const placeMarker = (box) => {
    //select grid box dom

    const x = document.querySelectorAll('.box');
    x.onclick = (e) => {
      console.log(e.target);
    };
    //if box is empty then change the color of the box background
    //add count to turns
    //else display message or indicator that space is taken already
  };
  return {
    firstName,
    lastName,
    birthDate,
    wins,
    totalGamesPlayed,
    isActiveTurn,
    getPlayerData,
    getAge,
  };
};

//gameboard factory
const gameBoardFactory = (size) => {
  const calcSize = () => {
    boxCount = size ** 2;
    return boxCount;
  };

  const createBox = (i) => {
    const gridContainer = document.querySelector('.grid');
    const box = document.createElement('div');
    box.classList.add('box-' + i, 'box');
    box.setAttribute('box-id', i);
    box.setAttribute('data-marked', '');
    box.textContent = 'box-' + i;
    gridContainer.append(box);
    console.log(gridContainer);
    box.onclick = (e) => {
      const boxToMark = e.target;
      // const boxToMark = document.querySelector(`[box-id="${i}"]`);
      boxToMark.style.background = 'red';
      box.setAttribute('data-marked', true);
      console.log(box);
      console.log(boxToMark);
      console.log(gridContainer);
      const isMarked = box.dataset.marked !== '';
      checkWin();
    };
  };
 const resetGame = () => {

 }
 
  const checkWin = () => {
    //grab grid
    const gridContainer = document.querySelector('.grid');

    //access all boxes via childnodes and assign to const[]
    const boxArray = gridContainer.childNodes;
    const newArr = Array.from(boxArray);
    console.log(typeof newArr);
    console.log(newArr);
    //map over array to extract 'marked' attribute into new array
    const markedArray = newArr.map((box) => box.dataset.marked);
    //does the row have empty string in marked attribute

    let size = 3;

    let from = 0;
    let to = 3;
    let winningLine = false;
    for (let i = 0; i <= size - 1; i++) {
      winningLine = !markedArray.slice(from, to).includes('');
      if (winningLine) {
        console.log('winner!');
        resetGame()
        return;
      }
      console.log(winningLine);
      from += size;
      to += size;
      console.log(from, to);
    }
    console.log(markedArray);
    console.log(winningLine);
  };

  const createBoard = () => {
    for (let i = 1; i <= calcSize(); i++) {
      createBox(i);
    }
  };

  return {
    createBoard,
    checkWin,
  };
};

const game = gameBoardFactory(3);
console.trace(game);

game.createBoard();
game.checkWin();
