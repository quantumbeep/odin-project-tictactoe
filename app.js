//DOM selectors
const colorPicker = document.querySelector('#color-picker');
const root = document.querySelector(':root');
const saveNameButton = document.querySelector('.save-name-button');
const gridContainer = document.querySelector('.grid');
const startButton = document.querySelector('.start-button');
const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const form = document.querySelector('form');
const sizeInput = document.querySelector('#size');
const sizeDisplay = document.querySelector('.size-display');
const playerDisplay = document.querySelector('.players');

//player factory
const playerFactory = () => {
  const playerList = [];
  let colorChoice = '';
  const firstName = 'First Name';
  const lastName = 'Last Name';
  let isTurn = false;
  const winCount = () => {
    const wins = 0;
    wins++;
    return wins;
  };

  const getPlayer = (i) => {
    return playerList[i - 1];
  };

  const setColor = (e) => {
    colorChoice = colorPicker.value;
    console.log(colorChoice);
    root.style.setProperty('--player1-color', colorChoice);
  };

  const getColor = () => {
    return colorChoice;
  };

  const setTurn = (value) => {
    isTurn = value;
  };

  const getTurn = () => {
    return isTurn;
  };

  const markBox = (e) => {
    let color = '';
    const boxToMark = e.target;
    console.log(boxToMark);
    console.log(playerList[0]);
    if (player.getPlayer(1).getTurn()) {
      color = player.getPlayer(1).playerColor;
      player.getPlayer(1).setTurn(false);
    } else {
      color = player.getPlayer(2).playerColor;
      player.getPlayer(2).setTurn(true);
    }
    console.log(color);
    if (boxToMark.dataset.marked === '') {
      boxToMark.setAttribute('data-marked', color);
      boxToMark.style.background = color;
      console.log(boxToMark);
      game.checkWin();
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    //set the color
    setColor();
    //save name and color to obj
    if (firstNameInput.value !== '' && lastNameInput.value !== '') {
      player = {
        ...player,
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        playerColor: getColor(),
      };
    } else {
      return alert('invalid name or empty field!');
    }
    //push obj to array
    playerList.push(player);
    console.log(...playerList);
    console.log(playerList);
    console.log({ playerList });
    //render player
    displayPlayers();
    //clear fields
    form.reset();
  };

  const getName = () => {
    return firstName;
  };

  const displayPlayers = () => {
    playerDisplay.innerHTML = '';
    for (let i = 1; i <= playerList.length; i++) {
      const playerItem = document.createElement('p');
      playerItem.classList.add('player-' + i, 'player');
      playerItem.style.background = player.getPlayer(i).playerColor;
      playerItem.textContent = player.getPlayer(i).firstName;
      playerDisplay.append(playerItem);
      console.trace();
    }
  };

  return {
    setTurn,
    getTurn,
    handleSave,
    getName,
    setColor,
    getColor,
    winCount,
    markBox,
    getPlayer,
    firstName,
    lastName,
    playerList,
    displayPlayers,
  };
};

//gameboard factory
const gameBoardFactory = () => {
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

  const createModal = (winner) => {
    const modalBack = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalButton = document.createElement('button');
    modalBack.classList.add('modal-back');
    modalContent.classList.add('modal-content');
    modalButton.classList.add('modal-button');
    document.body.append(modalBack);
    modalBack.append(modalContent);
    modalContent.append(modalButton);
    modalContent.style.background = winner;
    modalContent.textContent = 'Winner!';
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
    //access all boxes via childnodes and assign to an array
    const boxArray = gridContainer.childNodes;
    const newArr = Array.from(boxArray);

    //map over array to extract 'marked' attribute into new array
    const rowArray = newArr.map((box) => box.dataset.marked);
    console.log({ rowArray });
    //does the row have empty string in marked attribute
    const root = document.querySelector(':root');
    const size = Number(root.style.getPropertyValue('--grid-size'));
    let from = 0;
    let to = size;

    const colArray = [];
    for (let i = 0; i < size; i++) {
      for (let j = i; j < newArr.length; j += size) {
        colArray.push(newArr[j].dataset.marked);
      }
    }
    console.log(player.getPlayer(1).playerColor);
    console.log(player.getPlayer(2).playerColor);

    const isAllPlayer1Color = (mark) => {
      return mark === player.getPlayer(1).playerColor;
    };

    const isAllPlayer2Color = (mark) => {
      return mark === player.getPlayer(2).playerColor;
    };

    //checks rows for winning line
    for (let i = 0; i < size; i++) {
      console.log(from, to);
      console.log(rowArray.slice(from, to));
      if (
        rowArray.slice(from, to).every(isAllPlayer1Color) ||
        rowArray.slice(from, to).every(isAllPlayer2Color)
      ) {
        console.log('winner!');
        console.log(rowArray.slice(from, to));
        console.log(rowArray.slice(from, to)[0]);
        const winner = rowArray.slice(from, to)[0];
        startTimeout();
        createModal(winner);
        return;
      }

      from += size;
      to += size;
    }

    //checks columns for winning line
    from = 0;
    to = size;
    for (let i = 0; i < size; i++) {
      console.log(from, to);
      console.log(colArray.slice(from, to));
      if (
        colArray.slice(from, to).every(isAllPlayer1Color) ||
        colArray.slice(from, to).every(isAllPlayer2Color)
      ) {
        console.log('winner!');
        console.log(colArray.slice(from, to));
        console.log(colArray.slice(from, to)[0]);
        const winner = colArray.slice(from, to)[0];
        startTimeout();
        createModal(winner);
        return;
      }
      from += size;
      to += size;
    }

    //checks diagonals for winning line
    let diagonal1 = [];
    let diagonal2 = [];
    for (let i = 0; i < size; i++) {
      diagonal1.push(newArr[i * (size + 1)].dataset.marked);
      diagonal2.push(newArr[(i + 1) * (size - 1)].dataset.marked);
    }
    if (
      diagonal1.every(isAllPlayer1Color) ||
      diagonal1.every(isAllPlayer2Color)
    ) {
      console.log(diagonal1);
      console.log(diagonal1[0]);
      const winner = diagonal1[0];
      console.log('winner!');
      startTimeout();
      createModal(winner);
      return;
    }
    if (
      diagonal2.every(isAllPlayer1Color) ||
      diagonal2.every(isAllPlayer2Color)
    ) {
      console.log(diagonal2);
      console.log(diagonal2[0]);
      console.log('winner!');
      const winner = diagonal2[0];
      startTimeout();
      createModal(winner);
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

//Color
// colorPicker.addEventListener('input', player.setColor);
//Player name
saveNameButton.addEventListener('click', player.handleSave);
console.log(player);
console.log(player.playerList);

//create instance of game
const game = gameBoardFactory();
sizeInput.addEventListener('input', function (e) {
  console.log(e.target.value);
  sizeInput.value = e.target.value;
  console.log(sizeInput.value);
  sizeDisplay.textContent = `${sizeInput.value} x ${sizeInput.value}`;
});
startButton.addEventListener('click', function () {
  game.createBoard();
});

//determine which player marks first
//if all boxes data-marked attribute is empty string
if (gridContainer.firstChild) {
  const boxArray = gridContainer.childNodes;
  const newArr = Array.from(boxArray);

  const checkGrid = newArr.map((box) => box.dataset.marked);

  if (checkGrid.every((item) => item === '')) {
    const randomNum = Math.floor(Math.random() * 100);
    console.log({ randomNum });
    if (randomNum % 2 === 0) {
      player.getPlayer(1).setTurn(true);
    } else {
      player.getPlayer(2).setTurn(true);
    }
  } else if (!checkGrid.includes((item) => item === '')) {
  }
}
