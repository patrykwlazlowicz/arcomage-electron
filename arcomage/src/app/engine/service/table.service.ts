import { Injectable } from '@angular/core';
import { Card } from '../model/card';
import { Player } from '../model/player';
import { Game } from '../model/game';
import { CARD_IDX } from '../enum/card-idx.enum';
import { WaistService } from './waist.service';
import { DealCards, NextCardFromWaist } from '../util/waist-dealings';
import { SideEffectService } from './side-effect.service';

@Injectable()
export class TableService {

  constructor(
    private waistService: WaistService,
    private sideEffectService: SideEffectService) {
  }

  createGame(initialTowerHeight: number,
    initialWallHeight: number,
    initialBricksState: number,
    initialBricksGrowth: number,
    initialGemsState: number,
    initialGemsGrowth: number,
    initialRecruitsState: number,
    initialRecruitsGrowth: number,
    towerHeightForWin: number): Game {
    const waist: Card[] = this.waistService.createWaist();
    const playerRed: Player = {
      bricks: {
        state: initialBricksState,
        growth: initialBricksGrowth
      },
      gems: {
        state: initialGemsState,
        growth: initialGemsGrowth
      },
      recruits: {
        state: initialRecruitsState,
        growth: initialRecruitsGrowth
      },
      castle: {
        tower: initialTowerHeight,
        wall: initialWallHeight
      },
      isMyTurn: false,
      haveCardToDiscard: 0,
      cards: []
    };
    const playerBlue: Player = { ...playerRed };
    playerRed.isMyTurn = true;
    const dealCards: DealCards = this.waistService.dealCards(waist);
    playerRed.cards = dealCards.playerRed;
    playerBlue.cards = dealCards.playerBlue;
    return {
      waist: dealCards.waist,
      discardedWaist: [],
      playerRed,
      playerBlue,
      towerHeightForWin
    };
  }

  playerPlayCard(cardIdx: CARD_IDX, game: Game): Game {
    return this.playCard(cardIdx, game.playerRed, game.playerBlue, game);
  }

  playerDiscardCard(cardIdx: CARD_IDX, game: Game): Game {
    return this.discardCard(cardIdx, game.playerRed, game.playerBlue, game);
  }

  private playCard(cardIdx: CARD_IDX, leader: Player, opponent: Player, game: Game): Game {
    // sprawdz game.state
    if (leader.isMyTurn) {
      const playedCard: Card = leader.cards[cardIdx];
      if (!leader.haveCardToDiscard && this.checkPrice(leader, playedCard)) {
        this.subtractPrice(leader, playedCard);
        this.discardPlayedCard(playedCard, game);
        this.givePlayerNextCard(leader, cardIdx, game);
        for (let sideEffect of playedCard.sideEffects) {
          this.sideEffectService.executeEffect(sideEffect, leader, opponent);
        }
        this.swapTurnAfterPlayCard(playedCard, leader, opponent);
        // sprawdzić wygraną
      }
      return { ...game };
    } else {
      throw Error("Engine failure");
    }
  }

  private discardCard(cardIdx: CARD_IDX, leader: Player, opponent: Player, game: Game): Game {
    // sprawdz game.state
    if (leader.isMyTurn) {
      const discardedCard: Card = leader.cards[cardIdx];
      this.discardPlayedCard(discardedCard, game);
      this.givePlayerNextCard(leader, cardIdx, game);
      this.swapTurnAfterDiscardCard(leader, opponent);
      return { ...game };
    } else {
      throw Error("Engine failure");
    }
  }

  private checkPrice(player: Player, card: Card): boolean {
    return player.bricks.state >= card.price.bricks &&
      player.gems.state >= card.price.gems &&
      player.recruits.state >= card.price.recruits;
  }

  private subtractPrice(player: Player, card: Card) {
    const newPlayer: Player = { ...player };
    newPlayer.bricks.state -= card.price.bricks;
    newPlayer.gems.state -= card.price.gems;
    newPlayer.recruits.state -= card.price.recruits;
    return newPlayer;
  }

  private discardPlayedCard(card: Card, game: Game) {
    game.discardedWaist.push(card);
  }

  private givePlayerNextCard(player: Player, cardIdx: CARD_IDX, game: Game) {
    const nextCardFromWaist: NextCardFromWaist = this.waistService.nextCardFromWaist(game.waist, game.discardedWaist);
    player.cards[cardIdx] = nextCardFromWaist.card;
    game.waist = nextCardFromWaist.waist;
    game.discardedWaist = nextCardFromWaist.discardedWaist;
  }

  private swapTurnAfterPlayCard(playedCard: Card, leader: Player, opponent: Player) {
    if (!playedCard.turnAgain && !leader.haveCardToDiscard) {
      this.swapTurn(leader, opponent);
    }
  }

  private swapTurnAfterDiscardCard(leader: Player, opponent: Player) {
    if (leader.haveCardToDiscard) {
      --leader.haveCardToDiscard;
    } else {
      this.swapTurn(leader, opponent);
    }
  }

  private swapTurn(leader: Player, opponent: Player) {
    leader.isMyTurn = false;
    opponent.isMyTurn = true;
  }
}
