import { GameDTO } from '../dto/game-dto';
import { PlayerDTO } from '../dto/player-dto';
import { SideEffectExecutor } from './side-effect-executor';
import { Waist } from './waist';
import { CARD_IDX } from '../enum/card-idx.enum';
import _ from 'lodash';
import { CardDTO } from '../dto/card-dto';

export class Game implements GameDTO {
    waist: Waist;
    playerRed: PlayerDTO;
    playerBlue: PlayerDTO;
    towerHeightForWin: number;

    private sideEffectExecutor: SideEffectExecutor = new SideEffectExecutor();

    constructor(waist: Waist, playerRed: PlayerDTO, playerBlue: PlayerDTO, towerHeightForWin: number){
        this.waist = waist;
        this.playerRed = playerRed;
        this.playerBlue = playerBlue;
        this.towerHeightForWin = towerHeightForWin;
    }

    playCard(cardIdx: CARD_IDX, leader: PlayerDTO, opponent: PlayerDTO) {
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
            }
        } else {
            throw Error("Engine failure");
        }
    }

    discardCard(cardIdx: CARD_IDX, leader: PlayerDTO, opponent: PlayerDTO) {
        // sprawdz game.state
        if (leader.isMyTurn) {
            const playedCard = leader.cards[cardIdx];
            if (playedCard.canDiscard) {
                this.discardPlayedCard(playedCard);
                this.givePlayerNextCard(cardIdx, leader);
                this.swapTurnAfterDiscardCard(leader, opponent);
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

    mockPlayCard(cardIdx: CARD_IDX, leader: PlayerDTO, opponent: PlayerDTO): GameDTO {
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

    private givePlayerNextCard(cardIdx: CARD_IDX, leader: PlayerDTO) {
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
}