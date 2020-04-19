import { PlayerDTO } from "../../../arcomage/src/app/engine/dto/player-dto";

export class PlayerMock {
  static EmptyPlayer(): PlayerDTO {
    return <PlayerDTO>{
      bricks: {
        state: 0,
        growth: 0
      },
      gems: {
        state: 0,
        growth: 0
      },
      recruits: {
        state: 0,
        growth: 0
      },
      castle: {
        tower: 0,
        wall: 0
      },
      isMyTurn: false,
      haveCardToDiscard: 0,
      cards: []
    };
  }
}