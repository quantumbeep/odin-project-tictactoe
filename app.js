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
  const turnCounter = () => {
    let turns = 0;
    turns++;
    return turns;
  };
  const placeMarker = () => {
    //select grid item dom
    //if item is empty then change the color of the item background
    //add count to turns
    //else display message or indicator that space is taken already
    //
  };
  return {
    firstName,
    lastName,
    birthDate,
    wins,
    totalGamesPlayed,
    getFullName,
    getAge,
  };
};

//gameboard factory
const gameBoardFactory = (size) => {
  const createBoard = () => {};
};
