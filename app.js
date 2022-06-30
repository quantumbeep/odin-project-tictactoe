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

    }
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
    gridSize = size ** 2;
    return gridSize;
  };

  const createBox = (i) => {
    const gridContainer = document.querySelector('.grid');
    const box = document.createElement('div');
    box.classList.add('box-' + i, 'box');
    box.setAttribute('box-id', i);
    box.textContent = 'box-' + i;
    gridContainer.append(box);
    box.onclick = () => {
      const boxToMark = document.querySelector(`[box-id="${i}"]`);
      boxToMark.style.background = "red";
    };
  };

  const createBoard = () => {
    const boxCount = calcSize();
    for (let i = 1; i <= boxCount; i++) {
      createBox(i);
    }
  };
  return {
    createBoard,
  };
};

const game = gameBoardFactory(3);


game.createBoard();