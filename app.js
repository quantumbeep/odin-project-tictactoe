//DOM selectors
const colorPicker = document.querySelector('#color-picker');
const root = document.querySelector(':root');
const saveNameButton = document.querySelector('.save-name-button');
const gridContainer = document.querySelector('.grid');
const startButton = document.querySelector('.start-button');
const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');

//player factory
const playerFactory = () => {
  const playerList = [];
  let colorChoice = '';
  const firstName = 'First Name';
  const lastName = 'Last Name';
  const winCount = () => {
    const wins = 0;
    wins++;
    return wins;
  };

  const getPlayer = (i) => {
    return playerList[i - 1];
  };

  const setColor = (e) => {
    colorChoice = e.target.value;
    console.log(colorChoice);
    console.log(typeof colorChoice);
    root.style.setProperty('--player1-color', colorChoice);
  };

  const getColor = () => {
    colorChoice = root.style.getPropertyValue('--player1-color');
    console.log(colorChoice);
    return colorChoice;
  };

  const setTurn = (bool) => {
    isTurn = bool;
  };

  const getTurn = () => {
    return isTurn;
  };

  const markBox = (e) => {
    const boxToMark = e.target;
    console.log(boxToMark);
    const color = player.getColor();
    console.log(color);
    boxToMark.setAttribute('data-marked', color);
    boxToMark.style.background = color;
    console.log(boxToMark);
    game.checkWin();
  };

  const setName = (e) => {
    e.preventDefault();
    if (firstNameInput.value !== '' && lastNameInput.value !== '') {
      player = {
        ...player,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
      };
    } else {
      return alert('invalid name or empty field!');
    }
    playerList.push(player);
    console.log(...playerList);
  };

  const getName = () => {
    return firstName;
  };

  return {
    setTurn,
    getTurn,
    setName,
    getName,
    setColor,
    getColor,
    winCount,
    markBox,
    firstName,
    lastName,
    colorChoice,
  };
};

//gameboard factory
const gameBoardFactory = () => {
  const sizeInput = document.querySelector('#size');

  const calcSize = () => {
    const size = sizeInput.value;
    const boxCount = size ** 2;
    return boxCount;
  };

  const resetGame = () => {
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

    //access all boxes via childnodes and assign to an array
    const boxArray = gridContainer.childNodes;
    const newArr = Array.from(boxArray);

    //map over array to extract 'marked' attribute into new array
    const rowArray = newArr.map((box) => box.dataset.marked);
    console.log({ rowArray });
    //does the row have empty string in marked attribute\
    const root = document.querySelector(':root');
    const size = Number(root.style.getPropertyValue('--grid-size'));
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

    //checks rows for winning line
    for (let i = 0; i < size; i++) {
      player.getColor();
      winningRow = rowArray
        .slice(from, to)
        .every((mark) => mark === player.getColor());
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

    //checks columns for winning line
    from = 0;
    to = size;
    for (let i = 0; i < size; i++) {
      winningCol = colArray
        .slice(from, to)
        .every((mark) => mark === player.getColor());
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

    //checks diagonals for winning line
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < size; i++) {
      diagonal1.push(newArr[i * (size + 1)].dataset.marked);
      diagonal2.push(newArr[(i + 1) * (size - 1)].dataset.marked);
    }
    let winningDiag1 = diagonal1.every((mark) => mark === player.getColor());
    let winningDiag2 = diagonal2.every((mark) => mark === player.getColor());
    console.log(winningDiag1, winningDiag2);
    if (winningDiag1 || winningDiag2) {
      console.log('winner!');
      startTimeout();
      createModal();
      return;
    }
  };

  const boxFactory = (i) => {
    const box = document.createElement('div');
    box.classList.add('box-' + i, 'box');
    box.setAttribute('box-id', i);
    box.setAttribute('data-marked', '');
    box.textContent = 'box-' + i;
    box.addEventListener('click', player.markBox);
    gridContainer.append(box);

    return {
      box,
    };
  };

  const createBoard = () => {
    resetGame();
    const sizeInput = document.querySelector('#size');
    root.style.setProperty('--grid-size', sizeInput.value);
    for (let i = 1; i <= calcSize(); i++) {
      boxFactory(i);
    }
  };

  return {
    createBoard,
    checkWin,
  };
};

//-----------------------------------------

let player = playerFactory();

//Player name
saveNameButton.addEventListener('click', player.setName);
saveNameButton.addEventListener('click', player.setColor);

//Event listeners
//Color
colorPicker.addEventListener('click', player.setColor);

//create instance of game
const game = gameBoardFactory();
const sizeInput = document.querySelector('#size');
sizeInput.oninput = (e) => {
  console.log(e.target.value);
  sizeInput.value = e.target.value;
};
startButton.onclick = () => {
  game.createBoard();
};

//determine which player marks first
//if all boxes data-marked attribute is empty string

const boxArray = gridContainer.childNodes;
const newArr = Array.from(boxArray);

const checkBoard = newArr.map((box) => box.dataset.marked);

if (checkBoard.every((item) => item === '')) {
  const randomNum = Math.floor(Math.random() * 100);
  console.log({ randomNum });
  if (randomNum % 2 === 0) {
    playerList[0].setTurn(true);
  } else {
    playerList[1].setTurn(true);
  }
}

if (playerList[0].getTurn() === true) {
  colorChoice = root.style.getPropertyValue('--player1-color');
} else {
  colorChoice = root.style.getPropertyValue('--player2-color');
}
//then use random number to decide which player marks first
//else if data-marked hex value
