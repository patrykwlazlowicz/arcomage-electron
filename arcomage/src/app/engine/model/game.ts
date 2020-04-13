import { GameDTO } from '../dto/game-dto';
import { PlayerDTO } from '../dto/player-dto';
import { SideEffectExecutor } from './side-effect-executor';
import { Waist } from './waist';
import { CardIdx } from '../enum/card-idx.enum';
import _ from 'lodash';
import { CardDTO } from '../dto/card-dto';
import { UsedCardDTO } from '../dto/used-card-dto';
import { GameAction } from '../enum/game-action.enum';
import { GameSide } from '../enum/game-side.enum';
import { GameState } from '../enum/game-state.enum';
import { ConditionChecker } from './condition-checker';
import { SideEffectDTO } from '../dto/side-effect-dto';

export class Game implements GameDTO {
    waist: Waist;
    playerRed: PlayerDTO;
    playerBlue: PlayerDTO;
    towerHeightForWin: number;
    lastUsedCards: UsedCardDTO[];
    gameState: GameState = GameState.PLAY;
    whoWin: GameSide = null;

    private sideEffectExecutor: SideEffectExecutor = new SideEffectExecutor();
    private conditionChecker: ConditionChecker = new ConditionChecker();

    constructor(waist: Waist, playerRed: PlayerDTO, playerBlue: PlayerDTO, towerHeightForWin: number) {
        this.waist = waist;
        this.playerRed = playerRed;
        this.playerBlue = playerBlue;
        this.towerHeightForWin = towerHeightForWin;
    }

    playCard(cardIdx: CardIdx, leader: PlayerDTO, opponent: PlayerDTO) {
        if (this.canUseCard(leader)) {
            const playedCard = leader.cards[cardIdx];
            if (this.canPlayCard(playedCard, leader)) {
                this.subtractPrice(playedCard, leader);
                this.discardPlayedCard(playedCard);
                this.givePlayerNextCard(cardIdx, leader);
                this.executeCardSideEffects(playedCard, leader, opponent);
                this.swapTurnAfterPlayCard(playedCard, leader, opponent);
                this.addLastPlayedCard(playedCard, leader, GameAction.PLAY);
                this.changeGameStateIfWin();
            }
        } else {
            throw Error("Engine failure");
        }
    }

    discardCard(cardIdx: CardIdx, leader: PlayerDTO, opponent: PlayerDTO) {
        if (this.canUseCard(leader)) {
            const playedCard = leader.cards[cardIdx];
            if (playedCard.canDiscard) {
                this.discardPlayedCard(playedCard);
                this.givePlayerNextCard(cardIdx, leader);
                this.swapTurnAfterDiscardCard(leader, opponent);
                this.addLastPlayedCard(playedCard, leader, GameAction.DISCARD);
            }
        } else {
            throw Error("Engine failure");
        }
    }

    canAffortForPlayThisCard(card: CardDTO, player: PlayerDTO): boolean {
        return player.bricks.state >= card.price.bricks &&
            player.gems.state >= card.price.gems &&
            player.recruits.state >= card.price.recruits;
    }

    static mockPlayCard(game: Game, cardIdx: CardIdx, leader: PlayerDTO, opponent: PlayerDTO): GameDTO {
        const gameClone: Game = _.cloneDeep(game);
        const leaderClone: PlayerDTO = (_.isEqual(gameClone.playerRed, leader) ? gameClone.playerRed : gameClone.playerBlue);
        const opponentClone: PlayerDTO = (_.isEqual(gameClone.playerBlue, opponent) ? gameClone.playerRed : gameClone.playerBlue);
        gameClone.subtractPrice(leaderClone.cards[cardIdx], leaderClone);
        for (let sideEffect of leaderClone.cards[cardIdx].sideEffects) {
            gameClone.sideEffectExecutor.executeEffect(sideEffect, leaderClone, opponentClone);
        }
        return gameClone;
    }

    private canUseCard(leader: PlayerDTO): boolean {
        return leader.isMyTurn && this.gameState == GameState.PLAY;
    }

    private canPlayCard(playedCard: CardDTO, leader: PlayerDTO): boolean {
        return !leader.haveCardToDiscard && this.canAffortForPlayThisCard(playedCard, leader);
    }

    private subtractPrice(card: CardDTO, leader: PlayerDTO) {
        leader.bricks.state -= card.price.bricks;
        leader.gems.state -= card.price.gems;
        leader.recruits.state -= card.price.recruits;
    }

    private discardPlayedCard(card: CardDTO) {
        this.waist.discardedWaist.push(card);
    }

    private givePlayerNextCard(cardIdx: CardIdx, leader: PlayerDTO) {
        const nextCard: CardDTO = this.waist.nextCard();
        leader.cards[cardIdx] = nextCard;
    }

    private executeCardSideEffects(playedCard: CardDTO, leader: PlayerDTO, opponent: PlayerDTO) {
        const sideEffectsToExecute: SideEffectDTO[] = [];
        for (let sideEffect of playedCard.sideEffects) {
            if (this.conditionChecker.checkCondition(leader, opponent, sideEffect.condition)) {
                sideEffectsToExecute.push(sideEffect);
            }
        }
        for (let sideEffect of sideEffectsToExecute) {
            this.sideEffectExecutor.executeEffect(sideEffect, leader, opponent);
        }
    }

    private changeGameStateIfWin() {
        if (this.playerRed.castle.tower >= this.towerHeightForWin) {
            this.gameState = GameState.END;
            if (this.playerBlue.castle.tower < this.towerHeightForWin) {
                this.whoWin = GameSide.PLAYER_RED;
            }
        } else if (this.playerBlue.castle.tower >= this.towerHeightForWin) {
            this.gameState = GameState.END;
            if (this.playerRed.castle.tower < this.towerHeightForWin) {
                this.whoWin = GameSide.PLAYER_BLUE;
            }
        } else if (this.playerBlue.castle.tower == 0) {
            this.gameState = GameState.END;
            if (this.playerRed.castle.tower > 0) {
                this.whoWin = GameSide.PLAYER_RED;
            }
        } else if (this.playerRed.castle.tower == 0) {
            this.gameState = GameState.END;
            if (this.playerBlue.castle.tower > 0) {
                this.whoWin = GameSide.PLAYER_BLUE;
            }
        }
    }

    private swapTurnAfterPlayCard(card: CardDTO, leader: PlayerDTO, opponent: PlayerDTO) {
        if (!card.playAgain && !leader.haveCardToDiscard) {
            this.swapTurn(leader, opponent);
        }
    }

    private swapTurnAfterDiscardCard(leader: PlayerDTO, opponent: PlayerDTO) {
        if (leader.haveCardToDiscard) {
            --leader.haveCardToDiscard;
        } else {
            this.swapTurn(leader, opponent);
        }
    }

    private swapTurn(leader: PlayerDTO, opponent: PlayerDTO) {
        leader.isMyTurn = false;
        opponent.isMyTurn = true;
        this.increaseResources(opponent);
    }

    private increaseResources(opponent: PlayerDTO) {
        opponent.bricks.state += opponent.bricks.growth;
        opponent.gems.state += opponent.gems.growth;
        opponent.recruits.state += opponent.recruits.growth;
    }

    private addLastPlayedCard(card: CardDTO, leader: PlayerDTO, usedAction: GameAction) {
        this.lastUsedCards.push(<UsedCardDTO>{
            usedBySide: (_.isEqual(this.playerRed, leader) ? GameSide.PLAYER_RED : GameSide.PLAYER_BLUE),
            usedAction,
            card
        });
    }
}