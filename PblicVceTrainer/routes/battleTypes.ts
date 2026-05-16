import type {ScrollSpeedId, TextSizeId} from '../theme/promptrTheme';

export type BattleSessionParams = {
  player1Name: string;
  player2Name: string;
  scrollSpeed: ScrollSpeedId;
  textSize: TextSizeId;
};

export type BattleStackParamList = {
  BattleHome: undefined;
  BattleEnterPlayers: undefined;
  BattleSettings: {
    player1Name: string;
    player2Name: string;
  };
  BattlePlayerReady: BattleSessionParams & {
    playerIndex: 0 | 1;
  };
  BattleReading: BattleSessionParams & {
    playerIndex: 0 | 1;
  };
  BattleVoting: BattleSessionParams;
  BattleResult: BattleSessionParams & {
    player1Votes: number;
    player2Votes: number;
  };
};
