export const icVceTrainrrBATTLE_PLAYER1_COLOR = '#54C0DA';
export const icVceTrainrrBATTLE_PLAYER2_COLOR = '#E85D5D';
export const icVceTrainrrBATTLE_ORANGE_GRADIENT = ['#E4AD1B', '#F07911'] as const;
export const icVceTrainrrBATTLE_VOTE_SECONDS = 30;

export const icVceTrainrrGetPlayerColor = (playerIndex: 0 | 1) =>
  playerIndex === 0 ? icVceTrainrrBATTLE_PLAYER1_COLOR : icVceTrainrrBATTLE_PLAYER2_COLOR;
