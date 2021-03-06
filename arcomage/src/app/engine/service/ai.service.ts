import { Injectable } from '@angular/core';
import { GameDTO } from '../dto/game-dto';
import { CardIdx } from '../enum/card-idx.enum';
import { CardDTO } from '../dto/card-dto';
import { PlayerDTO } from '../dto/player-dto';
import { Game } from '../model/game';
import _ from 'lodash';
import { GameState } from '../enum/game-state.enum';

interface CardPoints {
  idx: CardIdx;
  points: number;
  isWinnigCard: boolean;
  isLoosingCard: boolean;
}

@Injectable()
export class AIService {

  constructor() { }

  playPoorAI(gameDTO: GameDTO): GameDTO {
    const game: Game = _.cloneDeep(<Game> gameDTO);
    game.lastUsedCards = [];
    while (game.playerBlue.isMyTurn && game.gameState == GameState.PLAY) {
      let cardWasntPlayed = true;
      for (let priority = 1; priority <= 4 && cardWasntPlayed; ++priority) {
        for (let i = 0; i < CardIdx.LENGTH && cardWasntPlayed; ++i) {
          if (game.canAffortForPlayThisCard(game.playerBlue.cards[i], game.playerBlue) && game.playerBlue.cards[i].priorityForAI == priority ) {
            cardWasntPlayed = false;
            game.playCard(i, game.playerBlue, game.playerRed);
          }
        }
      }
      for (let priority = 5; priority >= 1 && cardWasntPlayed; --priority) {
        for (let i = 0; i < CardIdx.LENGTH && cardWasntPlayed; ++i) {
          if (game.playerBlue.cards[i].priorityForAI == priority) {
            cardWasntPlayed = false;
            game.discardCard(i, game.playerBlue, game.playerRed);
          }
        }
      }
    }
    return game;
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
