import { GameDTO } from '../dto/game-dto';
import { PlayerDTO } from '../dto/player-dto';
import { SideEffectExecutor } from './side-effect-executor';
import { Waist } from './waist';
import { CardIdx } from '../enum/card-idx.enum';
import _ from 'lodash';
import { CardDTO } from '../dto/card-dto';
import { UsedCardDTO } from '../dto/used-card-dto';
import { UsedAction } from '../enum/used-action.enum';
import { UsedBySide } from '../enum/used-by-side.enum';

export class Game implements GameDTO {
    waist: Waist;
    playerRed: PlayerDTO;
    playerBlue: PlayerDTO;
    towerHeightForWin: number;
    lastUsedCards: UsedCardDTO[];

    private sideEffectExecutor: SideEffectExecutor = new SideEffectExecutor();

    constructor(waist: Waist, playerRed: PlayerDTO, playerBlue: PlayerDTO, towerHeightForWin: number){
        this.waist = waist;
        this.playerRed = playerRed;
        this.playerBlue = playerBlue;
        this.towerHeightForWin = towerHeightForWin;
    }

    playCard(cardIdx: CardIdx, leader: PlayerDTO, opponent: PlayerDTO) {
        // sprawdz game.state
        if (leader.isMyTurn) {
            const playedCard = leader.cards[cardIdx];
            if (!leader.haveCardToDiscard && this.canPlayThisCard(playedCard, leader)) {
                this.subtractPrice(playedCard, leader);
                this.discardPlayedCard(playedCard);
                this.givePlayerNextCard(cardIdx, leader);
                for (let sideEffect of playedCard.sideEffects) {
                    this.sideEffectExecutor.executeEffect(sideEffect, leader, opponent);
                }
                this.swapTurnAfterPlayCard(playedCard, leader, opponent);
                // sprawdzić wygraną
                this.addLastPlayedCard(playedCard, leader, UsedAction.PLAY);
            }
        } else {
            throw Error("Engine failure");
        }
    }

    discardCard(cardIdx: CardIdx, leader: PlayerDTO, opponent: PlayerDTO) {
        // sprawdz game.state
        if (leader.isMyTurn) {
            const playedCard = leader.cards[cardIdx];
            if (playedCard.canDiscard) {
                this.discardPlayedCard(playedCard);
                this.givePlayerNextCard(cardIdx, leader);
                this.swapTurnAfterDiscardCard(leader, opponent);
                this.addLastPlayedCard(playedCard, leader, UsedAction.DISCARD);
            }
        } else {
            throw Error("Engine failure");
        }
    }

    canPlayThisCard(card: CardDTO, player: PlayerDTO): boolean {
        return player.bricks.state >= card.price.bricks &&
            player.gems.state >= card.price.gems &&
            player.recruits.state >= card.price.recruits;
    }

    mockPlayCard(cardIdx: CardIdx, leader: PlayerDTO, opponent: PlayerDTO): GameDTO {
        const gameClone: Game = _.cloneDeep(this);
        const leaderClone: PlayerDTO = (_.isEqual(gameClone.playerRed, leader) ? gameClone.playerRed : gameClone.playerBlue);
        const opponentClone: PlayerDTO = (_.isEqual(gameClone.playerBlue, opponent) ? gameClone.playerRed : gameClone.playerBlue);
        gameClone.subtractPrice(leaderClone.cards[cardIdx], leaderClone);
        for (let sideEffect of leaderClone.cards[cardIdx].sideEffects) {
            gameClone.sideEffectExecutor.executeEffect(sideEffect, leaderClone, opponentClone);
        }
        return gameClone;
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

    private addLastPlayedCard(card: CardDTO, leader: PlayerDTO, usedAction: UsedAction) {
        this.lastUsedCards.push(<UsedCardDTO>{
            usedBySide: (_.isEqual(this.playerRed, leader) ? UsedBySide.PLAYER_RED : UsedBySide.PLAYER_BLUE),
            usedAction,
            card
        });
    }
}