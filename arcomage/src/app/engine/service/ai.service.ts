import { Injectable } from '@angular/core';
import { GameDTO } from '../dto/game-dto';
import { CARD_IDX } from '../enum/card-idx.enum';
import { CardDTO } from '../dto/card-dto';
import { PlayerDTO } from '../dto/player-dto';
import { Game } from '../model/game';
import _ from 'lodash';

interface CardPoints {
  idx: CARD_IDX;
  points: number;
  isWinnigCard: boolean;
  isLoosingCard: boolean;
}

@Injectable()
export class AIService {

  constructor() { }

  playPoorAI(gameDTO: GameDTO): GameDTO {
    const game: Game = <Game> gameDTO;
    while (game.playerBlue.isMyTurn) {
      let cardWasntPlayed = true;
      for (let priority = 1; priority <= 4 && cardWasntPlayed; ++priority) {
        for (let i = 0; i < CARD_IDX.LENGTH && cardWasntPlayed; ++i) {
          if (game.canPlayThisCard(game.playerBlue.cards[i], game.playerBlue) && game.playerBlue.cards[i].priorityForAI == priority ) {
            cardWasntPlayed = false;
            game.playCard(i, game.playerBlue, game.playerRed);
          }
        }
      }
      for (let priority = 5; priority >= 1 && cardWasntPlayed; --priority) {
        for (let i = 0; i < CARD_IDX.LENGTH && cardWasntPlayed; ++i) {
          if (game.playerBlue.cards[i].priorityForAI == priority) {
            cardWasntPlayed = false;
            game.discardCard(i, game.playerBlue, game.playerRed);
          }
        }
      }
    }
    return _.cloneDeep(game);
  }

  private play(game: GameDTO): GameDTO {
    let newGame = { ...game };
    while (newGame.playerBlue.isMyTurn) {
      while (newGame.playerBlue.haveCardToDiscard) {
        // odrzuć wszystki do odrzucenia  od najgorszej
      }
      // policz najlepsze
      // znajdź wygrywającą
      // jak nie to zagraj najlepszą
      // jak nie zagrałeś to policz najgorsze
      // odrzuć najgorszą
    }
    return newGame;
  }

  private calculateCardToDiscard(cards: CardDTO[], game: GameDTO): CardPoints[] {
    const calculatedCardPoints: CardPoints[] = [];
    // zrób mocki playerów
    for (let card of cards) {
    }
    return calculatedCardPoints;
  }

  private calculateCardToPlay(cards: CardDTO[], game: GameDTO): CardPoints[] {
    const calculatedCardPoints: CardPoints[] = [];
    // zrób mocki playerów
    // filtruj po przegrywających
    // sprawdź cenę
    for (let card of cards) {
    }
    return calculatedCardPoints;
  }

  private calculateCardEffect(leader: PlayerDTO, opponent: PlayerDTO): CardPoints {
    return null;
  }
}
