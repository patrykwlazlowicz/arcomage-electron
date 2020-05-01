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
  static ExampleState = 30
  static ExampleGrowth = 1
  static ExampleWall = 10
  static ExamplePlayerRed(): PlayerDTO {
    return <PlayerDTO>{
      bricks: {
        state: PlayerMock.ExampleState,
        growth: PlayerMock.ExampleGrowth
      },
      gems: {
        state: PlayerMock.ExampleState,
        growth: PlayerMock.ExampleGrowth
      },
      recruits: {
        state: PlayerMock.ExampleState,
        growth: PlayerMock.ExampleGrowth
      },
      castle: {
        tower: PlayerMock.ExampleState,
        wall: PlayerMock.ExampleWall
      },
      isMyTurn: true,
      haveCardToDiscard: 0,
      cards: []
    };
  }
  static ExamplePlayerBlue(): PlayerDTO {
    const player = PlayerMock.ExamplePlayerRed();
    player.isMyTurn = false;
    return player;
  }
}