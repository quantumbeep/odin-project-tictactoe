let baseSize = 0;

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
  const winCount = () => {};
  const setTurn = () => {
    return (isActiveTurn = !isActiveTurn);
  };
  const markBox = (e) => {
    const boxToMark = e.target;
    boxToMark.style.background = 'red';
    box.setAttribute('data-marked', true);
    checkWin();
  };
  return {
    firstName,
    lastName,
    // wins,
    // totalGamesPlayed,
    // isActiveTurn,
    getPlayerData,
    getAge,
  };
};

//gameboard factory
const gameBoardFactory = () => {
  const calcSize = () => {
    const size = sizeInput.value;
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
      checkWin();
    };
  };

  const resetGame = () => {
    const gridContainer = document.querySelector('.grid');
    gridContainer.innerHTML = '';
  };

  const startTimeout = () => {
    time = setTimeout(resetGame, 10000);
  };

  const createModal = () => {
    const modalBack = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalButton = document.createElement('button');
    modalBack.classList.add('modal-back');
    modalContent.classList.add('modal-content');
    modalButton.classList.add('modal-button');
    document.body.append(modalBack);
    modalBack.append(modalContent);
    modalContent.append(modalButton);
    modalButton.onclick = () => {
      clearTimeout(time);
      const modalBack = document.querySelector('.modal-back');
      modalBack.remove();
      resetGame();
    };
    window.onclick = (e) => {
      if (e.target === modalBack) {
        clearTimeout(time);
        modalBack.remove();
        resetGame();
      }
    };
  };

  const checkWin = () => {
    //grab grid
    const gridContainer = document.querySelector('.grid');

    //access all boxes via childnodes and assign to an array
    const boxArray = gridContainer.childNodes;
    const newArr = Array.from(boxArray);

    //map over array to extract 'marked' attribute into new array
    const rowArray = newArr.map((box) => box.dataset.marked);
    console.log({ rowArray });
    //does the row have empty string in marked attribute\
    const root = document.querySelector(':root');
    let size = Number(root.style.getPropertyValue('--grid-size'));
    let from = 0;
    let to = size;
    let winningRow = false;
    let winningCol = false;
    const colArray = [];
    for (let i = 0; i < size; i++) {
      for (let j = i; j < newArr.length; j += size) {
        colArray.push(newArr[j].dataset.marked);
        console.log(colArray);
      }
    }

    //checks each row for winning line
    for (let i = 0; i < size; i++) {
      winningRow = rowArray.slice(from, to).every((mark) => mark === 'true');
      console.log(winningRow);
      if (winningRow) {
        console.log('winner!');
        startTimeout();
        createModal();
        return;
      }
      from += size;
      to += size;
      console.log(from, to);
    }

    //checks each col for winning line
    from = 0;
    to = size;
    for (let i = 0; i < size; i++) {
      winningCol = colArray.slice(from, to).every((mark) => mark === 'true');
      console.log(winningCol);
      if (winningCol) {
        console.log('winner!');
        startTimeout();
        createModal();
        return;
      }
      from += size;
      to += size;
      console.log(from, to);
    }
  };

  const createBoard = () => {
    resetGame();
    const root = document.querySelector(':root');
    root.style.setProperty('--grid-size', sizeInput.value);
    for (let i = 1; i <= calcSize(); i++) {
      createBox(i);
    }
  };

  return {
    createBoard,
    checkWin,
    calcSize,
  };
};
//create instance of game
const game = gameBoardFactory();
const startButton = document.querySelector('.start-button');
const sizeInput = document.querySelector('#size');
sizeInput.oninput = (e) => {
  console.log(e.target.value);
  sizeInput.value = e.target.value;
};
startButton.onclick = () => {
  game.createBoard();
};
