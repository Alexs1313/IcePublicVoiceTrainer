export const BATTLE_PLAYER1_COLOR = '#54C0DA';
export const BATTLE_PLAYER2_COLOR = '#E85D5D';
export const BATTLE_ORANGE_GRADIENT = ['#E4AD1B', '#F07911'] as const;
export const BATTLE_VOTE_SECONDS = 30;

export const getPlayerColor = (playerIndex: 0 | 1) =>
  playerIndex === 0 ? BATTLE_PLAYER1_COLOR : BATTLE_PLAYER2_COLOR;
