import type {ScrollSpeedId, TextSizeId} from '../IcVceTrainrrTheme/IcVceTrainrrPromptrTheme';

export type IcVceTrainrrBattleSessionParams = {
  player1Name: string;
  player2Name: string;
  scrollSpeed: ScrollSpeedId;
  textSize: TextSizeId;
};

export type IcVceTrainrrBattleStackParamList = {
  IcVceTrainrrBattleHome: undefined;
  IcVceTrainrrBattleEnterPlayers: undefined;
  IcVceTrainrrBattleSettings: {
    player1Name: string;
    player2Name: string;
  };
  IcVceTrainrrBattlePlayerReady: IcVceTrainrrBattleSessionParams & {
    playerIndex: 0 | 1;
  };
  IcVceTrainrrBattleReading: IcVceTrainrrBattleSessionParams & {
    playerIndex: 0 | 1;
  };
  IcVceTrainrrBattleVoting: IcVceTrainrrBattleSessionParams;
  IcVceTrainrrBattleResult: IcVceTrainrrBattleSessionParams & {
    player1Votes: number;
    player2Votes: number;
  };
};
